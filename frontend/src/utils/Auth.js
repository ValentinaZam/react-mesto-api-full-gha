export const BASE_URL = "api.project-Mesto-deploy.nomoredomains.xyz";
//"https://auth.nomoreparties.co"

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (data) => {
  return fetch(`/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  }).then((res) => checkResponse(res))
}

export const authorize = (data) => {
  return fetch(`/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  }).then((res) => checkResponse(res))
  // .catch()
}

export const checkToken = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then((res) => checkResponse(res))
}