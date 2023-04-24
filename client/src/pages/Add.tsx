import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState<any>({
    name: "",
    description: "",
    prize: "",
    cover_png: "",
  });

  const handleChange = (e: any) => {
    setBook((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      console.log("book", book);
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="form">
        <h1>Add new book</h1>
        <input
          type="text"
          placeholder="name"
          onChange={handleChange}
          name="name"
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="description"
        />
        <input
          type="text"
          placeholder="prize in LKR"
          onChange={handleChange}
          name="prize"
        />
        <input
          type="text"
          placeholder="cover_png"
          onChange={handleChange}
          name="cover_png"
        />
        <button onClick={handleClick}>Add</button>
      </div>
    </>
  );
};

export default Add;
