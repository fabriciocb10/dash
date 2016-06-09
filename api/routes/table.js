var tableController = require('../controllers/table');

module.exports = function(router) {
	router.route('/:product_id')
		.get(tableController.getAll);

	router.route('/create')
		.post(tableController.create);

	router.route('/modify')
		.put(tableController.modify);

	router.route('/delete/:table_id')
		.delete(tableController.deleteTable);

	router.route('/add_row')
		.post(tableController.addRow);

	router.route('/edit_row')
		.put(tableController.editRow);

	router.route('/delete_row/:table_id/:row_id')
		.delete(tableController.deleteRow);
};