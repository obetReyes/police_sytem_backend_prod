import { prisma } from "../src/utils";
import request from "supertest";
import Cookies from "expect-cookies";
import { app } from "../src/server";


 /* 
 testing auth endpoints 

 - signup cases (the client should not be allowed to sign up an empty body also should be validated, dispatchers and officers only can be signed up by  superiors)

 -signin cases the form need to be validated, if an existing cookie exists if the user login again a new cookie should be generated..

 -signout if the user is not logged in the endpoint should send a http 200 response, if the endpoint is typed incorretly the server should return a 404 http response, the cookie should be removed if the user is logged in

 */
describe("groups endpoints testing", () => {
    describe("sign in controller tests ", () => {
        it("should send an 400 response status if the body is empty or one of the fields are empty", async () => {
          await request(app).post("/auth/signin")
            .expect(400);
        });
    
        it("should send 404 if the route does not exists", async () => {
          await request(app).post("/auth/sing-in")
            .expect(404);
        });
    
        it("if the user is registered we should receive the 201 http and a cookie", async () => {
          await request(app).post("/auth/signin")
            .send({ username: "testUser", password: "testPassword" })
            .expect(Cookies.set({ "name": "jwt", "options": ["httponly"] }))
            .expect(Cookies.not("set", { "name": "bravo" }))
            .expect(201);
        });
    
        it("if passwords does not match the user should not be able to log in also the cookie shouldn't be set", async () => {
          await request(app).post("/auth/signin")
            .send({ username: "testUser", password: "testPassword1" })
            .expect(Cookies.not("set", { "name": "jwt" }))
            .expect(401);
        });
      });
});