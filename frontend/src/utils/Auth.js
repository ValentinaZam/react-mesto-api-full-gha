//export const BASE_URL = "https://api.project-Mesto-deploy.nomoredomains.xyz";
//"https://auth.nomoreparties.co"
//export const BASE_URL = "http://localhost:3000";

// const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json()
//   }
//   return Promise.reject(`Ошибка: ${res}`)
// }

// export const register = (data) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     mode: "cors",
//     body: JSON.stringify({
//       email: data.email,
//       password: data.password
//     })
//   }).then((res) => checkResponse(res))
// }

// export const authorize = (userInfo) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     mode: "cors",
//     body: JSON.stringify({
//       email: userInfo.email,
//       password: userInfo.password
//     })
//   }).then((res) => checkResponse(res))
//     .then((data) => {

//       if (data.token) {
//         console.log(data.token)
//         localStorage.setItem("token", data.token);
//         return data;
//       }
//     })
//   //.then((res) => checkResponse(res))
// }

// export const checkToken = (token) => {
//   console.log(token)
//   //token = localStorage.getItem("token");
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`
//     }
//   }).then((res) => checkResponse(res))
// }

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  register(newUserData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: newUserData.email,
        password: newUserData.password,
      }),
    }).then(this._getResponseData)
  }

  authorize(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then(this._getResponseData)
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData)
  }
}

const auth = new Auth({
  baseUrl: "https://api.project-Mesto-deploy.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",

  },
})

export default auth