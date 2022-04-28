const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // const data = await client.query(baseQuery);
    // res.send(postList(data.rows));
  } catch (error) {
    next(error);
  }
});


module.exports = router;
