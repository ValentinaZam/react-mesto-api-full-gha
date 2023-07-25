const Card = require("../models/card");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");
const ForbiddenError = require("../errors/ForbiddenError");

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequest("Переданы не корректные данные при создании карточки")
        );
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((cardResult) => {
      if (cardResult) {
        const ownerId = cardResult.owner._id.toString();
        const userId = req.user._id;
        if (ownerId === userId) {
          Card.findByIdAndRemove(cardId)
            .then((card) => {
              if (card) {
                res.send(card);
              }
            })
            .catch((err) => next(err));
        } else {
          return next(
            new ForbiddenError(
              "Вы не имеете возможность удалять чужие карточки"
            )
          );
        }
      } else {
        return next(new NotFound("Карточка по указанному id не найдена."));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequest(
            "Переданы некорректные данные при запросе id карточки."
          )
        );
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        return next(new NotFound("Карточка по указанному id не найдена."));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequest(
            "Переданы некорректные данные для постановки/снятии лайка."
          )
        );
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        return next(new NotFound("Пользователь по указанному id не найден."));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequest(
            "Переданы некорректные данные для постановки/снятии лайка."
          )
        );
      }
      return next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
