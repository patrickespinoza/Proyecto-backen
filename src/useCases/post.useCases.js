const createError = require("http-errors");
const Posted = require("../models/post.models");

async function createPost(postData) {
  const postFound = await Posted.findOne({
    title: postData.title,
    user: postData.user,
  });
  if (postFound) {
    throw createError(409, "Post already in use");
  }

  const createNewPost = await Posted.create(postData);
  return createNewPost;
}

async function getAll() {
  const allpost = await Posted.find().populate("user");
  return allpost;
}

async function deleteById(id) {
  const deletePost = await Posted.findByIdAndDelete(id);
  return deletePost;
}

async function updateById(id, newpostData) {
  const updatePost = await Posted.findByIdAndUpdate(id, newpostData, {
    new: true,
  });
  return updatePost;
}

module.exports = {
  createPost,
  getAll,
  deleteById,
  updateById,
};
