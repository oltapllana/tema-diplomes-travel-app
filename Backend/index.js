var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");

var app = Express();
app.use(Express.json());
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://oltapllana:Oltapllana123.,@thesis.euffiqk.mongodb.net/?retryWrites=true&w=majority&appName=thesis";
var DATABASENAME = "travelappdb";
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fadmgkli845hkjejksdiooi3ljrky"; // Replace with your own secret key

var database;

app.listen(3000, () => {
  Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASENAME);
    console.log("Conected------------------------");
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

let userIdCounter = 1;

// Endpoint to register a new user with a unique user ID
app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique user ID
    const userId = userIdCounter++;

    // Create the new user object
    const newUser = {
      userId,
      username,
      email,
      hashedPassword,
      role,
    };

    // Insert the new user into the database
    await database.collection("users").insertOne(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return success response with token
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const collection = database.collection("users");
  try {
    const user = await collection.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      role: user.role,
      username: user.username,
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/profile", async (req, res) => {
  const { username } = req.body;
  const collection = database.collection("users");

  try {
    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

app.get("/api/data", (req, res) => {
  const collection = database.collection("travelappcollection");
  collection.find({}).toArray((error, result) => {
    if (error) {
      console.error("Error retrieving data from MongoDB:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});

app.get("/country/:countryName", (req, res) => {
  const countryName = req.params.countryName;

  database
    .collection("countrydetails")
    .findOne({ country: countryName }, (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!result) {
        res.status(404).send("Country not found");
        return;
      }
      res.json(result);
    });
});

app.post(
  "/api/places/reviews/:placeId/rating",
  verifyToken,
  async (req, res) => {
    try {
      const { placeId } = req.params;
      const { rating } = req.body;

      if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({
          error: "Invalid rating. Please provide a number between 1 and 5.",
        });
      }

      const place = await database
        .collection("reviews")
        .findOne({ placeId: placeId });

      if (!place) {
        await database.collection("reviews").insertOne({
          placeId: placeId,
          ratings: [rating],
        });
        return res
          .status(201)
          .json({ message: "New place created with rating" });
      }

      await database
        .collection("reviews")
        .updateOne({ placeId: placeId }, { $push: { ratings: [rating] } });

      res.status(201).json({ message: "Rating submitted successfully" });
    } catch (error) {
      console.error("Error submitting rating:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.get("/api/users", async (req, res) => {
  try {
    const users = await database.collection("users").find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/users/:userId/role", async (req, res) => {
  const { userId } = req.params;
  const { newRole } = req.body;
  const collection = database.collection("users");

  try {
    const filter = { userId: parseInt(userId) };
    const update = { $set: { role: newRole } };

    const user = await collection.updateOne(filter, update);

    res.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const collection = database.collection("users");

  try {
    const user = await collection.findOne({ userId: parseInt(userId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await collection.deleteOne({ userId: parseInt(userId) });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

let placesIdCounter = 1;

app.post("/places", upload.single("image"), async (req, res) => {
  const { title, description, city } = req.body;
  const { filename } = req.file;

  const placesId = placesIdCounter++;
  console.log(req.body);

  try {
      const newPlace = {
          placesId,
          title,
          description,
          image: filename,
          city,
          thingsToDo: []
      };

      await database.collection("travelappcollection").insertOne(newPlace);

      return res.status(201).json({ message: "Place added successfully" });
  } catch (error) {
      console.error("Error adding place:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

