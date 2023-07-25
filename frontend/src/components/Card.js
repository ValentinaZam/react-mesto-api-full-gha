import React, { useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id
  const isLiked = card.likes.some((i) => i === currentUser._id)
  const cardLikeButtonClassName = `element__button-like ${isLiked && "element__button-like_active"}`

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleClick() {
    onCardClick(card)
  }
  const handleDeleteClick = () => {
    onCardDelete(card._id)
  }

  return (
    <div className="element element_delete">
      {isOwn && (
        <button
          className="element__button-delete"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__mesto">
        <h2 className="element__text">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Понравилось"
            onClick={handleLikeClick}
          ></button>
          <div className="element__number-like">{card.likes.length}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
