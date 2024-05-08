var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");

var app = Express();
app.use(Express.json());
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://oltapllana:Oltapllana123.,@thesis.euffiqk.mongodb.net/?retryWrites=true&w=majority&appName=thesis";
var DATABASENAME = "travelappdb";
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fadmgkli845hkjejksdiooi3ljrky";

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
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

let userIdCounter = 1;

app.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = userIdCounter++;

    const newUser = {
      userId,
      username,
      email,
      hashedPassword,
      role,
    };

    await database.collection("users").insertOne(newUser);

    const token = jwt.sign(
      { username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

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
      id: user._id,
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

let placesIdCounter;

const initializePlacesIdCounter = async () => {
  const collection = database.collection("travelappcollection");

  const lastPlace = await collection.findOne({}, { sort: { placesId: -1 } });
  placesIdCounter = lastPlace ? lastPlace.placesId + 1 : 1;
  return placesIdCounter;
};

app.post("/places", upload.single("image"), async (req, res) => {
  let aa = await initializePlacesIdCounter();

  const { title, description, city } = req.body;
  const { filename } = req.file;

  const placesId = aa++;

  try {
    const newPlace = {
      placesId,
      title,
      description,
      image: filename,
      city,
    };

    await database.collection("travelappcollection").insertOne(newPlace);

    return res.status(201).json({ message: "Place added successfully" });
  } catch (error) {
    console.error("Error adding place:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/places/:placesId", upload.array("images"), async (req, res) => {
  try {
    const placesId = parseInt(req.params.placesId);
    const texts = req.body.texts;
    const places = req.body.places;
    const prices = req.body.price;
    const images = req.files.map((file) => file.filename);

    await database.collection("travelappcollection").updateOne(
      { placesId },
      {
        $push: {
          thingstodo: {
            $each: texts.map((text, index) => ({
              id: uuidv4(),
              text,
              prices: prices[index],
              image: images[index],
              place: places[index],
            })),
          },
        },
      }
    );

    return res
      .status(200)
      .json({ message: "Text and images added successfully" });
  } catch (error) {
    console.error("Error adding text and images:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/travel-plan", async (req, res) => {
  try {
    const { userId, cityId, city, placePlan } = req.body;

    const existingPlan = await database
      .collection("travelplans")
      .findOne({ cityId, userId });

    if (existingPlan) {
      if (
        existingPlan.placePlan.some(
          (existingPlace) => existingPlace.id === placePlan.id
        )
      ) {
        return res.status(409).json({
          error: "Duplicate placePlan ID found for this user in the database",
        });
      }

      await database
        .collection("travelplans")
        .updateOne(
          { cityId, userId },
          { $push: { placePlan: { $each: [placePlan] } } }
        );

      return res.status(200).json({
        message: "Place plan added to existing travel plan successfully",
      });
    } else {
      await database
        .collection("travelplans")
        .insertOne({ userId, cityId, city, placePlan: [placePlan] });

      return res
        .status(201)
        .json({ message: "Travel plan saved successfully" });
    }
  } catch (error) {
    console.error("Error saving travel plan:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/:userId/travel-plans", async (req, res) => {
  try {
    const userId = req.params.userId;
    const travelPlans = await database
      .collection("travelplans")
      .find({ userId })
      .toArray();

    return res.status(200).json(travelPlans);
  } catch (error) {
    console.error("Error fetching travel plans:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/user/:userId/travel-plans/:id/:planId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const travelPlanId = req.params.id;
    const placePlanId = req.params.planId;

    const travelPlan = await database
      .collection("travelplans")
      .findOne({ _id: ObjectId(travelPlanId), userId: userId });

    if (!travelPlan) {
      return res.status(404).json({ error: "Travel plan not found" });
    }

    const updatedTravelPlan = travelPlan.placePlan.filter(
      (plan) => plan.id !== placePlanId
    );

    await database
      .collection("travelplans")
      .updateOne(
        { _id: ObjectId(travelPlanId), userId: userId },
        { $set: { placePlan: updatedTravelPlan } }
      );

    if (updatedTravelPlan.length === 0) {
      await database
        .collection("travelplans")
        .deleteOne({ _id: ObjectId(travelPlanId), userId: userId });
    }

    return res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("Error deleting place:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/set-availability/:cityId/:thingId", async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const thingId = req.params.thingId;
    const { ticketsLeft } = req.body;

    const availability = {
      cityId,
      thingId,
      ticketsLeft,
    };

    await database.collection("availability").insertOne(availability);

    return res.status(200).json({
      message: "Tickets left updated and availability stored successfully",
    });
  } catch (error) {
    console.error(
      "Error updating tickets left and storing availability:",
      error
    );
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/availability/:cityId/:thingId", async (req, res) => {
  try {
    const { cityId, thingId } = req.params;

    const availability = await database
      .collection("availability")
      .findOne({ cityId, thingId });

    if (!availability) {
      return res.status(404).json({ error: "Availability not found" });
    }

    return res.status(200).json(availability);
  } catch (error) {
    console.error("Error retrieving availability:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user/:userId/book/:thingId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const thingId = req.params.thingId;
    const { numTickets, selectedDate, selectedHour, bookedPlace } = req.body;

    const existingBooking = await database
      .collection("bookings")
      .findOne({ userId, thingId });
    if (existingBooking) {
      return res.status(409).json({
        error:
          "You have booked this one, please go to Booking tab and edit number of tickets",
      });
    }

    const availability = await database
      .collection("availability")
      .findOne({ thingId });
    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }

    if (numTickets > availability.ticketsLeft) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }
    availability.ticketsLeft -= numTickets;
    await database
      .collection("availability")
      .updateOne({ thingId }, { $set: availability });

    const cityId = availability.cityId;

    await database.collection("bookings").insertOne({
      userId,
      numTickets,
      selectedDate,
      selectedHour,
      bookedPlace,
    });

    res.json({ message: "Tickets booked successfully" });
  } catch (error) {
    console.error("Error booking tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/:userId/bookings", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await database
      .collection("bookings")
      .find({ userId })
      .toArray();

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await database.collection("bookings").find().toArray();

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await database
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/user/:userId/bookings/:bookingId", async (req, res) => {
  try {
    const { userId, bookingId } = req.params;
    const booking = await database
      .collection("bookings")
      .deleteOne({ _id: ObjectId(bookingId), userId });

    if (!booking === 0) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.status(200).json({ message: "Booking canceled successfully." });
  } catch (error) {
    console.error("Error canceling booking:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

app.put("/user/:userId/bookings/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { selectedHour, selectedDate, numTickets } = req.body;

    const booking = await database
      .collection("bookings")
      .updateOne(
        { _id: ObjectId(bookingId) },
        { $set: { selectedHour, selectedDate, numTickets } }
      );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.status(200).json({ message: "Booking updated successfully." });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});
