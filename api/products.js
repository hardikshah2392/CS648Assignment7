
/* eslint linebreak-style: ["error", "windows"] */
/* eslint no-restricted-globals: "off" */

const { getDb, getNextSequence } = require('./db.js');


async function add(_, { prods }) {
  const db = getDb();
  const newProd = { ...prods };
  newProd.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(newProd);
  const savedProd = await db.collection('products').findOne({ _id: result.insertedId });
  return savedProd;
}
// function setAboutMessage(_, { message }) {
//     return aboutMessage = message;
// }
async function list() {
  const db = getDb();
  const prods = await db.collection('products').find({}).toArray();
  return prods;
}
async function get(_, { id }) {
  const db = getDb();
  const prods = await db.collection('products').findOne({ id });
  return prods;
}

async function del(_, { id }) {
  const db = getDb();
  const result = await db.collection('products').removeOne({ id });
  return result.deletedCount === 1;
}

async function update(_, { id, updates }) {
  const db = getDb();
  await db.collection('products').updateOne({ id }, { $set: updates });
  const savedIssue = await db.collection('products').findOne({ id });
  return savedIssue;
}

async function counts() {
  const db = getDb();
  const results = await db.collection('products').aggregate([ { $group: { _id: null, count: { $sum: 1 } } }]).toArray();
  return results;
}

module.exports = {
  list, add, get, update, del,counts,
};
