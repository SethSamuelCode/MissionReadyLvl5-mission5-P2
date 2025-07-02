require("dotenv").config();
const fs = require("fs");
const { MongoClient } = require("mongodb"); 

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;
const ITEM_COLLECTION_NAME = process.env.ITEM_COLLECTION_NAME;  

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
        const collection = db.collection(ITEM_COLLECTION_NAME);

        const rawData = fs.readFileSync("../mongoDB/SampleAuctionData.json", "utf-8");
        const products = JSON.parse(rawData).map(toCamelCase);
        console.log("🔍 Sample cleaned product:", products[0]);

        await collection.deleteMany({});
        const result = await collection.insertMany(products);

        console.log(`✅ Inserted ${result.insertedCount} items successfully`);
    }catch(error){
        console.error("Failed to seed items:", error);
    }finally{
        await client.close();
    }

}

seedDB();   