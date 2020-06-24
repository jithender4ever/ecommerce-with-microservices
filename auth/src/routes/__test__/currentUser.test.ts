import request from "supertest";
import { getCookie } from "../../test/setup";
import { app } from "../../app";
import { SIGNUP_ROUTE, SIGNIN_ROUTE, CURRENTUSER_ROUTE } from "../constants";

describe("current-user tests", () => {
  it("returns current user details when a user exists", async () => {
    const cookie = await getCookie();

    const response = await request(app)
      .get(CURRENTUSER_ROUTE)
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });
});
