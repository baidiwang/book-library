const request = require("supertest");
const server = require("./server");

describe("API endpoitns", () => {
  it("GET /books should return all books", async () => {
    const res = await request(server).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(10); // initial data length
  });

  it("POST /books should add a new book", async () => {
    const newBook = {
      title: "New Book",
      author: "New Author",
      yearPublished: 2021,
      genre: "New Genre",
    };
    const res = await request(server).post("/books").send(newBook);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /books/:id books should udapte a book", async () => {
    const updatedBook = {
      title: "Update Title",
    };
    const res = await request(server).put("/books/1").send(updatedBook);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("Update Title");
  });

  it("DELETE /books/:id books should delete a book", async () => {
    const res = await request(server).delete("/books/1");
    expect(res.statusCode).toEqual(200);
  });
});
