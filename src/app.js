import AuthorizeStep from './security/AuthorizeStep'

export class App {
	configureRouter(config, router) {
		config.title = 'Aurelia';
		config.addPipelineStep('authorize', AuthorizeStep);
		config.map([
			{ route: ['', 'home'], name: 'home', moduleId: './components/home/home', nav: true, title: 'home', settings: { roles: [] }, auth: false},
			{ route: 'about', name: 'about', moduleId: './components/about/about', nav: true, title: 'Github Users', settings: { roles: [] }, auth: false},
			{ route: 'protected', name: 'protected', moduleId: './components/protect/protect', nav: true, title: 'protected Page', settings: { roles: ['admin'] }, auth: true}
		]);

		this.router = router;
	}
}
