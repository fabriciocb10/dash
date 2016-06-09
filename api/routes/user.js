var userController = require('../controllers/user');

module.exports = function(router) {
	router.route('')
		.get(userController.getAll);

	router.route('/:user_id')
		.get(userController.getById);

	router.route('/create')
		.post(userController.create);

	router.route('/edit')
		.put(userController.edit);

	router.route('/delete/:user_id')
		.delete(userController.deleteUser);
};
