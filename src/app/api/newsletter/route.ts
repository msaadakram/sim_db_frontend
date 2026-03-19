import { NextRequest, NextResponse } from 'next/server';
import { getMongoClientPromise } from '@/lib/mongodb';
import { getMongoDbName } from '@/lib/mongoUri';

const COLLECTION = 'newsletter_subscribers';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  let email = '';

  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? normalizeEmail(body.email) : '';
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
  }

  try {
    const client = await getMongoClientPromise();
    const db = client.db(getMongoDbName());
    const collection = db.collection(COLLECTION);

    await collection.createIndex({ email: 1 }, { unique: true });

    const now = new Date();
    const result = await collection.updateOne(
      { email },
      {
        $setOnInsert: {
          email,
          createdAt: now,
        },
        $set: {
          updatedAt: now,
          source: 'blog',
        },
      },
      { upsert: true }
    );

    const alreadySubscribed = result.matchedCount > 0 && result.upsertedCount === 0;

    return NextResponse.json({
      success: true,
      alreadySubscribed,
      message: alreadySubscribed
        ? 'Email is already subscribed.'
        : 'Subscribed successfully.',
    });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return NextResponse.json({ error: 'Unable to save email right now. Please try again.' }, { status: 500 });
  }
}
