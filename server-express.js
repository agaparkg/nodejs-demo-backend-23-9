import express from "express";
import { readFile, writeFile } from "node:fs/promises";

const server = express();

const port = process.env.PORT || 8000;

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "Yay home path is working!" });
});

server.get("/users", async (req, res) => {
  try {
    // Read existing users from the file: https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
    const data = await readFile("./data/users.json", { encoding: "utf8" });
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    res.json({ error: "Something went wrong!" });
  }
});

server.get("/users/:id", async (req, res) => {
  //   const {id} = req.params
  const id = req.params.id;

  try {
    const data = await readFile("./data/users.json", { encoding: "utf8" });
    const users = JSON.parse(data);

    // Find the user from the array with the specified ID
    const singleUser = users.find((user) => user.id === id);

    // If the user exist in the array, send it back as a response.
    // If not, send an error as a response.
    singleUser ? res.json(singleUser) : res.json({ error: "User not found" });
  } catch (error) {
    res.json({ error: "Something went wrong!" });
  }
});

server.delete("/users/:id", async (req, res) => {});

server.post("/users", async (req, res) => {});

server.patch("/users/:id", async (req, res) => {});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
