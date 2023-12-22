import express from "express";
import { readFile, writeFile } from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

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
    // res.json(users);
    res.json({
      total_users: users.length,
      users: users,
    });
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

server.delete("/users/:id", async (req, res) => {
  // req.query = { id: "123"}
  // req.params = { id: "123", name: "Alex"}
  // req.body
  const { id } = req.params;

  try {
    const data = await readFile("./data/users.json", { encoding: "utf8" });
    const users = JSON.parse(data);

    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users.splice(index, 1);

      await writeFile("./data/users.json", JSON.stringify(users));

      res.json({
        message: "User has been deleted",
      });
    } else {
      res.json({ error: "User not found" });
    }
  } catch (error) {
    res.json({ error: "Something went wrong!" });
  }
});

server.post("/users", async (req, res) => {
  const newUser = req.body;
  // { name: "Alex", age: 34 }

  newUser.id = uuidv4();

  try {
    const data = await readFile("./data/users.json", { encoding: "utf8" });
    const users = JSON.parse(data);

    users.push(newUser);

    await writeFile("./data/users.json", JSON.stringify(users));

    res.json({
      message: "User has been created successfully",
      user: newUser,
    });
  } catch (error) {
    res.json({ error: "Something went wrong!" });
  }
});

server.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const data = await readFile("./data/users.json", { encoding: "utf8" });
    let users = JSON.parse(data);

    users = users.map((user) => {
      if (user.id === id) {
        return { ...user, ...newData };
      }
      return user;
    });

    await writeFile("./data/users.json", JSON.stringify(users));

    res.json({
      message: "User has been updated successfully",
      user: users.find((user) => user.id === id),
    });
  } catch (error) {
    res.json({ error: "Something went wrong!" });
  }
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
