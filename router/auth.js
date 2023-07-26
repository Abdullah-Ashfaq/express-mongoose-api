const express = require("express");
const cors = require("cors")
const router = express.Router();


// Cors for the cross platfrom
router.use(cors())

// Importing the user Schema
const User = require('../model/userSchema');

// db connection file
require('../db/conn'); 


// METHOD for fetching the data 
router.get("/register", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json({ error: "Error fetching users" }));
});


// Method for Posting the Data
router.post("/register", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(422).json({ error: "please fill in the missing fields " });
  }
  // checking in the Db if user already exist throw an exception else add the user into db
  User.findOne({name: name })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "user already registered " });
      }
      // creating new user
      const user = new User({ name, age });

      user.save()
        .then(() => {
          res.status(201).json({ message: "user registered successfully" });
        })
        .catch((err) => res.status(500).json({ error: "Error saving user" }));
    })
    .catch((err) => res.status(500).json({ error: "Error finding user" }));
});

// Method for deletion
router.delete('/register/:name', async (req, res) => {
  const name = req.params.name;
  // const abc = User.find({name: name})
  // console.log(abc)

  try {
    const deletedUser = await User.findOneAndDelete({ name });
    if (!deletedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error while deleting the user:", err);
    res.status(500).json({ error: "Error while deleting the user" });
  }
});

// Method for Updation

router.put("/register/:name", (req, res) => {
  const { name } = req.params;
  const { name: newName, age } = req.body; // Destructure name from req.body as newName

  if (!age || !newName) {
    return res.status(422).json({ error: "Please provide the updated name and age" });
  }

  User.findOneAndUpdate({ name }, { name: newName, age }, { new: true }) // Include the new name and age in the update object
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    })
    .catch((err) => res.status(500).json({ error: "Error updating user" }));
});



module.exports = router;
