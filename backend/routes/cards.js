const router = require("express").Router();

const validatorCelebrate = require("../middlewares/validatorCelebrate");

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", validatorCelebrate.createCard, createCard);
router.delete("/:cardId", validatorCelebrate.checkIdCard, deleteCard);
router.put("/:cardId/likes", validatorCelebrate.checkIdCard, likeCard);
router.delete("/:cardId/likes", validatorCelebrate.checkIdCard, dislikeCard);

module.exports = router;
