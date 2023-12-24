# Nodejs Backend API (23-9 cohort)

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 20.2.0

# Getting started

- On your computer, navigate to a location where you want to clone this repository

- Clone the repository

```
% git clone  https://github.com/<github_username>/<project_name>
```

> Example: https://github.com/agaparkg/nodejs-demo-backend-23-9

- Install dependencies

```
% cd <project_name>

% npm install
```

- Run the project

```
% npm start
```

Navigate to `http://localhost:8000` to see the output  
![root route](/images/home_path.png)

- Additional routes

  ```
  GET - /users
  GET - /users/:id (req.params.id)
  POST - /users (provide the data in the body)
  DELETE - /users/:id (req.params.id)
  PATCH - /users/:id (req.params.id & provide the data in the body)
  ```

- This project has been deployed to [render.com](https://dashboard.render.com/). The rendered output looks like this:  
  <https://two3-9-nodejs-backend.onrender.com/>

![deployed root route](/images/deployed_home.png)

![deployed root route](/images/users_path.png)

- Deploy Hooks for [render.com](https://dashboard.render.com/) (It enables you to trigger an on-demand deploy of your Render service with a single HTTP request)
  <https://docs.render.com/deploy-hooks>
