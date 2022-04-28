const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/users");
const wikiRouter = require("./routes/wiki");
const { db, Page, User } = require("./models");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use("/wiki", wikiRouter);

app.get("/", async (req, res) => {
  res.redirect("/wiki");
});

const init = async () => {
  await db.sync({ force: true });

  const PORT = 1337;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
