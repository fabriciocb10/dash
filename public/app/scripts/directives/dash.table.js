angular.module('app').directive('tableData', tableData);
angular.module('app').factory('tableFact', tableFact);

tableData.$inject = [
	'$compile',
	'tableFact',
	'$state'
];

function tableFact() {
	return {
		data: null
	}
}

function tableData($compile, tableFact, $state) {
	return {
		restrict: 'E',
		link: linkFunc
	}

	function linkFunc(scope, el, attr) {
		var table = angular.fromJson(attr.data);

		scope.goToEdit = goToEdit;
		scope.rowsMap = getRowsMap();

		var columns = table.columns.map(function(col, index) {
			return {
				label: col.name,
				map: col.name.replace(/ /g, '').toLowerCase().trim()
			}
		});

		var col_1 = {
			label: 'Periodo',
			map: 'period'
		};

		var col_2 = {
			label: 'Mes',
			map: 'month'
		};

		var col_3 = {
			label: 'Semana',
			map: 'semana'
		};

		columns.unshift(col_1, col_2, col_3);

		var html = '',
			htmlInit = '<div class="panel panel-default"><div class="panel-heading">' + table.name + '</div><table st-table="rowsMap" class="table table-striped">';
			htmlThead = '<thead><tr>' + buildTh() + '</tr><tr>' + buildFilter() + '</tr></thead>',
			htmlBody = '<tbody>' + buildRow() + '</tbody>';
			htmlEnd = '</table></div><button md-ink-ripple="" class="md-btn md-raised m-b btn-fw blue" ng-click="goToEdit()" tabindex="0">Editar<div class="md-ripple-container"></div><div class="md-ripple-container"></div></button></div>';

		html = htmlInit + htmlThead + htmlBody + htmlEnd;

		el.replaceWith($compile(html)(scope));

		function getRowsMap() {
			var map = table.rows.map(function(row, index) {
				var rowObj = {
					_id: row._id,
					period: row.period,
					month: row.month,
					week: row.week
				};

				angular.forEach(row.field_values, function(value, key) {
					var key = value.column.replace(/ /g, '').toLowerCase().trim();

					rowObj[key] = value.value
				});

				return rowObj;
			});

			return map;
		}

		function buildTh() {
			var ths = ''

			angular.forEach(columns, function(col, key) {
				ths = ths + '<th st-sort="' + col.map + '">' + col.label + '</th>';
			});

			return ths;
		}

		function buildFilter() {
			var filters = '';

			angular.forEach(columns, function(col, key) {
				filters = filters + '<th><input st-search="' + "'" + col.map + "'" + '"placeholder="Buscar por ' + col.label.toLowerCase() + '" class="input-sm form-control" type="search"/></th>';
			});

			return filters;
		}

		function buildRow() {
			var rows = '<tr ng-repeat="row in rowsMap">',
				td = '';

			angular.forEach(scope.rowsMap[0], function(row, key) {
				if (key != '_id') {
					td = td +  '<td>{{row.' + key + '}}</td>';
				}
				
			});

			rows = rows + td + '</tr>'
			
			return rows;
		}

		function goToEdit() {
			tableFact.data = {
				rowsMap: scope.rowsMap,
				columns: columns,
				table: table
			};

			$('#edit-modal').modal('show');

			angular.element(document.getElementsByTagName('table-data-editable')).remove();
			angular.element('#m-content').append($compile('<table-data-editable></table-data-editable>')(scope));
		}
	}
}