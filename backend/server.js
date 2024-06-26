// Import necessary modules
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("./models/user");
const Team = require("./models/team");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",

  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Define routes
app.get("/api/users", async (req, res) => {
  const { page = 1, limit = 20, search = "", domain, gender, availability } = req.query;

  let users = await User.find().exec();


    const regex = new RegExp('^' + search, 'i'); // 'i' makes it case insensitive
    users = users.filter(user => 
      user.first_name.match(regex) || user.last_name.match(regex)
    );

  if (domain) {
    users = users.filter(user => user.domain === domain);
  }

  if (gender) {
    users = users.filter(user => user.gender === gender);
  }

  if (availability) {
    const isAvailable = availability === "true";
    users = users.filter(user => user.available === isAvailable);
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = users.slice(startIndex, endIndex);

  res.json(paginatedUsers);
});

// GET /api/users/:id: Retrieve a specific user by ID.
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// POST /api/users: Create a new user.
app.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// PUT /api/users/:id: Update an existing user.
app.put("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

app.post("/api/team", async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.json(team);
});

// GET /api/team/:id: Retrieve the details of a specific team by ID.
app.get("/api/team/:id", async (req, res) => {
  const team = await Team.findById(req.params.id);
  res.json(team);
});

// GET /api/team: Retrieve a list of all teams.
app.get("/api/team", async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

// Test route
app.get("/test", (req, res) => {
  res.json("test ok");
});

// Start server
app.listen(4000);