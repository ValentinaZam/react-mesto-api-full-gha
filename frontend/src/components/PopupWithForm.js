import React from "react"

function PopupWithForm({ title, name, isOpen, onClose, onSubmit, ...props }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_profile-edit">
        <button
          className="popup__close popup__close_edit"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <form className="popup__form popup__form_edit" name={`form-${name}`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {props.children}
          <button className="popup__submit popup__submit_edit" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
