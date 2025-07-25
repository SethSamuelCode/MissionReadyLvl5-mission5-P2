// npm i dotenv morgan nodemon express cors

// ------------------ SETUP AND INSTALL ----------------- //

require('dotenv').config() // Load environment variables from .env
const express = require('express') // Express web server
const app = express()
const cors = require('cors') // CORS middleware
const PORT = process.env.SERVER_LISTEN_PORT // Port from environment
const assert = require('node:assert/strict') // Assertion utility for debugging
const { MongoClient, ObjectId } = require('mongodb') // MongoDB client

// --------------------- MIDDLEWARES -------------------- //

const morgan = require('morgan') // HTTP request logger
app.use(morgan('dev')) // Log requests to console
app.use(express.json({ limit: '10MB' })) // Parse JSON bodies up to 10MB.

// Configure CORS to allow only specific origins
const corsConfigs = {
  origin: (incomingOrigin, allowedAccess) => {
    // Allow localhost (any port) and production domain
    const allowedOrigins = [/^http:\/\/localhost:\d+$/]
    // Allow requests with no origin (e.g., curl, server-to-server)
    if (
      !incomingOrigin ||
      allowedOrigins.some((testOrigin) => testOrigin.test(incomingOrigin))
    ) {
      allowedAccess(null, true) // Allow
    } else {
      allowedAccess(null, false) // Deny
    }
  },
}
app.use(cors(corsConfigs)) // Apply CORS policy

// ----------------------- MONGODB ---------------------- //

const CONNECTION_STRING = process.env.CONNECTION_STRING
const DATABASE_NAME = process.env.DATABASE_NAME
const ITEM_COLLECTION_NAME = process.env.ITEM_COLLECTION_NAME
const USER_COLLECTION_NAME = process.env.USER_COLLECTION_NAME

const dbObject = {}

async function setupDB() {
  try {
    // Create new MongoDB client instance
    const client = new MongoClient(CONNECTION_STRING)
    dbObject.client = client
    // Establish connection to MongoDB
    await dbObject.client.connect()
    // Get database and collection references
    dbObject.db = dbObject.client.db(DATABASE_NAME)
    dbObject.itemCollection = dbObject.db.collection(ITEM_COLLECTION_NAME)
    dbObject.userCollection = dbObject.db.collection(USER_COLLECTION_NAME)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

// Start server only after DB connects
async function startServer() {
  try {
    await setupDB() //waiting until DB is fully ready
    console.log('✅ MongoDB connected')

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1) //exit with failure
  }
}

// use database as dbObject.itemCollection.METHOD()
// use database as dbObject.userCollection.METHOD()

// ---------------------- FUNCTIONS --------------------- //

// ------------------------ CESS ------------------------ //
//compare items by multiple IDs
app.post('/api/items/compare', async (req, resp) => {
  try {
    const { ids } = req.body

    if (!Array.isArray(ids)) {
      return resp
        .status(400)
        .json({ status: 'error', message: 'IDs must be an array' })
    }
    if (ids.length === 0) {
      return resp
        .status(400)
        .json({ status: 'error', message: 'IDs array is empty' })
    }

    const validObjectIds = ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id))

    const items = await dbObject.itemCollection
      .find({ _id: { $in: validObjectIds } })
      .toArray()

    resp.status(200).json(items)
  } catch (error) {
    console.error('Compare error:', error)
    resp.status(500).json({ status: 'error', message: 'Something went wrong.' })
  }
})

app.get('/api/items', async (req, res) => {
  try {
    const allItems = await dbObject.itemCollection.find({}).toArray()
    res.status(200).json(allItems)
  } catch (error) {
    console.error('Error fetching all items:', error)
    res.status(500).json({ status: 'error', message: 'Failed to load items' })
  }
})

