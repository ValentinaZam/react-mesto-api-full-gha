const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
]

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}

const buttonEditProfile = document.querySelector(".profile__button-edit")
const popupProfile = document.querySelector(".popup_profile")
const profileName = document.querySelector(".profile__name")
const profileInfo = document.querySelector(".profile__prof")
const imageProfile = document.querySelector(".profile__photo")
const cardsTemplate = document.querySelector(".template").content.querySelector(".element")
const cardsContainer = document.querySelector(".content")
const popupAddCard = document.querySelector(".popup_new-mesto")
const buttonAddCard = document.querySelector(".profile__button-add")
const popupOpenImage = document.querySelector(".popup_image")
const formAdd = document.querySelector(".popup__form_add")
const formEdit = document.querySelector(".popup__form_edit")
const popupAvatar = document.querySelector(".popup_avatar")
const buttonEditAvatar = document.querySelector(".profile__button-photo")
const formEditAvatar = document.querySelector(".popup__form_avatar")
const popupDeleteCard = document.querySelector(".popup_delete-card")

export {
  config,
  initialCards,
  buttonEditProfile,
  popupProfile,
  profileName,
  profileInfo,
  imageProfile,
  cardsTemplate,
  cardsContainer,
  popupAddCard,
  buttonAddCard,
  popupOpenImage,
  formAdd,
  formEdit,
  popupAvatar,
  buttonEditAvatar,
  formEditAvatar,
  popupDeleteCard
}
