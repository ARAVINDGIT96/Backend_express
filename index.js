/*
## Build a Multi-Route Express Server

### 🧱 1. Project Setup

- Initialize a new Node.js project
- Install required dependencies
- Create the main server file
*/


step1:-
cmd: npm init -y  //get package.json file
cmd: npm install express //get dependencies in package-lock.json file

// create server:-

const express = require('express');
const app = express();
app.get('/',(req,res)=>
{
    res.send("Welcome to Home Page");
});
app.listen(3000,()=>
{
    console.log("Server is running at http://localhost:3000");
});


/*
### 📄 2. Create a Basic Express Server

- Import Express
- Create an Express app
- Set the app to listen on port `3000`
*/


// create server:-

const express = require('express');
const app = express();
app.get('/',(req,res)=>
{
    res.send("Welcome to Home Page");
});
app.listen(3000,()=>
{
    console.log("Server is running at http://localhost:3000");
});




/*
### 🛣️ 3. Add the Following Routes

Create individual routes for the following endpoints:

- `GET /` → Respond with a welcome message
- `GET /about` → Respond with an about page message
- `GET /contact` → Respond with contact details
- `GET /services` → Respond with a list of services (either array or JSON object)
*/


// create server:-

const express = require('express');
const app = express();
app.get('/',(req,res)=>
{
    res.send("Welcome to Home Page");
});

app.get('/about',(req,res)=>
{
res.send("This is about page");    
});
app.get('/contack',(req,res)=>
{
    res.send("This is contact page");
    });
    app.get('/services',(req,res)=>
    {
        res.send("This is services page");
        });

app.listen(3000,()=>
{
    console.log("Server is running at http://localhost:3000");
});


/*
### 🔁 4. Use Nodemon

- Run your server using `nodemon`
- Ensure the server restarts automatically on code changes
*/


step1:cmd :- npm install nodemon
step2: then change the scipts in package.json file 
 to 
 "scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
step3: cmd:-  npm run dev