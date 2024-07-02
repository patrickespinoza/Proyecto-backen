const postCase = require("../useCases/post.useCases");

const express = require("express");

const auth = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/", auth, async (request, response) => {
  try {
    const postCreated = await postCase.createPost(request.body);
    response.json({
      success: true,
      message: "Post created",
      data: {
        post: postCreated,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Error creating post",
      error: error.message,
    });
  }
});

router.get("/", async (request, response) => {
  try {
    const postAll = await postCase.getAll();
    response.json({
      success: true,
      data: {
        postAll,
      },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

// router.delete("/:id", auth, async (request, response) => {
//   try {
//     const id = request.params.id;
//     const deletePost = await postCase.deleteById(id);

//     response.json({
//       success: true,
//       data: {
//         post: deletePost,
//       },
//     });
//   } catch (error) {
//     response.status(error.status || 500);
//     response.json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

// router.patch("/:id", auth, async (request, response) => {
//   try {
//     const id = request.params.id;
//     const postUpdate = await postCase.updateById(id, request.body);

//     response.json({
//       success: true,
//       data: {
//         post: postUpdate,
//       },
//     });
//   } catch (error) {
//     response.status(error.status || 500);
//     response.json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

module.exports = router;
