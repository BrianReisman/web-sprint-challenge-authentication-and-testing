const Model = require("./auth/models");
const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");

// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

describe("server works", async () => {
  test("register works", async () => {
    let res = await request(server).post("/api/auth/register").send({
      username: "Aaron1",
      password: "test",
    });
    expect(res.status).toBe(201);
  });
  test("register type is correct", async () => {
    let res = await request(server).post("/api/auth/register").send({
      username: "Aaron2",
      password: "test",
    });
    expect(res.type).toBe("application/json");
  });
  test("login works", async () => {
    let res = await request(server).post("/api/auth/login").send({
      username: "Aaron3",
      password: "test",
    });
    expect(res.body).toEqual({ message: "invalid credentials" });
  });
  test("login works", async () => {
    let res = await request(server).post("/api/auth/login").send({
      username: "Aaron3",
      password: "test",
    });
    expect(res.type).toBe("application/json");
  });

  test("fail to access /get without token", async () => {
    let res = await request(server).get("/api/jokes");
    expect(res.status).toBe(401);
  });
});
