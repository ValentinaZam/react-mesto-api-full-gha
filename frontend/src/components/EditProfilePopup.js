import React, { useState, useEffect, useContext } from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, ...props }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        placeholder="Введите имя"
        value={name || ""}
        required
        minLength="2"
        maxLength="40"
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="description-input"
        className="popup__input popup__input_type_prof"
        type="text"
        name="about"
        placeholder="О себе"
        value={description || ""}
        required
        minLength="2"
        maxLength="200"
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="popup__input-error description-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
