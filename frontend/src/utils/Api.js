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
    const token = localStorage.getItem("token");
    return fetch(this._url + "/users/me", {
      method: "GET",
      headers:
      {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      }
      // this._headers
    }).then((res) => this._checkResponse(res))
  }

  getInitialCards() {
    const token = localStorage.getItem("token");
    return fetch(this._url + "/cards", {
      method: "GET",
      headers:
      {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      }
    }).then((res) => this._checkResponse(res))
  }

  setUserInfo(data) {
    const token = localStorage.getItem("token");
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers:
      {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => this._checkResponse(res))
  }

  setUserAvatar(link) {
    const token = localStorage.getItem("token");
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers:
      {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        avatar: link.avatar
      })
    }).then((res) => this._checkResponse(res))
  }

  addCard(data) {
    const token = localStorage.getItem("token");
    return fetch(this._url + "/cards", {
      method: "POST",
      headers:
      {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._checkResponse(res))
  }

  deleteCards(cardId) {
    const token = localStorage.getItem("token");
    return fetch(this._url + "/cards/" + cardId, {
      method: "DELETE",
      headers:
      {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      }
    }).then((res) => this._checkResponse(res))
  }

  deleteLike(cardId) {
    const token = localStorage.getItem("token");
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers:
      {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      }
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
    const token = localStorage.getItem("token");
    return fetch(this._url + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers:
      {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      }
    }).then((res) => this._checkResponse(res))
  }
}

export const api = new Api({
  url: "http://api.project-Mesto-deploy.nomoredomains.xyz",
  // "https://mesto.nomoreparties.co/v1/cohort-64",
  // headers: {
  //   authorization: "b75175b4-0180-44ef-beaa-a76ffe56ff1c",
  //   "content-type": "application/json"
  // }
})
