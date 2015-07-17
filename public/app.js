(function(){
	'use strict';
	var app = angular.module('app', []);

	//app.constant('API_URL', 'http://localhost:3000');

	app.controller('MainCtrl', function MainCtrl(RandomUserFactory, UserFactory){
		'use strict';
		var vm = this;
		vm.getRandomUser = getRandomUser;
		vm.login = login;

		function getRandomUser() {
			RandomUserFactory.getUser().then(function success(response){
				vm.randomUser = response.data;
			});
		}

		function login(username, password){
			UserFactory.login(username, password).then(function success(response){
				vm.user = response.data.user;
				alert(response.data.token);
			}, handleError);
		}

		function handleError(response){
			alert('Error:' + response.data);
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

	app.factory('UserFactory', function($http){

		'use strict'
		return {
			login: login
		}

		function login(username, password){
			return $http.post('/login', {
				username: username,
				password: password
			});
		}
	})

})();