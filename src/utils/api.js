class Api {
    constructor(options) {
        this.Url = options.Url;
        this.headers = options.headers;
    }

    getUserData() {
        return fetch(`${this.Url}/users/me`, {
            headers: this.headers
        })
            .then(res => this._getResponse(res))
    }

    getInitialCards() {
        return fetch (`${this.Url}/cards`, {
            headers: this.headers
        })
            .then(res => this._getResponse(res))
    }

    editUserData({ name, about }) {
        return fetch(`${this.Url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => this._getResponse(res))
    }

    postNewCard({ name, link }) {
        return fetch(`${this.Url}/cards `, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._getResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this.Url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => this._getResponse(res))
    }

    changeLikeStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(`${this.Url}/cards/likes/${cardId} `, {
                method: 'PUT',
                headers: this.headers
            })
                .then(res => this._getResponse(res));
        } else {
            return fetch(`${this.Url}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers
            })
                .then(res => this._getResponse(res));
        }
    }

    changeUserAvatar(data) {
        return fetch(`${this.Url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._getResponse(res))
    }

    _getResponse(res) {
        if (res.ok) {
            return(res.json());
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api({
    Url: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
        authorization: 'b88baff0-9a43-403c-833b-e4c683401608',
        'Content-type': 'application/json',
    }
});

export default api;