import React, { useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const cardNameRef = useRef(null)
  const cardLinkRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value
    })
  }
  return (
    <PopupWithForm
      title={"Новое место"}
      name={"new-mesto"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="mesto-input"
        className="popup__input popup__input_type_mesto"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        ref={cardNameRef}
      />
      <span className="popup__input-error mesto-input-error"></span>
      <input
        id="link-input"
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={cardLinkRef}
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
