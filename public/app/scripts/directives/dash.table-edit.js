angular.module('app').directive('tableDataEditable', tableDataEditable);

tableDataEditable.$inject = [
	'$compile',
	'tableFact',
	'$state',
	'$stateParams',
	'arrayUtil',
	'apiUsers'
];

function tableDataEditable($compile, tableFact, $state, $stateParams, arrayUtil, api) {
	return {
		restrict: 'E',
		link: linkFunc
	};

	function linkFunc(scope, el, attr) {
		$('#edit-modal').on('hidden.bs.modal', function() {
	    	$state.go($state.current, $stateParams, {reload: true});
		});
		
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
			var inserted = {};

			angular.forEach(tableFact.data.columns, function(value, index) {
				inserted[value.map] = ' ';
			});

			scope.rowsMap.push(inserted);
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
			var newRow = {
				index: tableFact.data.table.rows.length,
				period: _data.period,
				month: _data.month,
				field_values: []
			};

			var count = 0;

			angular.forEach(_data, function(value, key) {
				if (key != 'period' && key != 'month') {
					var column = arrayUtil.findEqualObjByKey(tableFact.data.columns, 'map', key).results[0].label;

					var field_value = {
						column: column,
						value: value,
						index: count
					};

					count++;

					newRow.field_values.push(field_value);
				}
			});

			api.addRow(tableFact.data.table._id, newRow).then(function(newRow) {
				scope.rowsMap[scope.rowsMap.length - 1] = _data;

			}).catch(function(error) {
				alert('Error');
			});
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

			angular.forEach(scope.data.columns, function(column, index) {
				td = td +  '<td class="v-middle"><span editable-text="row.' + column.map + '" e-name="' + column.map + '" e-form="rowform" onbeforesave="checkValue($data, row)" e-required>{{ row.' + column.map + ' || "empty" }}</span></td>';
			});

			td = td + '<td style="white-space: nowrap"><form  editable-form name="rowform" onbeforesave="editRow($data, row._id)" ng-show="rowform.$visible" class="form-buttons form-inline" shown="inserted == row"><button type="submit" ng-disabled="rowform.$waiting" class="btn btn-xs btn-info">save</button><button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-xs btn-default">cancel</button></form><div class="buttons" ng-show="!rowform.$visible"><button class="btn btn-xs btn-info" ng-click="rowform.$show()">edit</button><button class="btn btn-xs btn-danger" ng-click="removeRow($index, row)">del</button></div></td><div><button class="btn btn-default m-b-lg" ng-click="addRow()">Agregar fila</button></div>';

			rows = rows + td + '</tr>'
			
			return rows;
		}

		el.prepend($compile(html)(scope));
	}
}