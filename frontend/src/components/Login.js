import React, { useState } from "react"

function Login({ onSubmit }) {
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
      <h2 className="login__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  )
}
export default Login
