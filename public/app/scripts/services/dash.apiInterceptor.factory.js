angular
	.module('app')
	.factory('apiInterceptor', apiInterceptor);

apiInterceptor.$inject = ['$q', '$location', 'serverUri'];

function apiInterceptor($q, $location, serverUri) {
	return {
		responseError: responseError
	};

	function responseError(rejectReason) {
		if (rejectReason.status === 401 || rejectReason.status === 403) {
			if (rejectReason.data.token_expired) {
				$location.path('access/dashboard/login');

				return $q.resolve(rejectReason);
			}
		}
	}
}