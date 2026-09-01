const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error("La base de datos no está conectada");
  }

  return db;
}

module.exports = {
  connectDB,
  getDB,
};