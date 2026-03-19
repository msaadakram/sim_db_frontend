import { NextRequest, NextResponse } from 'next/server';
import { getMongoClientPromise } from '@/lib/mongodb';

const DB_NAME = 'blog_views';
const VIEWS_COLLECTION = 'views';
const VISITORS_COLLECTION = 'visitors';

declare global {
  var __viewCounts: Map<string, number> | undefined;
  var __viewVisitors: Set<string> | undefined;
}

function getFallbackStores() {
  if (!global.__viewCounts) {
    global.__viewCounts = new Map<string, number>();
  }

  if (!global.__viewVisitors) {
    global.__viewVisitors = new Set<string>();
  }

  return {
    counts: global.__viewCounts,
    visitors: global.__viewVisitors,
  };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return '127.0.0.1';
}

// GET: Retrieve view count for a slug
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim();

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const client = await getMongoClientPromise();
    const db = client.db(DB_NAME);
    const viewDoc = await db.collection(VIEWS_COLLECTION).findOne({ slug });

    return NextResponse.json({
      views: viewDoc?.count || 0,
    });
  } catch {
    const { counts } = getFallbackStores();
    return NextResponse.json({ views: counts.get(slug) || 0 });
  }
}

// POST: Increment view count (unique by IP) and save visitor info
export async function POST(request: NextRequest) {
  let slug: string | undefined;

  try {
    const body = await request.json();
    slug = typeof body?.slug === 'string' ? body.slug.trim() : undefined;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const ip = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referer = request.headers.get('referer') || 'Direct';
    const language = request.headers.get('accept-language') || 'Unknown';

    const client = await getMongoClientPromise();
    const db = client.db(DB_NAME);

    // Check if this IP already viewed this slug
    const existingVisitor = await db.collection(VISITORS_COLLECTION).findOne({
      slug,
      ip,
    });

    if (!existingVisitor) {
      // Save visitor info with IP details
      await db.collection(VISITORS_COLLECTION).insertOne({
        slug,
        ip,
        userAgent,
        referer,
        language,
        visitedAt: new Date(),
      });

      // Increment view count
      await db.collection(VIEWS_COLLECTION).updateOne(
        { slug },
        { $inc: { count: 1 }, $setOnInsert: { slug, createdAt: new Date() }, $set: { updatedAt: new Date() } },
        { upsert: true }
      );
    }

    // Get updated count
    const viewDoc = await db.collection(VIEWS_COLLECTION).findOne({ slug });

    return NextResponse.json({
      views: viewDoc?.count || 0,
    });
  } catch {
    const { counts, visitors } = getFallbackStores();
    const visitorKey = `${slug}:${getClientIP(request)}`;

    if (!visitors.has(visitorKey)) {
      visitors.add(visitorKey);
      counts.set(slug, (counts.get(slug) || 0) + 1);
    }

    return NextResponse.json({ views: counts.get(slug) || 0 });
  }
}
