// Import the framework and instantiate it
import Fastify from "fastify";
import { readFile } from "node:fs/promises";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", (request, reply) => {
  // return { hello: "world" };
  reply.status(200).send({ hello: "world" });
  // reply.send({ hello: "world" });
});

// Declare a route
fastify.get("/users", async (request, reply) => {
  try {
    // Read existing users from the file: https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
    const data = await readFile("./data/users.json", { encoding: "utf8" });
    const users = JSON.parse(data);
    // reply.send({
    //   total_users: users.length,
    //   users: users,
    // });
    return {
      total_users: users.length,
      users: users,
    };
  } catch (error) {
    res.json({ error: "Something went wrong!" });
  }
});

fastify.post("/users", async (request, reply) => {});
fastify.delete("/users", async (request, reply) => {});
fastify.patch("/users", async (request, reply) => {});

// Run the server!
const runServer = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

runServer();
