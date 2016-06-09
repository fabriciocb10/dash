angular
	.module('app')
	.factory('apiUsers', apiUsers);

apiUsers.$inject = ['$http', 'serverUri'];

function apiUsers($http, serverUri) {
	return {
		getUsers: getUsers,
		deleteUser: deleteUser,
		getUserById: getUserById,
		editUser: editUser,
		createUser: createUser,
		getTables: getTables,
		addRow: addRow,
		editRow: editRow,
		deleteRow: deleteRow,
		getProducts: getProducts
	};

	function getTables(_productId) {
		return $http({
			method: 'GET',
			url: serverUri.uri + '/table/' + _productId
		});
	}

	function getUsers() {
		return $http({
			method: 'GET',
			url: serverUri.uri + '/user'
		});
	}

	function getUserById(_userId) {
		return $http({
			method: 'GET',
			url: serverUri.uri + '/user/' + _userId
		});
	}

	function createUser(_newUser) {
		return $http({
			method: 'POST',
			url: serverUri.uri + '/user/create',
			data: _newUser
		})
	}

	function editUser(_user) {
		return $http({
			method: 'PUT',
			url: serverUri.uri + '/user/edit',
			data: _user
		});
	}

	function deleteUser(_userId) {
		return $http({
			method: 'DELETE',
			url: serverUri.uri + '/user/delete/' + _userId
		});
	}

	function addRow(_tableId, _row) {
		return $http({
			method: 'POST',
			url: serverUri.uri + '/table/add_row',
			data: {
				table_id: _tableId,
				row: _row
			}
		});
	}

	function editRow(_tableId, _row) {
		return $http({
			method: 'PUT',
			url: serverUri.uri + '/table/edit_row',
			data: {
				table_id: _tableId,
				row: _row
			}
		});
	}

	function deleteRow(_tableId, _rowId) {
		return $http({
			method: 'DELETE',
			url: serverUri.uri + '/table/delete_row/' + _tableId + '/' + _rowId
		});
	}

	function getProducts() {
		return $http({
			method: 'GET',
			url: serverUri.uri + '/product'
		});
	}
}