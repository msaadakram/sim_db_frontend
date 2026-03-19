import { NextRequest, NextResponse } from 'next/server';
import { getMongoClientPromise } from '@/lib/mongodb';

const DB_NAME = 'blog_views';
const VIEWS_COLLECTION = 'views';
const VISITORS_COLLECTION = 'visitors';

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
  const slug = searchParams.get('slug');

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
    return NextResponse.json({ views: 0 });
  }
}

// POST: Increment view count (unique by IP) and save visitor info
export async function POST(request: NextRequest) {
  let slug: string | undefined;

  try {
    const body = await request.json();
    ({ slug } = body);
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
    return NextResponse.json({ error: 'View service unavailable' }, { status: 503 });
  }
}
