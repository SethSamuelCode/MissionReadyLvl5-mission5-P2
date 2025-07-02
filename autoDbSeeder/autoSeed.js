require("dotenv").config();
const fs = require("fs");
const { MongoClient } = require("mongodb"); 

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;
const ITEM_COLLECTION_NAME = process.env.ITEM_COLLECTION_NAME;  
const USER_COLLECTION_NAME = process.env.USER_COLLECTION_NAME;

function toCamelCase(obj) {
    if (Array.isArray(obj)) {
      return obj.map(v => toCamelCase(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.entries(obj).reduce((acc, [key, val]) => {
        const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase())
                            .replace(/^[A-Z]/, l => l.toLowerCase());
        acc[camelKey] = toCamelCase(val);
        return acc;
      }, {});
    }
    return obj;
  }  

async function seedDB(){
    const client = new MongoClient(CONNECTION_STRING);

    try{
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const itemCollection = db.collection(ITEM_COLLECTION_NAME);
        const userCollection = db.collection(USER_COLLECTION_NAME);

        const rawItemData = fs.readFileSync("/SampleAuctionData.json", "utf-8");
        const rawUserData = fs.readFileSync("/mockUserData.json", "utf-8");

        const products = JSON.parse(rawItemData).map(toCamelCase);
        const users = JSON.parse(rawUserData).map(toCamelCase);
        console.log("🔍 Sample cleaned product:", products[0]);
        console.log("🔍 Sample cleaned user:", users[0]);

        // await collection.deleteMany({});
        const productResult = await itemCollection.insertMany(products);
        const userResult = await userCollection.insertMany(users);

        console.log(`✅ Inserted ${productResult.insertedCount} products successfully`);
        console.log(`✅ Inserted ${userResult.insertedCount} users successfully`);
    }catch(error){
        console.error("Failed to seed items:", error);
    }finally{
        await client.close();
    }

}

seedDB();   