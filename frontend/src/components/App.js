import "../index.css"
import React, { useState, useEffect } from "react"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import { api } from "../utils/Api"
import Header from "./Header"
import Main from "./Main"
import ImagePopup from "./ImagePopup"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import Login from "./Login"
import Register from "./Register"
import { ProtectedRoute } from "./ProtectedRoute"
import InfoTooltip from "./InfoTooltip"
import * as auth from "../utils/Auth"
import Footer from "./Footer"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const [isSuccessInfoTooltipState, setIsSuccessInfoTooltipState] = useState(false)
  const [email, setEmail] = useState("")

  const handleLogin = (data) => {
    setLoggedIn(true)
    setEmail(data)
  }

  const handleLoginSubmit = (userInfo) => {
    auth
      .authorize(userInfo)
      .then(() => {
        setLoggedIn(true)
        handleLogin(userInfo.email)
        navigate("/", { replace: true })
      })
      .catch((err) => {
        console.error()
        setIsInfoTooltipOpen(true)
        setIsSuccessInfoTooltipState(false)
      })
  }

  const handleRegistrationSubmit = (data) => {
    auth
      .register(data)
      .then(() => {
        setIsInfoTooltipOpen(true)
        setIsSuccessInfoTooltipState(true)
        navigate("/sign-in")
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
        setIsInfoTooltipOpen(true)
        setIsSuccessInfoTooltipState(false)
      })
  }

  const signOut = () => {
    setLoggedIn(false)
    localStorage.removeItem("token")
    setEmail("")
    navigate("/sign-up")
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => setCards(cards.data.reverse()))
        .catch((err) => console.log(`Ошибка ${err}`))
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((email) => setCurrentUser(email))
        .catch((err) => console.log(`Ошибка ${err}`))
    }
  }, [loggedIn])

  useEffect(() => {
    const tokenUser = localStorage.getItem("token")
    if (tokenUser) {
      auth
        .checkToken(tokenUser)
        .then((user) => {

          handleLogin(user.email)
          navigate("/", { replace: true })
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
    }
  }, [loggedIn])

  function closeAllPopups() {
    const allPopupStateSetters = [
      setIsEditProfilePopupOpen,
      setIsAddPlacePopupOpen,
      setIsEditAvatarPopupOpen,
      setIsInfoTooltipOpen
    ]
    allPopupStateSetters.forEach((state) => state(false))
    setSelectedCard(null)
  }

  function addNewCard(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then((item) => {
        setCurrentUser(item)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleCardDelete(id) {
    api
      .deleteCards(id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== id))
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => (user._id || user) === currentUser._id);
    (isLiked ? api.deleteLike(card._id) : api.addLike(card._id))
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard.data._id ? newCard.data : card))
        );
      })
      .catch((err) => console.log(err));
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleCardClick(item) {
    setSelectedCard(item)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header userInfo={email} signOut={signOut} />
          <Routes>
            <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  element={Main}
                />
              }
            />
            <Route path="/sign-in" element={<Login onSubmit={handleLoginSubmit} />} />
            <Route path="/sign-up" element={<Register onSubmit={handleRegistrationSubmit} />} />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={addNewCard}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isSuccess={isSuccessInfoTooltipState}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
