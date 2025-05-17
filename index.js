/*
## Build a Mini Library API 📚 (Using Express.js)

You’re now the backend developer of a simple **Library System**. Your goal is to build a RESTful API to manage books using Express.js.

---
✅ Task: Create a Book Manager API
Use an array of objects to represent books in your system.

Each book should have:
`id`, `title`, `author`, and `genre`.
---
Your API must support these routes:

| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a single book by ID (URL param) |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Replace full details of a book |
| PATCH | `/books/:id` | Update part of a book’s information |
| DELETE | `/books/:id` | Delete a book by ID |
---

### 🧠 Use These Concepts:

- HTTP Methods (GET, POST, PUT, PATCH, DELETE)
- Path Parameters (`:id`)
- HTTP Status Codes (200, 201, 404, 500)
*/ 




const express = require('express');
const app = express();
app.use(express.json());

let books = [
    { id: 1, title: "The Brave", author: "John", genre: "John Father" },
    { id: 2, title: "The Soul", author: "Raghav", genre: "Raghav father" }
];


app.get("/books", (req, res) => {
    res.status(200).json(books);
});


app.get("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book Not Found" });
    }
});

app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1, 
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    };
    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
});
app.patch('/books/:id',(req,res)=>
{
  const Id = Number(req.params.id);
  const update = books.find((b)=>
  {
    return b.id === Id;
  });

  update.title  = req.body.title;
  update.author = req.body.author;
  update.genre = req.body.genre;
  res.status(200).send("Updated Succesfully");
});

app.delete("/books/:id",(req,res)=>
{
  const ID = Number(req.params.id);
  const remain = books.filter((b)=>
  {
    return b.id !== ID;
  });
  books = remain;
  res.status(200).json({ message: "Deleted Book Record", remainingBooks: books });
});

app.put('/books/:id',(req,res)=>
{
  const number = Number(req.params.id);
  const index   = books.findIndex((b)=>{
    return b.id === number;
  });
  const replace = 
  {
    id : number,
    title : req.body.title,
    author : req.body.author,
    genre : req.body.genre
  };
  books[index] = replace;
  res.status(200).send(`Successfuly replaced ${replace}`);
});
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000/books");
    console.log("Server is running at (find): http://localhost:3000/books/1");
    console.log("Server is running at (patch): http://localhost:3000/books/1");
    console.log("Server is running at (delete): http://localhost:3000/1");
});
