class Api {
  constructor({ url }) {
    this._url = url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      }
    }).then((res) => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(this._url + "/cards", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      }
    }).then((res) => this._checkResponse(res))
  }

  setUserInfo(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => this._checkResponse(res))
  }

  setUserAvatar(link) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        avatar: link.avatar
      })
    }).then((res) => this._checkResponse(res))
  }

  addCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._checkResponse(res))
  }

  deleteCards(cardId) {
    return fetch(this._url + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      }
    }).then((res) => this._checkResponse(res))
  }

  deleteLike(cardId) {
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      }
    }).then((res) => this._checkResponse(res))
  }

  addLike(cardId) {
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json"
      }
    }).then((res) => this._checkResponse(res))
  }
}

export const api = new Api({
  //url: "https://api.project-mesto-deploy.nomoredomains.xyz",
  url: "http://localhost:3000"
})
