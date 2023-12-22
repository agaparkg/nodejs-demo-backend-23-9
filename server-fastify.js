// Import the framework and instantiate it
import Fastify from "fastify";
import { readFile, writeFile } from "node:fs/promises";

const fastify = Fastify({
  logger: true,
});

const port = process.env.PORT || 8000;

fastify.get("/", async function handler(request, reply) {
  return { message: "Yay! Home path is working." };
});

fastify.get("/users", async (request, reply) => {
  try {
    // Read existing users from the file: https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
    const data = await readFile("./data/users.json", { encoding: "utf8" });
    const users = JSON.parse(data);

    return users;
  } catch (error) {
    return { error: "Something went wrong!" };
  }
});

fastify.get("/users/:id", async (request, reply) => {
  //   const {id} = request.params
  const id = request.params.id;

  try {
    const data = await readFile("./data/users.json", { encoding: "utf8" });
    const users = JSON.parse(data);

    // Find the user from the array with the specified ID
    const singleUser = users.find((user) => user.id === id);

    // If the user exist in the array, send it back as a response.
    // If not, send an error as a response.
    if (singleUser) {
      return singleUser;
    } else {
      return { error: "User not found" };
    }
  } catch (error) {
    res.json({ error: "Something went wrong!" });
  }
});

fastify.delete("/users/:id", async (request, reply) => {});

fastify.post("/users", async (request, reply) => {});

fastify.patch("/users/:id", async (request, reply) => {});

// Run the server!
const runServer = async () => {
  try {
    fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

runServer();
