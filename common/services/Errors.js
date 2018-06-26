module.exports = {
	get: function (tag) {
		var errors = {
			MISSING_INVALID_PARAMS: {
				status: 400,
				error: {
					code: -1,
					message: 'Missing/invalid parameters.',
					params: []
				}
			},
			INTERNAL_SERVER_ERROR: {
				status: 500,
				error: {
					code: -2,
					message: 'Internal server error.'
				}
			},
			INVALID_CREDENTIALS: {
				status: 403,
				error: {
					code: -3,
					message: 'Username or Password is incorrect.'
				}
			},
			UNAUTHORIZED: {
				status: 401,
				error: {
					code: -5,
					message: 'Unauthorized'
				}
			},
			NOT_FOUND: {
				status: 404,
				error: {
					code: -6,
					message: 'Not Found'
				}
			}
		};
		return errors[tag];
	},
	raise: function (e) {
		var error = JSON.parse(JSON.stringify(this.get(e)));
		return error;
	}
};