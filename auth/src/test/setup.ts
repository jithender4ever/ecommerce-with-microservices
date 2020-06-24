import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import { SIGNUP_ROUTE } from "../routes/constants";

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

export const getCookie = async () => {
  const email = "test@test.com";
  const password = "password123";

  const response = await request(app)
    .post(SIGNUP_ROUTE)
    .send({
      email,
      password,
    })
    .expect(201);

  return response.get("Set-Cookie");
};
