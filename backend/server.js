const express = require("express");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken")

const cors = require('cors');
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");






const databasePath = path.join(__dirname, "data.db");

const app = express();

app.use(express.json());

// Enable CORS for all routes

app.use(cors());


let database = null;


const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });



    app.listen(4001, () =>
      console.log("Server Running at http://localhost:4001/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const validatePassword = (password) => {
  return password.length > 4;
};





// to get all todos
app.post("/", async (request,response) => {
    const {user_id} = request.body;
    console.log(user_id)

    const query = `SELECT * FROM todos WHERE user_id = '${user_id}' ;`

    const data = await database.all(query)

    response.send(data)
})


// to add todo
app.post("/add-todo", async(request,response) => {

    console.log(request.body)
    const {user_id,todo,is_completed} = request.body 

    const createTodoQuery = `
     INSERT INTO
      todos (id, user_id, todo, is_completed)
     VALUES
      (
       '${uuidv4()}',
       '${user_id}',
       '${todo}',
       '${is_completed}'
      );`;

    
    await database.run(createTodoQuery);


    response.send("todo added successfully")


})


// updating status 

app.put("/change-status", async(request,response) => {
    const {status,todo_id} = request.body;

    const updateTodoQuery = `
            UPDATE todos
            SET is_completed = '${status}'
            WHERE id = '${todo_id}';`
    
    await database.run(updateTodoQuery);

    response.send("updated succesfully")
})


 
// delte todo api 

app.delete("/delete-todo", async(request,response) => {

    const {todo_id} = request.body 

    const deleteTodoQuery = `
      DELETE FROM todos WHERE id = '${todo_id}' ; 
    `

    await database.run(deleteTodoQuery)

    response.send("successfully deleted");

})





// user registeration api
app.post("/register", async (request, response) => {
  const { username, email,name, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const selectUserQuery = `SELECT * FROM users WHERE username = '${username}';`;
  const databaseUser = await database.get(selectUserQuery);

  if (databaseUser === undefined) {
    const createUserQuery = `
     INSERT INTO
      users (id,username,name, password,email)
     VALUES
      (
       '${uuidv4()}',
       '${username}',
       '${name}',
       '${hashedPassword}',
       '${email}'
      );`;
    if (validatePassword(password)) {
      await database.run(createUserQuery);
      response.send("User created successfully");
    } else {
      response.status(400);
      response.send({"error_msg":"Password is too short"});
    }
  } else {
    response.status(400);
    response.send({"error_msg":"User already exists"});
  }
});



// user login api

app.post("/login", async (request, response) => {
    const { username, password } = request.body;
    console.log(request.body)
    const selectUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
    const dbUser = await database.get(selectUserQuery);
    if (dbUser === undefined) {
      response.status(400);
      response.send({"error_msg":"Invalid User"});
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      if (isPasswordMatched === true) {
        const payload = {
          username: username,
        };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        response.send({ jwtToken,user_id:dbUser.id,username:dbUser.username});
      } else {
        response.status(400);
        response.send({"error_msg":"Invalid Password"});
      }
    }
  });





// profile details

app.post("/profile", async (request, response) => {
  const { user_id } = request.body;
  const getUserQuery = `SELECT * FROM users WHERE id = '${user_id}'`;

  const data = await database.get(getUserQuery);
  response.send(data);
});




// update name of the user 

app.put("/update-profile", async(request,response) => {
  let {name,user_id,email,password,hashPassword} = request.body;



  console.log(password.trim())
  if(password.trim().length > 4)
  {
    hashPassword = await bcrypt.hash(password, 10);
  }

   
  const updateNameQuery = `
          UPDATE users
          SET name = '${name}',
          email = '${email}',
          password = '${hashPassword}'
          WHERE id = '${user_id}';
          `
  
  await database.run(updateNameQuery);

  response.send("profile updated succesfully")
})






