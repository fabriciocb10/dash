angular
	.module('app')
	.factory('apiUsers', apiUsers);

apiUsers.$inject = ['$http', 'serverUri', '$location'];

function apiUsers($http, serverUri, $location) {
	return {
		getUsers: getUsers,
		deleteUser: deleteUser,
		getUserById: getUserById,
		editUser: editUser,
		createUser: createUser,
		getTables: getTables,
		getTablesChart: getTablesChart,
		addRow: addRow,
		editRow: editRow,
		deleteRow: deleteRow,
		getProducts: getProducts,
		login: login
	};

	var auth_token = localStorage.getItem('auth_dashboard')

	function tokenFlag() {
		if (!localStorage.getItem('auth_dashboard')) {
			$location.path('access/dashboard/login');

			return false;
		};

		return true;
	}

	function getTables(_productId) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'GET',
			cache: false,
			url: serverUri.uri + '/table/' + _productId,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function getTablesChart(_productId) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'GET',
			cache: false,
			url: serverUri.uri + '/chart/' + _productId,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function getUsers() {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'GET',
			url: serverUri.uri + '/user',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function getUserById(_userId) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'GET',
			url: serverUri.uri + '/user/' + _userId,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function createUser(_newUser) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'POST',
			url: serverUri.uri + '/user/create',
			data: _newUser,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		})
	}

	function editUser(_user) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'PUT',
			url: serverUri.uri + '/user/edit',
			data: _user,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function deleteUser(_userId) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'DELETE',
			url: serverUri.uri + '/user/delete/' + _userId,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function addRow(_tableId, _row) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'POST',
			url: serverUri.uri + '/table/add_row',
			data: {
				table_id: _tableId,
				row: _row,
			},
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function editRow(_tableId, _row) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'PUT',
			url: serverUri.uri + '/table/edit_row',
			data: {
				table_id: _tableId,
				row: _row
			},
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function deleteRow(_tableId, _rowId) {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'DELETE',
			url: serverUri.uri + '/table/delete_row/' + _tableId + '/' + _rowId,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function getProducts() {
		if (!tokenFlag()) {
			return;
		}

		return $http({
			method: 'GET',
			url: serverUri.uri + '/product',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('auth_dashboard')
			}
		});
	}

	function login(_data) {
		return $http({
			method: 'POST',
			url: serverUri.uri + '/login',
			data: _data
		});
	}
}