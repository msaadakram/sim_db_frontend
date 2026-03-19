import { MongoClient } from 'mongodb';
import { withMongoDbName } from './mongoUri';

const options = {};

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const sourceUri = process.env.MONGODB_URI;
  if (!sourceUri) {
    throw new Error(
      'Missing MONGODB_URI environment variable. Add it to local env files and Vercel project settings.'
    );
  }

  const MONGODB_URI = withMongoDbName(sourceUri);

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(MONGODB_URI, options);
      global._mongoClientPromise = client.connect();
    }

    return global._mongoClientPromise;
  }

  const client = new MongoClient(MONGODB_URI, options);
  return client.connect();
}

export function getMongoClientPromise(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = createClientPromise();
  }

  return clientPromise;
}
