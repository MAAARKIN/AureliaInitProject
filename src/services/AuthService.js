import config from '../config'
import { HttpClient } from 'aurelia-http-client';
import {LogManager} from 'aurelia-framework';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export default class AuthService {

    constructor(http) {
        this.logger = LogManager.getLogger('AuthService');
        this.logger.debug('Iniciando AuthService');
        this.http = http.configure(http => {
            http.withBaseUrl(config.baseUrl);
        });
    }

    login(login, password) {
        this.logger.debug('Executando login');
        this.http
        .post('/login', {login, password})
        .then(data => {
            console.log(data);
            localStorage[config.tokenName] = JSON.parse(data.response).token;
            // console.log(data.response);

            // console.log(JSON.parse(data.response).token);
            // return data.response;
        })
        .catch(error => {
            console.log('ocorreu um erro');
            console.log(error);
        });
        // .then(response => console.log(response));
    }

    logout() {
        this.logger.debug('logout');
        localStorage[config.tokenName] = null;
    }

    isAuthenticated() {
        return localStorage[config.tokenName] != null;
    }

}