const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ConflictError = require("../errors/ConflictError");
const BadRequest = require("../errors/BadRequest");
const AuthError = require("../errors/AuthError");
const NotFound = require("../errors/NotFound");

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require("../models/user");

const createUser = (req, res, next) => {
  const { email, password, name, avatar, about } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, about, email, password: hash }))
    .then(() => res.status(201).send({ name, about, avatar, email }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequest(
            "Переданы некорректные данные при создании пользователя."
          )
        );
      } if (err.code === 11000) {
        return next(
          new ConflictError(`Пользователь с email '${email}' уже существует.`)
        );
      } return next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        return next(new NotFound("Пользователь по указанному id не найден."));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequest(
            "Переданы некорректные данные при запросе id пользователя"
          )
        );
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound("Пользователь по указанному id не найден."));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new BadRequest(
            "Переданы некорректные данные при запросе id пользователя"
          )
        );
      }
      return next(err);
    });
};

const updateProfileUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFound("Указанный id не найден."));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequest("Переданы некорректные данные при обновлении профиля.")
        );
      }
      if (err.name === "CastError") {
        next(new BadRequest("Переданные некорректные данные id."));
      }
      return next(err);
    });
};

const updateAvatarUser = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound("Указанный id не найден."));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequest("Переданы некорректные данные при обновлении аватара.")
        );
      }
      if (err.name === "CastError") {
        return next(new BadRequest("Переданные не корректные данные id."));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret", {
        expiresIn: "7d",
      });
      res.send({
        message: "Всё верно!",
        token,
      });
    })
    .catch(() => next(new AuthError("Не верный логин или пароль.")));
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateProfileUser,
  updateAvatarUser,
  login,
  getCurrentUser,
};
