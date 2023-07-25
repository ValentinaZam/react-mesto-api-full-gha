const router = require("express").Router();
const auth = require("../middlewares/auth");

const validatorCelebrate = require("../middlewares/validatorCelebrate");
const NotFound = require("../errors/NotFound");
const { login, createUser } = require("../controllers/users");
const usersRouter = require("./users");
const cardsRouter = require("./cards");

router.post("/signin", validatorCelebrate.login, login);
router.post("/signup", validatorCelebrate.createUser, createUser);

router.use(auth);
router.use("/users", usersRouter);
router.use("/cards", cardsRouter);

router.use("/*", (req, res, next) => {
  next(new NotFound("Страница не найдена"));
});

module.exports = router;
