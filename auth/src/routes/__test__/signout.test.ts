import request from "supertest";
import { app } from "../../app";
import { SIGNIN_ROUTE, SIGNUP_ROUTE, SIGNOUT_ROUTE } from "../constants";

describe("signout tests", () => {
  it("returns a 200 status on successful signout", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);

    await request(app)
      .post(SIGNIN_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(200);

    return request(app).post(SIGNOUT_ROUTE).send({}).expect(200);
  });

  it("clears jwt token in the response header, when signout is successful", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);

    await request(app)
      .post(SIGNIN_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(200);

    const response = await request(app)
      .post(SIGNOUT_ROUTE)
      .send({})
      .expect(200);

    expect(response.get("Set-Cookie")[0]).toEqual(
      "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
