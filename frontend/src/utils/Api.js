class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    this.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return fetch(this._url + "/users/me", {
      method: "GET",
      headers: this._headers
    }).then((res) => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(this._url + "/cards", {
      method: "GET",
      headers: this._headers
    }).then((res) => this._checkResponse(res))
  }

  setUserInfo(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => this._checkResponse(res))
  }

  setUserAvatar(link) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar
      })
    }).then((res) => this._checkResponse(res))
  }

  addCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._checkResponse(res))
  }

  deleteCards(cardId) {
    return fetch(this._url + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._checkResponse(res))
  }

  deleteLike(cardId) {
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId)
    } else {
      return this.deleteLike(cardId)
    }
  }

  addLike(cardId) {
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this._headers
    }).then((res) => this._checkResponse(res))
  }
}

export const api = new Api({
  url: "https://api.project-Mesto-deploy.nomoredomains.xyz",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json"
  }
})
