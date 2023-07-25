import React, { useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }
  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        className="popup__input popup__input_type_avatar"
        type="url"
        name="avatar"
        placeholder="Аватар"
        required
        minLength="2"
        maxLength="200"
        ref={avatarRef}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup
