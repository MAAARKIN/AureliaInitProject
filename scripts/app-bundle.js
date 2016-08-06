define('app',['require','exports','module','./security/AuthorizeStep'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.App = undefined;

var _AuthorizeStep = require('./security/AuthorizeStep');

var _AuthorizeStep2 = _interopRequireDefault(_AuthorizeStep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = function () {
	function App() {
		_classCallCheck(this, App);
	}

	App.prototype.configureRouter = function configureRouter(config, router) {
		config.title = 'Aurelia';
		config.addPipelineStep('authorize', _AuthorizeStep2.default);
		config.map([{ route: ['', 'home'], name: 'home', moduleId: './components/home/home', nav: true, title: 'home', settings: { roles: [] }, auth: false }, { route: 'about', name: 'about', moduleId: './components/about/about', nav: true, title: 'Github Users', settings: { roles: [] }, auth: false }, { route: 'protected', name: 'protected', moduleId: './components/protect/protect', nav: true, title: 'protected Page', settings: { roles: ['admin'] }, auth: true }]);

		this.router = router;
	};

	return App;
}();
});

define('config',['require','exports','module'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.default = {
    baseUrl: 'http://localhost:8080/api',
    tokenName: 'token'
};
});

define('environment',['require','exports','module'],function (require, exports, module) {"use strict";

exports.__esModule = true;
exports.default = {
  debug: true,
  testing: true
};
});

define('main',['require','exports','module','./environment','aurelia-framework','aurelia-logging-console'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.configure = configure;

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _aureliaFramework = require('aurelia-framework');

var _aureliaLoggingConsole = require('aurelia-logging-console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

_aureliaFramework.LogManager.addAppender(new _aureliaLoggingConsole.ConsoleAppender());
_aureliaFramework.LogManager.setLevel(_aureliaFramework.LogManager.logLevel.debug);

function configure(aurelia) {
  aurelia.use.standardConfiguration().feature('resources');

  if (_environment2.default.debug) {
    aurelia.use.developmentLogging();
  }

  if (_environment2.default.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(function () {
    return aurelia.setRoot();
  });
}
});

define('resources/index',['require','exports','module'],function (require, exports, module) {"use strict";

exports.__esModule = true;
exports.configure = configure;
function configure(config) {}
});

define('security/AuthorizeStep',['require','exports','module','aurelia-router','../services/AuthService','aurelia-framework'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _aureliaRouter = require('aurelia-router');

var _AuthService = require('../services/AuthService');

var _AuthService2 = _interopRequireDefault(_AuthService);

var _aureliaFramework = require('aurelia-framework');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizeStep = (_dec = (0, _aureliaFramework.inject)(_AuthService2.default), _dec(_class = function () {
	function AuthorizeStep(authService) {
		_classCallCheck(this, AuthorizeStep);

		this.auth = authService;
	}

	AuthorizeStep.prototype.run = function run(navigationInstruction, next) {
		console.log("AuthorizeStep loading");
		console.log(this.auth.isAuthenticated());

		if (navigationInstruction.getAllInstructions().some(function (i) {
			return i.config.auth;
		})) {
			console.log("path protegida por auth");

			var isAdmin = this.auth.isAuthenticated();

			if (!isAdmin) {
				return next.cancel(new _aureliaRouter.Redirect('home'));
			}
		}

		return next();
	};

	return AuthorizeStep;
}()) || _class);
exports.default = AuthorizeStep;
});

define('services/AuthService',['require','exports','module','../config','aurelia-http-client','aurelia-framework'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.default = undefined;

var _dec, _class;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _aureliaHttpClient = require('aurelia-http-client');

var _aureliaFramework = require('aurelia-framework');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthService = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function AuthService(http) {
        _classCallCheck(this, AuthService);

        this.logger = _aureliaFramework.LogManager.getLogger('AuthService');
        this.logger.debug('Iniciando AuthService');
        this.http = http.configure(function (http) {
            http.withBaseUrl(_config2.default.baseUrl);
        });
    }

    AuthService.prototype.login = function login(_login, password) {
        this.logger.debug('Executando login');
        this.http.post('/login', { login: _login, password: password }).then(function (data) {
            console.log(data);
            localStorage[_config2.default.tokenName] = JSON.parse(data.response).token;
        }).catch(function (error) {
            console.log('ocorreu um erro');
            console.log(error);
        });
    };

    AuthService.prototype.logout = function logout() {
        this.logger.debug('logout');
        localStorage[_config2.default.tokenName] = null;
    };

    AuthService.prototype.isAuthenticated = function isAuthenticated() {
        return localStorage[_config2.default.tokenName] != null;
    };

    return AuthService;
}()) || _class);
exports.default = AuthService;
});

define('components/about/about',['require','exports','module'],function (require, exports, module) {"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var About = exports.About = function About() {
    _classCallCheck(this, About);
};
});

define('components/home/home',['require','exports','module','../../services/AuthService','aurelia-framework'],function (require, exports, module) {'use strict';

exports.__esModule = true;
exports.home = undefined;

var _dec, _class;

var _AuthService = require('../../services/AuthService');

var _AuthService2 = _interopRequireDefault(_AuthService);

var _aureliaFramework = require('aurelia-framework');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var home = exports.home = (_dec = (0, _aureliaFramework.inject)(_AuthService2.default), _dec(_class = function home(authService) {
    _classCallCheck(this, home);

    var logger = _aureliaFramework.LogManager.getLogger('HomeModule');
    logger.debug('me');

    this.auth = authService;
    this.auth.login("admin", "admin");
}) || _class);
});

define('components/protect/protect',['require','exports','module'],function (require, exports, module) {"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var protect = exports.protect = function protect() {
  _classCallCheck(this, protect);
};
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\t<!--<require from=\"bootstrap/dist/css/bootstrap.css\"></require>-->\n\t<!--<require from=\"bootstrap/css/bootstrap.css\"></require>-->\n\t<!--<require from=\"font-awesome/css/font-awesome.css\"></require>-->\n\n\t<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n\t\t<div class=\"navbar-header\">\n\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n\t\t\t\t<span class=\"sr-only\">Toggle Navigation</span>\n\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t</button>\n\t\t\t<a class=\"navbar-brand\" href=\"#\">\n\t\t\t\t<i class=\"fa fa-home\"></i>\n\t\t\t\t<span>${router.title}</span>\n\t\t\t</a>\n\t\t</div>\n\n\t\t<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n\t\t\t<ul class=\"nav navbar-nav\">\n\t\t\t\t<li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n\t\t\t\t\t<a href.bind=\"row.href\">${row.title}</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t<li class=\"loader\" if.bind=\"router.isNavigating\">\n\t\t\t\t\t<i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t</nav>\n\n\t<div>\n\t\t<router-view></router-view>\n\t</div>\n</template>"; });
define('text!components/about/about.html', ['module'], function(module) { module.exports = "<template>\n    <h1>About Page</h1>\n</template>"; });
define('text!components/home/home.html', ['module'], function(module) { module.exports = "<template>\n    <h1>Home Page</h1>\n    <a route-href=\"route: about; params.bind: { id: 1 }\">link to about</a>\n    \n</template>"; });
define('text!components/protect/protect.html', ['module'], function(module) { module.exports = "<template>\n    <h1>Protected</h1>\n    \n</template>"; });
//# sourceMappingURL=app-bundle.js.map