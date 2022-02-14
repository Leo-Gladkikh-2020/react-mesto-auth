class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._checkStatus)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._checkStatus)
    }

    changeUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name: data.name, about: data.about })
        })
            .then(this._checkStatus)
    }

    changeUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar: data.avatar })
        })
            .then(this._checkStatus)
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name: data.title, link: data.link })
        })
            .then(this._checkStatus)
    }

    deleteCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkStatus)
    }

    addLike(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._headers
        })
            .then(this._checkStatus)
    }

    deleteLike(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkStatus)
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
    headers: {
        authorization: '834693d9-1821-4fba-aca9-8dc02ca9ce04',
        'Content-Type': 'application/json'
    }
});

export default api;