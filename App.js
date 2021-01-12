import React, { useEffect, useState } from "react";
import "./../style/App.css";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState({
    username: "",
    age: "",
    email: "",
    number: "",
    profession: "",
  });

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const response = await fetch("http://localhost:5000/loginform");
    const data = await response.json();
    console.log(data);
    setItems(data);
  };

  const handleChange = (e) => {
    // const value = e.target.value
    // const name = e.target.name;
    const { name, value } = e.target;

    setText({
      ...text,
      [name]: value,
    });
  };

  const sendData = async () => {
    try {
      const data = await axios.post("http://localhost:5000/loginform", {
        username: text.username,
        age: text.age,
        email_id: text.email,
        phone: text.number,
        gender: "male",
        profession: text.profession,
      });

      console.log("data is submited successfully", data);
    } catch (error) {
      console.log("error in sending data", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
    text.username = "";
    text.email = "";
    text.number = "";
    text.age = "";
    text.profession = "";
  };

  const deleteItem = async (id) => {
    console.log(id);
    try {
      const deleteitembyid = await axios.delete(
        "http://localhost:5000/loginform/delete/" + id
      );
      console.log("data deleted successfully...", deleteitembyid);
    } catch (error) {
      console.log("error in deleting", error);
    }
  };

  return (
    <div className="App">
      {items.map((item) => {
        return (
          <ol key={item._id}>
            <li>
              name is :{item.username}, and i am {item.age}
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </li>
          </ol>
        );
      })}

      <h1>this is my form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your username"
          name="username"
          onChange={handleChange}
          value={text.username}
        />

        <input
          type="number"
          name="age"
          placeholder="enter your age"
          onChange={handleChange}
          value={text.age}
        />

        <input
          type="email"
          name="email"
          placeholder="enter your email id"
          onChange={handleChange}
          value={text.email}
        />
        <input
          type="number"
          name="number"
          placeholder="enter your contact number"
          onChange={handleChange}
          value={text.number}
        />
        <input
          type="text"
          name="profession"
          placeholder="enter your professions"
          onChange={handleChange}
          value={text.profession}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
