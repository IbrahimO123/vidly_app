const { Users } = require("../../schemas/userSchema");
const { Genres, genreSchema } = require("../../schemas/genreSchema");
const request = require("supertest");

describe("auth middleware", () => {
  beforeEach(async () => {
    server = require("../../app");
  });
  afterEach(async () => {
    await Genres.deleteMany({});
    server.close();
  })

  let token;

  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-jwt-token", token)
      .send({ name: "genres16" });
  };

  beforeEach(() => {
    token = new Users().generateToken();
  });
  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if no token is invalid", async () => {
    token = "beg";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is provided", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
