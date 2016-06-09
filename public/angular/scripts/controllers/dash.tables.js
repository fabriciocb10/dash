app.controller('tablesCtrl', tablesCtrl);

tablesCtrl.$inject = [
	'$scope',
	'tables'
];

function tablesCtrl ($scope, tables) {
	$scope.tables = tables.data;

	$scope.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];

	$scope.columnSort = function(_name, _index) {
		var sort = _name + '-' + _index

		$scope.sort = sort;

		return sort;
	}
}