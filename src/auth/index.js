const _ = require('lodash');
const config = require('config').default;
const cookies = require('helpers/cookies').default;


class Auth {
    constructor() {
        this.hasToken = false;
        this.session = {};
        this.pending = false;

        this.initSession();
    }

    direct = {
        signIn: this.signIn.bind(this, 'direct'),
        signUp: this.signUp.bind(this, 'direct'),
    } 

    guest = {
        signIn: this.signIn.bind(this, 'guest'),
        signUp: this.signUp.bind(this, 'guest'),
    } 

    phone = {
        signIn: this.signIn.bind(this, 'phone'),
        signUp: this.signUp.bind(this, 'phone'),
        confirm: this.phoneConfirm.bind(this),
		verifyCode: this.verifyCode.bind(this)
    } 

    logout () {
        this.hasToken = false;
        this.session = null;
    }

    request(url, data){
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-App': config.appName,
                'Accept-Version': '1.0'
            },
            body: JSON.stringify(data)
        };
    
        return fetch(url, options).then(res => res.json());
    }

    promise = (resolve, reject) => {
        let counter = 0;
        let timerId = setInterval(() => {
            counter++;

            if (counter > 20) {
                clearInterval(timerId); 
                reject();
            }

            if (!this.pending) {
                let body = {
                    data: this.getSession()
                };
                resolve(body);
                clearInterval(timerId); 
            } 
        }, 50);
    }


    signUp (type, data) {
        let clientID = _.get(this.session, 'client_id');
        if (clientID) {
            data['client_id'] = clientID;
        }

        let url = `${config.authServer}/signup/${type}`;

        if (this.pending) {
            return new Promise(this.promise);
        }

        this.pending = true;

        return this.request(url, data)
            .then(body => {
                this.pending = false;

                this.saveSession(body);
                this.setGuest(type === 'guest');
    
                return body;
            });
    }

    signIn(type, data) {
        let url = `${config.authServer}/signin/${type}`;
    
        return this.request(url, data)
            .then(body => {
                this.saveSession(body);
                this.setGuest(type === 'guest');
    
                return body;
            });
    }


    phoneConfirm(phone, type) {
        let data = {
            phone
        };

		let url;
    
		if (['signin', 'signup'].includes(type)) {
			url = `${config.authServer}/${type}/phone/confirm`;
		}
		else {
			url = `${config.authServer}/phone/confirm`;
		}
        
        return this.request(url, data);
    }

	verifyCode(phone, code) {
        let data = {
            phone,
			code
        };
    
        let url = `${config.authServer}/phone/verifycode`;

        return this.request(url, data);
    }
    
    
    refreshToken() {
        let data = {};

        if (this.pending) {
            return new Promise(this.promise);
        }
        
        this.pending = true;
       
        data.token = this.session.token;
        data.refresh_token = this.session.refresh_token;

        let url = `${config.authServer}/token/refresh`;

        return this.request(url, data)
            .then(body => {
                if ('error' in body) {
                    this.logout();
                } 
                else {
                    this.pending = false;
                    this.saveSession(body);  
                }
                this.pending = false;
                this.saveSession(body);
            });
    }

    getSession() {
        return this.session;
    }

    initSession() {
        let token = cookies.get('token');
        let refreshToken = cookies.get('refresh_token');
        let clietID = cookies.get('cliet_id');
        let expiresAt = cookies.get('expires_at');

        let data = {};
    
        if (token) {
            this.hasToken = true;
            data.token = token;
        }

        if (refreshToken) {
            data['refresh_token'] = refreshToken;
        }
        if (clietID) {
            data['cliet_id'] = clietID;
        }
        if (expiresAt) {
            data['expires_at'] = expiresAt;
        }

        let now = new Date().getTime();
        let diff = parseInt(expiresAt, 10) * 1000 - now;

        // from 0 to 1 hour 
        if (diff > 0 && diff < 3600000) {
            setTimeout(() => {
                this.refreshToken();
            }, diff - 5000);
        }

        this.session = data;
    }

    saveSession(body) {
        if (body.result === 'error') {
            return;
        }
    
        let month = 30 * 24 * 60 * 60;
    
        let {
            token, 
            refresh_token,
            expires_at,
            client_id
        } = body.data;
    
        cookies.save('token', token, {'path': '/', 'max-age': 9 * month});
        cookies.save('expires_at', expires_at, {'path': '/', 'max-age': 9 * month});
        cookies.save('client_id', client_id, {'path': '/', 'max-age': 24 * month});
        cookies.save('refresh_token', refresh_token, {'path': '/', 'max-age': 9 * month});
    
        this.hasToken = true;

        this.session = body.data;
    }


    setGuest (value) {
        let isGuest = value ? 1 : 0;

        let month = 30 * 24 * 60 * 60;
        cookies.save('isg', isGuest, {'path': '/', 'max-age': 9 * month});
    }
}

const _auth = new Auth();

module.exports = _auth;
