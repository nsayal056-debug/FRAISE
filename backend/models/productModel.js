const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const getAllProducts = async () => {
  const db = getDB();
  return await db.collection("productos").find().toArray();
};

const getProductById = async (id) => {
  const db = getDB();
  return await db.collection("productos").findOne({
    _id: new ObjectId(id),
  });
};

const createProduct = async (product) => {
  const db = getDB();
  return await db.collection("productos").insertOne(product);
};

const updateProduct = async (id, product) => {
  const db = getDB();
  return await db.collection("productos").updateOne(
    { _id: new ObjectId(id) },
    { $set: product }
  );
};

const deleteProduct = async (id) => {
  const db = getDB();
  return await db.collection("productos").deleteOne({
    _id: new ObjectId(id),
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};