const express = require("express");
const FormData = require("./models/loginform.model");
const cors = require("cors");
require("./server");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// const router = express.Router();
// router.get("/", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
//   );
// });

// POST REQUEST
app.post("/loginform", async (req, res) => {
  try {
    const postdata = await new FormData(req.body);
    const data = await FormData.insertMany([postdata]);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET REQUEST
app.get("/loginform", async (req, res) => {
  try {
    const getdata = await FormData.find();
    res.status(200).send(getdata);
  } catch (error) {
    res.status(404).send(error);
  }
});

// dlete an item from the data base

app.delete("/loginform/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await FormData.findByIdAndDelete(_id);
    res.status(200).send(deleteData);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
