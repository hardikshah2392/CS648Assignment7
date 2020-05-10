/* eslint linebreak-style: ["error", "windows"] */
/* global console */
/* eslint no-restricted-globals: "off" */

require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb+srv://hardikshah:Simple$1@mongoproject-o0yje.mongodb.net/test?retryWrites=true&w=majority';

// let aboutMessage = "My Company Inventory";
let db;

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDb at', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}


function getDb() {
  return db;
}
module.exports = { connectToDb, getNextSequence, getDb };