// ------------------------ KERRY ----------------------- //
app.get('/api/results', async (req, res) => {
  try {
    const allItems = await dbObject.itemCollection.find({}).toArray()

    // Preserve underscores in keys while lowercasing
    const jsonString = JSON.stringify(allItems).replace(
      /"([\w_]+)"\s*:/g,
      (_, key) => `"${key.toLowerCase()}":`
    )

    const normalizedItems = JSON.parse(jsonString)

    res.status(200).json({ status: 'success', data: normalizedItems })
  } catch (error) {
    console.error('Error fetching items:', error)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
})

// ------------------------ SETH ------------------------ //

// Get item by ID
// Returns a single item from the database by its ID
// If the ID is not valid, it returns a 400 error
// If the item is not found, it returns a 404 error
// Example: /api/item/60c72b2f9b1d8c001c8e4f3a
app.get('/api/item/:itemId', async (req, resp) => {
  const itemID = req.params.itemId
  if (!ObjectId.isValid(itemID)) {
    // console.log(itemID);
    return resp
      .status(400)
      .json({ status: 'error', message: 'Invalid item ID format' })
  }

  const itemFromDB = await dbObject.itemCollection.findOne({
    _id: new ObjectId(itemID),
  })
  // console.log(itemFromDB);
  resp.status(200).json(itemFromDB)
})

app.get('/api/user/:userName', async (req, resp) => {
  const userName = req.params.userName
  // console.log(dbObject);

  const userFromDB = await dbObject.userCollection.findOne({
    userName: userName,
  })
  if (!userFromDB) {
    return resp.status(404).json({ status: 'error', message: 'User not found' })
  }

  resp.status(200).json(userFromDB)
})

//get a random number of items from the database by field name and value
// The number of items is specified in the URL parameter
// Example: /api/randomByField/category/electronics/5 will return 5 random items from the electronics category
// If the number is not a valid positive integer, it returns a 400 error
// If the field name or value is not provided, it returns a 400 error
app.get('/api/randomByField/:fieldName/:value/:number', async (req, resp) => {
  const fieldName = req.params.fieldName
  const value = req.params.value
  const number = parseInt(req.params.number, 10)
  if (isNaN(number) || number <= 0) {
    return resp
      .status(400)
      .json({ status: 'error', message: 'Invalid number parameter' })
  }
  if (!fieldName) {
    return resp
      .status(400)
      .json({ status: 'error', message: 'Field name is required' })
  }
  if (!value) {
    return resp
      .status(400)
      .json({ status: 'error', message: 'Value is required' })
  }

  // Try to convert value to number or boolean if possible
  let matchValue = value
  if (!isNaN(Number(value))) {
    matchValue = Number(value)
  } else if (value === 'true') {
    matchValue = true
  } else if (value === 'false') {
    matchValue = false
  }
  const objectsFromDB = await dbObject.itemCollection
    .aggregate([
      { $match: { [fieldName]: matchValue } },
      { $sample: { size: number } },
    ])
    .toArray()

  if (objectsFromDB.length === 0) {
    return resp.status(404).json({ status: 'error', message: 'No items found' })
  }
  // console.log(objectsFromDB);
  resp.status(200).json(objectsFromDB)
})

// get a random number of items from the database
// The number of items is specified in the URL parameter
// Example: /api/random/5 will return 5 random items
// If the number is not a valid positive integer, it returns a 400 error
app.get('/api/random/:number', async (req, resp) => {
  const number = parseInt(req.params.number, 10)
  if (isNaN(number) || number <= 0) {
    return resp
      .status(400)
      .json({ status: 'error', message: 'Invalid number parameter' })
  }

  const objectsFromDB = await dbObject.itemCollection
    .aggregate([{ $sample: { size: number } }])
    .toArray()

  if (objectsFromDB.length === 0) {
    return resp.status(404).json({ status: 'error', message: 'No items found' })
  }
  // console.log(objectsFromDB);
  resp.status(200).json(objectsFromDB)
})

// ---------------------- VALENTINE --------------------- //
// WatchList: POST -add item to watchList
app.post('/api/watchlist', async (req, res) => {
  const { itemId, userId } = req.body
  if (!itemId || !userId) {
    return res.status(400).json({ error: 'itemId and userId are required' })
  }

  try {
    const existing = await dbObject.db
      .collection('watchlist')
      .findOne({ userId, itemId: new ObjectId(itemId) })

    if (existing) {
      return res.status(409).json({ error: 'Item already in watchlist' })
    }

    const result = await dbObject.db.collection('watchlist').insertOne({
      userId,
      itemId: new ObjectId(itemId),
      addedAt: new Date(),
    })

    res
      .status(201)
      .json({ message: 'Added to watchlist', id: result.insertedId })
  } catch (error) {
    console.error('Error adding to watchlist:', error)
    res.status(500).json({ error: 'Server error' })
  }
})
// WatchList: GET - retrieve all items for a user
app.get('/api/watchlist', async (req, res) => {
  const userId = req.query.userId
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' })
  }

  try {
    const items = await dbObject.db
      .collection('watchlist')
      // Use aggregation to join with items
      .aggregate([
        { $match: { userId } },
        {
          $lookup: {
            from: 'items',
            localField: 'itemId',
            foreignField: '_id',
            as: 'itemDetails',
          },
        },
        { $unwind: '$itemDetails' },
      ])
      .toArray()

    res.json(items)
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// WatchList: DELETE - remove item from watchlist
app.delete('/api/watchlist', async (req, res) => {
  const { userId, itemId } = req.body
  if (!userId || !itemId) {
    return res.status(400).json({ error: 'userId and itemId are required' })
  }
  try {
    await dbObject.db.collection('watchlist').deleteOne({
      userId,
      itemId: new ObjectId(itemId),
    })
    res.json({ message: 'Item removed from watchlist' })
  } catch (error) {
    console.error('Error removing from watchlist:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// ----------------------- ROUTES ----------------------- //

// Health check/test GET endpoint
app.get('/test', (req, resp) => {
  resp.status(200).json({ status: 'success', data: 'youve hit /test' })
})

// Test POST endpoint to echo received data
app.post('/postTest', (req, resp) => {
  // console.log(req.body);
  resp.status(200).json({ status: 'success', data: req.body })
})

startServer()
