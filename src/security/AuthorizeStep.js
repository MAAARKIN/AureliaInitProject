import {Redirect} from 'aurelia-router';
import AuthService from '../services/AuthService';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export default class AuthorizeStep {

	constructor(authService) {
        this.auth = authService;
    }

	run(navigationInstruction, next) {
		console.log("AuthorizeStep loading");
		console.log(this.auth.isAuthenticated());
		//algoritmo de permissoes ficará aqui
		// console.log(navigationInstruction.getAllInstructions().some(i => console.log(i.config.settings)));
		// if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf('admin') !== -1)) {
		if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
			console.log("path protegida por auth");
			// var isAdmin = /* insert magic here */false;
			let isAdmin = this.auth.isAuthenticated();

			if (!isAdmin) {
				return next.cancel(new Redirect('home'));
			}
		}

		return next();
	}
}