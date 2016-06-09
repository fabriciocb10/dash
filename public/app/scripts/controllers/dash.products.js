app.controller('productCtrl', productCtrl);

productCtrl.$inject = [
	'$scope',
	'products',
	'$state'
];

function productCtrl($scope, products, $state) {
	$scope.products = products.data;
	$scope.goToTables = goToTables;
	$scope.imgUrlFormt = imgUrlFormt;

	function goToTables(_tableId) {
		$state.go('app.tables', { product_id: _tableId });
	}

	function imgUrlFormt(_url) {
		return _url.replace(/ /g, '');
	}
}
