import React from "react"
import image from "../images/registr.svg"
import imageError from "../images/registerError.svg"
function InfoTooltip({ onClose, isOpen, isSuccess }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close popup__close_edit"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <div className="tooltip">
          <img src={isSuccess ? image : imageError} alt="Знак" />
          <p className="tooltip__text">
            {isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip
