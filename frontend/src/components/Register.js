import React, { useState } from "react"
import { Link } from "react-router-dom"
// import * as auth from "../utils/Auth"

function Register({ onSubmit }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const handleChangeLogged = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formValue)
  }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form name="form-login" onSubmit={handleSubmit}>
        <input
          id="email"
          className="login__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          required
          onChange={handleChangeLogged}
        />
        <span className="popup__input-error mesto-input-error"></span>
        <input
          id="password"
          className="login__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          required
          onChange={handleChangeLogged}
        />
        <span className="popup__input-error link-input-error"></span>
        <button className="login__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="login__text">
          Уже зарегистрированы?{" "}
          <Link className="login__text" to="/sign-in" type="button">
            Войти
          </Link>
        </p>
      </form>
    </div>
  )
}
export default Register
