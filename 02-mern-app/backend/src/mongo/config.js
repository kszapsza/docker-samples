import mongoose from 'mongoose';

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST || 'localhost';
const port = Number(process.env.MONGODB_PORT) || 27017;
const db = process.env.MONGODB_DATABASE || 'mern-app';

export async function connectToMongo () {
  await mongoose.connect(
    `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`
  );
}
