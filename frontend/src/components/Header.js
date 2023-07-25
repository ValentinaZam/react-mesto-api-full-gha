import React from "react"
import { Link } from "react-router-dom"
import "../index.css"
import headerLogo from "../images/logo/logo_header.svg"
import { useLocation } from "react-router-dom"

function Header({ userInfo, signOut }) {
  const location = useLocation()

  return (
    <div className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Mesto" />

      {location.pathname === "/sign-up" && (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      )}
      {location.pathname === "/" && (
        <div style={{ display: "flex" }}>
          <p className="header__text">{userInfo}</p>
          <Link className="header__link" to="/sign-in" onClick={signOut}>
            Выйти
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
