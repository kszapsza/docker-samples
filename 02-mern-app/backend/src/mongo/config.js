import mongoose from 'mongoose';

const user = process.env.MONGODB_USER || 'root';
const password = process.env.MONGODB_PASSWORD || 'example';
const host = process.env.MONGODB_HOST || 'mongo';
const port = Number(process.env.MONGODB_PORT) || 27017;
const db = process.env.MONGODB_DATABASE || 'mern-app';

export async function connectToMongo () {
  await mongoose.connect(
    `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`
  );
}
