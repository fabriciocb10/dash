app.controller('userController', userController);

userController.$inject = [
	'$scope',
	'apiUsers',
	'users',
	'arrayUtil',
	'editableOptions',
	'editableThemes',
	'$filter'
];

function userController($scope, api, users, arrayUtil, editableOptions, editableThemes, $filter) {
	editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

	$scope.users = mapUser(users.data);
	$scope.createUser = createUser;
	$scope.deleteUser = deleteUser;
	$scope.editUser = editUser;
	$scope.getRol = getRol;
	$scope.userEditable = null;
	$scope.getUser = getUser;
	$scope.showStatus = showStatus;
	$scope.rolList = [
		{value: 'admin', text: 'Administrador'},
      	{value: 'editor', text: 'Editor'},
      	{value: 'viewer', text: 'Analista'}
	];
	$scope.formError = {
		duplicateCedula: false,
		duplicateEmail: false
	};

	function getUser (_userId) {
		api.getUserById(_userId).then(function(user) {
			$scope.userEditable = user.data;

		}).catch(function(error) {
			alert('Error');
		})
	}

	function createUser (_newUserForm) {
		$scope.formError.duplicateCedula = arrayUtil.findEqualObjByKey($scope.users, 'cedula', $scope.newUser.cedula).founded,
		$scope.formError.duplicateEmail = arrayUtil.findEqualObjByKey($scope.users, 'email', $scope.newUser.email).founded;

		if ($scope.formError.duplicateEmail || $scope.formError.duplicateCedula) {
			return;
		}

		if (_newUserForm.$valid && $scope.newUser.rol && $scope.newUser.password === $scope.newUser.passwordConfirm) {
			$scope.newUser.rol = $scope.newUser.rol.value;

			var newUser = {};

			angular.forEach($scope.newUser, function(value, key) {
				if (key != 'passwordConfirm') {
					newUser[key] = value;
				}
			});

			api.createUser($scope.newUser).then(function(newUser) {
				var user = mapUser([newUser.data])[0];

				$scope.users.push(user);

				_newUserForm.$setPristine();
				_newUserForm.$setUntouched();

				$scope.newUser = {};

				$('#create-modal').modal('hide');
			})
		};
	}

	function deleteUser (_userId, _index) {
		if (confirm('Desea borrar el usuario?')) {
			api.deleteUser(_userId).then(function(userDeleted) {
				$scope.users.splice(_index, 1);
			}).catch(function(){
				alert('Error');
			})
		};
	}

	function editUser () {
		api.editUser($scope.userEditable).then(function(userEdited) {
			var userIndex = arrayUtil.findEqualObjByKey($scope.users, '_id', $scope.userEditable._id).index[0];

			$scope.users[userIndex].name = $scope.userEditable.name + ' ' + $scope.userEditable.last_name_1 + ' ' + $scope.userEditable.last_name_2;

		}).catch(function(error) {
			alert('Error');
		})
	}

	function getRol (_rol) {
		switch(_rol) {
			case 'viewer':
				return 'Analista';
			case 'admin':
				return 'Administrador';
			case 'editor':
				return 'Editor';
			default:
				return 'Gerente';
		}
	}

	function showStatus () {
    	var selected = $filter('filter')($scope.rolList, {value: $scope.userEditable.rol});
    	
    	return ($scope.userEditable.rol && selected.length) ? selected[0].text : 'Not set';
    };

	function mapUser (_users) {
		return _users.map(function(user) {
			return {
				_id: user._id,
				name: user.name + ' ' + user.last_name_1 + ' ' + user.last_name_2,
				rol: user.rol
			};
		});
	}
}

