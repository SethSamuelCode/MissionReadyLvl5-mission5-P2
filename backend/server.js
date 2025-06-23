// npm i dotenv morgan nodemon express cors

// ------------------ SETUP AND INSTALL ----------------- //

require("dotenv").config(); // Load environment variables from .env
const express = require("express"); // Express web server
const app = express();
const cors = require("cors"); // CORS middleware
const PORT = process.env.SERVER_LISTEN_PORT; // Port from environment
const assert = require("node:assert/strict"); // Assertion utility for debugging
const { MongoClient, ObjectId } = require("mongodb"); // MongoDB client

// --------------------- MIDDLEWARES -------------------- //

const morgan = require("morgan"); // HTTP request logger
app.use(morgan("dev")); // Log requests to console
app.use(express.json({ limit: "10MB" })); // Parse JSON bodies up to 10MB.

// Configure CORS to allow only specific origins
const corsConfigs = {
  origin: (incomingOrigin, allowedAccess) => {
    // Allow localhost (any port) and production domain
    const allowedOrigins = [/^http:\/\/localhost:\d+$/];
    // Allow requests with no origin (e.g., curl, server-to-server)
    if (!incomingOrigin || allowedOrigins.some((testOrigin) => testOrigin.test(incomingOrigin))) {
      allowedAccess(null, true); // Allow
    } else {
      allowedAccess(null, false); // Deny
    }
  },
};
app.use(cors(corsConfigs)); // Apply CORS policy

// ----------------------- MONGODB ---------------------- //

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;
const ITEM_COLLECTION_NAME = process.env.ITEM_COLLECTION_NAME;
const USER_COLLECTION_NAME = process.env.USER_COLLECTION_NAME;

const dbObject = {};

async function setupDB(dbObject) {
  try {
    // Create new MongoDB client instance
    const client = new MongoClient(CONNECTION_STRING);
    dbObject.client = client;
    // Establish connection to MongoDB
    await dbObject.client.connect();
    // Get database and collection references
    dbObject.db = dbObject.client.db(DATABASE_NAME);
    dbObject.itemCollection = dbObject.db.collection(ITEM_COLLECTION_NAME);
    dbObject.userCOllection= dbObject.db.collection(USER_COLLECTION_NAME)
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Initialize database connection
setupDB(dbObject);

// use database as dbObject.itemCollection.METHOD()
// use database as dbObject.userCollection.METHOD()

// ---------------------- FUNCTIONS --------------------- //

// ------------------------ CESS ------------------------ //

// ------------------------ KERRY ----------------------- //

// ------------------------ SETH ------------------------ //

app.get("/api/item/:itemId", async (req, resp) => {
  const itemID = req.params.itemId;
  if (!ObjectId.isValid(itemID)) {
    console.log(itemID);
    return resp.status(400).json({ status: "error", message: "Invalid item ID format" });
  }

  const itemFromDB = await dbObject.collection.findOne({ _id: new ObjectId(itemID) });
  console.log(itemFromDB)
  resp.status(200).json(itemFromDB);
});

// ---------------------- VALENTINE --------------------- //

// ----------------------- ROUTES ----------------------- //

// Health check/test GET endpoint
app.get("/test", (req, resp) => {
  resp.status(200).json({ status: "success", data: "youve hit /test" });
});

// Test POST endpoint to echo received data
app.post("/postTest", (req, resp) => {
  console.log(req.body);
  resp.status(200).json({ status: "success", data: req.body });
});

// Start the Express server
app
  .listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    console.log("server error !!!!", error);
  });
