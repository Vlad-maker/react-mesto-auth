export class Api {
  constructor(options) {
    this._Url = options.Url;
    this._token = options.token;
    this._authUrl = options.authUrl;
  }

  _getResponse(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }

  getProfileInfo() {
    return fetch(`${this._Url}users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  setProfileInfo(data) {
    return fetch(`${this._Url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    }).then(res => {
      return this._getResponse(res);
    })
  }

  getInitialCards() {
    return fetch(`${this._Url}cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return this._getResponse(res);
    })
  }

  postNewCard(data) {
    return fetch(`${this._Url}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    }).then(res => {
      return this._getResponse(res);
    })
  }

  deleteCard(id) {
    return fetch(`${this._Url}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => {
      return this._getResponse(res);
    })
  }

  changeLikeStatus(id, isLiked) {
    if (!isLiked) {
        return fetch(`${this._Url}cards/likes/${id} `, {
            method: 'PUT',
            headers: {
                authorization: this._token
              }
        })
            .then(res => this._getResponse(res));
    } else {
        return fetch(`${this._Url}cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
              }
        })
            .then(res => this._getResponse(res));
    }
  }

  setProfileAvatar(data) {
    return fetch(`${this._Url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    }).then(res => {
      return this._getResponse(res);
    })
  }

  registration(data) {
    return fetch(`${this._authUrl}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    }).then(res => {
      return this._getResponse(res);
    })
  }

  login(data) {
    return fetch(`${this._authUrl}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    }).then(res => {
      return this._getResponse(res);
    })
  }

  checkToken(token) {
    return fetch(`${this._authUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(res => {
      return this._getResponse(res);
    })
  }

}

const options = {
  Url: 'https://mesto.nomoreparties.co/v1/cohort-19/',
  authUrl: 'https://auth.nomoreparties.co/',
  token: 'b88baff0-9a43-403c-833b-e4c683401608'
}
const api = new Api(options);
export default api;