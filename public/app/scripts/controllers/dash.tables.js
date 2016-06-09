app.controller('tablesCtrl', tablesCtrl);

tablesCtrl.$inject = [
	'$scope',
	'tables'
];

function tablesCtrl ($scope, tables) {
	$scope.tables = tables.data;
	$scope.rowsMap = [];
}