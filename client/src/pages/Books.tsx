import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setbooks] = useState<any>([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setbooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id: number) => {
    console.log(id);
    try {
      console.log("try");
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1>Books</h1>
        <div className="books">
          {books.map((book: any) => (
            <div className="book" key={book.id}>
              {book.cover_png && (
                <img src="book.cover_png" alt="book.cover_png" />
              )}
              <h2>{book.name}</h2>
              <p>{book.description}</p>
              <span>{book.prize}</span>
              <button className="update">
                <Link to={`/update/${book.id}`}>Udpate</Link>
              </button>
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="add">
          <button>
            <Link to={"/add"}>Add new book</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Books;
