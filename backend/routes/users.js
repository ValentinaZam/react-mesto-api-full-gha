const router = require("express").Router();

const validatorCelebrate = require("../middlewares/validatorCelebrate");

const {
  // createUser,
  getCurrentUser,
  getUsers,
  getUser,
  updateProfileUser,
  updateAvatarUser,
} = require("../controllers/users");

// router.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// }), login);
// router.post("/", createUser);
router.get("/me", validatorCelebrate.getUser, getCurrentUser);
router.get("/", getUsers);
router.get("/:userId", validatorCelebrate.getUser, getUser);
router.patch("/me", validatorCelebrate.updateUser, updateProfileUser);
router.patch("/me/avatar", validatorCelebrate.updateAvatar, updateAvatarUser);

module.exports = router;
