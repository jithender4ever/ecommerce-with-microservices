import request from "supertest";
import { app } from "../../app";
import { SIGNUP_ROUTE, SIGNIN_ROUTE, CURRENTUSER_ROUTE } from "../constants";

describe("current-user tests", () => {
  it("returns current user details when a user exists", async () => {
    const signupResponse = await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .expect(201);

    // Get the jwt from the response header and set it in the request headers
    // of the current-user request.
    const cookie = signupResponse.get("Set-Cookie");

    const response = await request(app)
      .get(CURRENTUSER_ROUTE)
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });
});
