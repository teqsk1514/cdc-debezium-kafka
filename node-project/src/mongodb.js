const { MongoClient } = require('mongodb');



const mongodbConnection = async ({ url, dbName }) => {
  // Use connect method to connect to the server
  const client = new MongoClient(url);

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  return db
}

module.exports = mongodbConnection
