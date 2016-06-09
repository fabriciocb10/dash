angular.module('app').directive('tableData', tableData);
angular.module('app').directive('tableDataEditable', tableDataEditable);
angular.module('app').factory('tableFact', tableFact);

tableData.$inject = [
	'$compile',
	'tableFact',
	'$state'
];

tableDataEditable.$inject = [
	'$compile',
	'tableFact',
	'$state',
	'arrayUtil',
	'apiUsers'
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
		scope.rowsMap = [];
		scope.rowsMap = table.rows.map(function(row, index) {
			var rowObj = {};

			rowObj._id = row._id;

			angular.forEach(row.field_values, function(value, key) {
				var key = value.column.replace(/ /g, '').toLowerCase().trim();

				rowObj[key] = value.value
			});

			return rowObj;
		});

		var columns = table.columns.map(function(col, index) {
			return {
				label: col.name,
				map: col.name.replace(/ /g, '').toLowerCase().trim()
			}
		});

		var html = '',
			htmlInit = '<div class="panel panel-default"><div class="panel-heading">' + table.name + '</div><table st-table="rowsMap" class="table table-striped">';
			htmlThead = '<thead><tr>' + buildTh() + '</tr><tr>' + buildFilter() + '</tr></thead>',
			htmlBody = '<tbody>' + buildRow() + '</tbody>';
			htmlEnd = '</table></div><button md-ink-ripple="" class="md-btn md-raised m-b btn-fw blue" ng-click="goToEdit()" tabindex="0">Editar<div class="md-ripple-container"></div><div class="md-ripple-container"></div></button></div>';

		html = htmlInit + htmlThead + htmlBody + htmlEnd;

		el.replaceWith($compile(html)(scope));

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
				filters = filters + '<th><input st-search="' + "'" + col.map + "'" + '"placeholder="search for ' + col.name + '" class="input-sm form-control" type="search"/></th>';
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

function tableDataEditable($compile, tableFact, $state, arrayUtil, api) {
	return {
		restrict: 'E',
		link: linkFunc
	};

	function linkFunc(scope, el, attr) {
		scope.data = tableFact.data;
		scope.checkValue = checkValue;
		scope.addRow = addRow;
		scope.removeRow = removeRow;
		scope.editRow = editRow;

		var htmlInit = '<h4>Editar tabla</h4><table class="table table-bordered table-hover table-condensed bg-white">',
			htmlHeaders = buildHeaders(),
			htmlRows = buildRows(),
			htmlEnd = '</table>',
			html = htmlInit + htmlHeaders + htmlRows + htmlEnd;

		function checkValue(data, user) {
			if (!data) {
				return 'No se admiten espacios vacios';
			}
		}

		function addRow() {
			scope.inserted = {};

			angular.forEach(tableFact.data.columns, function(value, index) {
				scope.inserted[value.map] = ' ';
			});

			scope.rowsMap.push(scope.inserted);
		}

		function removeRow(_index, _row) {
			api.deleteRow(tableFact.data.table._id, _row._id).then(function(rowDeleted) {
				scope.rowsMap.splice(_index, 1);
			}).catch(function(error) {
				alert('Error');
			});
		}

		function editRow(_data, _id) {
			if (!_id) {
				return createRow(_data);
			}

			var rowChanged = arrayUtil.findEqualObjByKey(tableFact.data.table.rows, '_id', _id).results[0];

			rowChanged.field_values = rowChanged.field_values.map(function(value, index) {
				value.value = _data[value.column.replace(/ /g, '').toLowerCase().trim()];

				return value;
			});

			api.editRow(tableFact.data.table._id, rowChanged).then(function(rowEdited) {

			}).catch(function(error) {
				alert('Error');
			})
		}

		function createRow(_data) {
			console.log(tableFact.data.columns);

			var newRow = {
				index: tableFact.data.table.rows.length + 1,
				field_values: []
			};

			var count = 0;

			angular.forEach(_data, function(value, key) {
				var column = arrayUtil.findEqualObjByKey(tableFact.data.columns, 'map', key).results[0].label;

				var field_value = {
					column: column,
					value: value,
					index: count
				};

				count++;

				newRow.field_values.push(field_value);
			});

			api.addRow(tableFact.data.table._id, newRow).then(function(newRow) {
				console.log(newRow);
			}).catch(function(error) {
				alert('Error');
			})
		}

		function buildHeaders() {
			var tr = '<tr>',
				colWidth = 100 / scope.data.columns.length;

			angular.forEach(scope.data.columns, function(col, index) {
				tr = tr + '<td style="width:' + colWidth + '%;">' + col.label + '</td>';
			});

			tr = tr + '</tr>';

			return tr;
		}

		function buildRows() {
			var rows = '<tr ng-repeat="row in rowsMap">',
				td = '';

			angular.forEach(scope.rowsMap[0], function(row, key) {
				if (key != '$$hashKey' && key != '_id'  && key != 'table') {
					td = td +  '<td class="v-middle"><span editable-text="row.' + key + '" e-name="' + key + '" e-form="rowform" onbeforesave="checkValue($data, row)" e-required>{{ row.' + key + ' || "empty" }}</span></td>';
				}
			});

			td = td + '<td style="white-space: nowrap"><form  editable-form name="rowform" onbeforesave="editRow($data, row._id)" ng-show="rowform.$visible" class="form-buttons form-inline" shown="inserted == row"><button type="submit" ng-disabled="rowform.$waiting" class="btn btn-xs btn-info">save</button><button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-xs btn-default">cancel</button></form><div class="buttons" ng-show="!rowform.$visible"><button class="btn btn-xs btn-info" ng-click="rowform.$show()">edit</button><button class="btn btn-xs btn-danger" ng-click="removeRow($index, row)">del</button></div></td><div><button class="btn btn-default m-b-lg" ng-click="addRow()">Agregar fila</button></div>';

			rows = rows + td + '</tr>'
			
			return rows;
		}

		el.prepend($compile(html)(scope));
	}
}