(function(){
	'use strict';
	var app = angular.module('app', []);

	//app.constant('API_URL', 'http://localhost:3000');

	app.controller('MainCtrl', function MainCtrl(RandomUserFactory){
		'use strict';
		var vm = this;
		vm.getRandomUser = getRandomUser;

		function getRandomUser() {
			RandomUserFactory.getUser().then(function success(response){
				vm.randomUser = response.data;
			});
		}
	});

	app.factory('RandomUserFactory', function RandomUserFactory($http){
		'use strict';
		return {
			getUser: getUser
		};

		function getUser(){
			return $http.get('/random-user');
		}
	});

})();