# 📚 GraphQL CRUD System

A simple **CRUD API** built with **Express.js**, **TypeScript**, **GraphQL**, and **MongoDB**, with a lightweight UI powered by **Ruru HTML**.

---

## 🚀 Tech Stack

- **Backend:** Express.js + TypeScript
- **API:** GraphQL
- **Database:** MongoDB (Mongoose)
- **UI/Playground:** Ruru (GraphQL HTML IDE)

---

## ⚡ Features

- Manage **Books** and **Authors** with full CRUD operations.
- Query books and authors by **ID** or **Name**.
- Supports adding, updating, and deleting data.
- Simple UI with **Ruru HTML** for testing queries and mutations.

---

## ▶️ Getting Started

### 1. Clone the repo

## Installation

Install this app with npm

1. Clone the repository:

   ```
   git clone https://github.com/Seyam08/express-typeScript-graphql.git
   ```

2. Make sure MongoDB is running locally or provide a connection string in .env:

   ```
   MONGO_CONNECTION_STRING="mongodb://localhost:27017/graphql"
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Start the application:

   Development version

   ```
   npm run dev
   ```

5. Build

   ```
   npm run build
   ```

6. Run the Production server

   ```
   npm start
   ```

7. Open the package.json file to see all the scripts.

## 📖 Example Queries

### Fetch all books and authors

```graphql
query {
  allBooks {
    id
    name
    author {
      id
      name
    }
  }
  allAuthors {
    id
    name
  }
}
```

### Fetch author by ID

```graphql
query {
  authorById(id: "68e2096d3d64a7ad53a") {
    id
    name
  }
}
```

### Fetch book by name

```graphql
query {
  booksByName(name: "The Forty Rules of Love") {
    id
    name
    author {
      id
      name
    }
  }
}
```

## ✍️ Example Mutations

### Add a new author

```graphql
mutation {
  addAuthor(name: "Elif Shafak") {
    id
    name
  }
}
```

### Add a new book

```graphql
mutation {
  addBook(authorName: "Elif Shafak", name: "The Forty Rules of Love") {
    id
    name
    author {
      id
      name
    }
  }
}
```

### Update an author

```graphql
mutation {
  updateAuthor(id: "68e2096d3d64a7ad62c6f53a", newName: "Elif Shafak") {
    id
    name
  }
}
```

### Delete a book

```graphql
mutation {
  deleteBook(id: "68e2096d3d64a7ad62c6f53a") {
    id
    name
  }
}
```

## 📌 Notes

- All queries and mutations can be tested using **Ruru HTML UI** or tools like **Postman** / **Insomnia**.
- Make sure MongoDB is running before executing queries.
