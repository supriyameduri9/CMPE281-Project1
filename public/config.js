(function() {
	angular
		.module("FileServiceApp")
		.config(configuration);

	function configuration($routeProvider, $locationProvider, $httpProvider) {

		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
		$httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

		$routeProvider
			.when("/", {
				templateUrl: "views/templates/user-login.view.client.html",
				controller: 'loginController',
				controllerAs: 'model',
			})
			.when("/login", {
				templateUrl: "views/templates/user-home.view.client.html",
				controller: 'homeController',
				controllerAs: 'model',
			})

		$locationProvider.html5Mode(true);
	}
	
})();