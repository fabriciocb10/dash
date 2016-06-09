app.controller('chartCtrl', chartCtrl);

chartCtrl.$inject = [
	'$scope',
	'charts'
];

function chartCtrl($scope, charts) {
	console.log(charts);

	$scope.tables = {
		all: charts.data,
		filtered: mapLastTables(angular.copy(charts.data))
	};

	console.log($scope.tables);

	function mapLastTables(_tables) {
		var months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiempre','octubre','noviembre','diciembre'],
			currentMonth = new Date().getMonth(),
			lastMonths = [months[currentMonth], months[currentMonth - 1], months[currentMonth - 2]],
			mapedTables = null,
			tables = [];

		angular.forEach(_tables, function(table, index) {
			var tableRows = [];

			angular.forEach(table.rows, function(row, index_row) {
				var rowIndex = lastMonths.indexOf(row.field_values[0].value.toLowerCase());

				if (rowIndex > -1) {
					tableRows.push(row);
				};
			});

			table.rows = tableRows;

			tables.push(table);
		});

		return tables;
	}
}
