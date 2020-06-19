import request from "supertest";
import { app } from "../../app";
import { SIGNUP_ROUTE } from "../constants";

describe("signup tests", () => {
  it("returns a 201 status on successful signup", () => {
    return request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);
  });

  it("returns a 400 status when email is invalid", () => {
    return request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "",
        password: "123456",
      })
      .expect(400);
  });

  it("returns a 400 status when password is invalid", () => {
    return request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "",
      })
      .expect(400);
  });

  it("returns a 400 status when body is missing", () => {
    return request(app).post(SIGNUP_ROUTE).send({}).expect(400);
  });

  it("returns a 400 when email already exists", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);

    return request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(400);
  });

  it("returns jwt token in the response header, when signup is successful", async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
