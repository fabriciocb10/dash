app.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = [
	'$scope',
	'apiUsers',
	'$state',
	'$rootScope'
];

function loginCtrl ($scope, api, $state, $rootScope) {
	$scope.login = login;

	function login() {
		var loginData = {
			cedula: cedulaFormat($scope.loginData.cedula),
			password: $scope.loginData.password
		};

		api.login(loginData).then(function(user) {
			if (!user.data.cedula || !user.data.password) {
				$scope.loginData.error = true;
			
			} else if (!user.data.active) {
				$scope.loginData.errorActive = true;
			}

			if (user.data.cedula && user.data.password && user.data.active) {
				localStorage.setItem('auth_dashboard', user.data.token);
				localStorage.setItem('user_dashboard', angular.toJson(user.data.user));

				$rootScope.user = user.data.user;

				$state.go('app.products');
			}
		
		}).catch(function(error) {
			alert('Error');
		})
	}

	function cedulaFormat(str) {
		return str.slice(0, 1) + '-' + str.slice(1, 5) + '-' + str.slice(5, 9);
	}
}