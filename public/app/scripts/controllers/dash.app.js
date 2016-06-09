app.controller('appCtrl', appCtrl);

appCtrl.$inject = [
	'$scope',
	'allProducts'
];

function appCtrl($scope, products) {
	$scope.products = products.data;
	$scope.refFormat = refFormat;

	function refFormat(_product) {
		return _product.name.replace(/ /g, '-') + '({product_id: "' + _product._id + '"})';
	}
}