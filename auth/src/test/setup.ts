import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod: any;

beforeAll(async () => {
  mongod = new MongoMemoryServer();

  const uri = await mongod.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async (c) => await c.deleteMany({}));
});

afterAll(async () => {
  await mongod.stop();
  await mongoose.connection.close();
});
