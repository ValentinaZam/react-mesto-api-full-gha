export const BASE_URL = "https://api.project-mesto-deploy.nomoredomains.xyz";
//"https://auth.nomoreparties.co"
//export const BASE_URL = "http://localhost:3000";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res}`)
}

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  }).then((res) => checkResponse(res))
}

export const authorize = (userInfo) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify({
      email: userInfo.email,
      password: userInfo.password
    })
  }).then((res) => checkResponse(res))
    .then((data) => {

      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then((res) => checkResponse(res))
}
