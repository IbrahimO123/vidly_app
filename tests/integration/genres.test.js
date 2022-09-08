const request = require("supertest");
const { Genres, genreSchema } = require("../../schemas/genreSchema");
const { Users, usersSchema } = require("../../schemas/userSchema");
let server;

describe("/api/genres", () => {
  beforeEach( async () => {
    server = require("../../app");
  });
  afterEach(async () => {
     server.close();
    await Genres.deleteMany({});
    
  });

  describe("GET /", () => {
    it("should return all genres in the database", async () => {
      await Genres.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
        { name: "genre3" },
        { name: "genre4" },
      ]);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(4);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre4")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a particaular genre", async () => {
      const res = await request(server).get(
        "/api/genres/630899abd45e6d80d1da5f95"
      );
      expect(() => {
        res.send();
      }).toThrow();
      expect(res.status).toBe(404);
    });

    it("should return a particaular genre", async () => {
      const genre = new Genres({ name: "genre 5" });
      await genre.save();
      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    beforeEach(() => {
      token = new Users().generateToken();
      name = "genres10";
    });
    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-jwt-token", token)
        .send({ name });
    };
    it("should return 401 if user is not authenticated", async () => {
      token = "";
      // const res = await request(server)
      //   .post("/api/genres")
      //   .send({ name: "genres 6" });
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genres is less than 5 characters", async () => {
      //  token = new Users().generateToken();
      name = "gen";
      // const res = await request(server)
      //   .post("/api/genres")
      //   .set("x-jwt-token", token)
      //   .send({ name: "gen" });
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genres is more than 50 characters", async () => {
      name = new Array(50).join("rttrw");
      // const res = await request(server)
      //   .post("/api/genres")
      //   .set("x-jwt-token", token)
      //   .send({ name: name });
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      // const res = await request(server)
      //   .post("/api/genres")
      //   .set("x-jwt-token", token)
      //   .send({ name : "genres10" });
      const res = await exec();
      const genre = await Genres.find({ name: "genre10" });
      expect(res.status).toBe(200);
      expect(genre).not.toBeNull();
    });

    it("should return a genre if it is valid", async () => {
      // const res = await request(server)
      //   .post("/api/genres")
      //   .set("x-jwt-token", token)
      //   .send({ name: "genres11" });
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty("_id");
      expect(res.body[0]).toHaveProperty("name", "genres10");
    });
  });
});
