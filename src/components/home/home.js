import AuthService from '../../services/AuthService'
import {LogManager} from 'aurelia-framework';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class home {
    
    constructor(authService) {
        let logger = LogManager.getLogger('HomeModule');
        logger.debug('me');
        // console.log("iniciando home");
        this.auth = authService;
        this.auth.login("admin", "admin");
    }
}