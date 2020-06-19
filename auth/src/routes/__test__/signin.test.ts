import request from "supertest";
import { app } from "../../app";
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from "../constants";

describe("signin tests", () => {
  it("returns a 201 status on successful signin", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);

    return request(app)
      .post(SIGNIN_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(200);
  });

  it("returns a 400 status when email is invalid", async () => {
    return request(app)
      .post(SIGNIN_ROUTE)
      .send({
        email: "",
        password: "123456",
      })
      .expect(400);
  });

  it("returns a 400 status when password is invalid", () => {
    return request(app)
      .post(SIGNIN_ROUTE)
      .send({
        email: "test@test.com",
        password: "",
      })
      .expect(400);
  });

  it("returns a 400 status when body is missing", () => {
    return request(app).post(SIGNIN_ROUTE).send({}).expect(400);
  });

  it("returns a 400 when email does not exist", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);

    return request(app)
      .post(SIGNIN_ROUTE)
      .send({
        email: "test1@test.com",
        password: "123456",
      })
      .expect(400);
  });

  it("returns jwt token in the response header, when signin is successful", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);

    const response = await request(app)
      .post(SIGNIN_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
