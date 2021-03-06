var _ = require('lodash');

/**
 * Finds a model instance using the primary key.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {String} id ID of the model to find.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the found model.
 */
exports.findOne = function findOne(Model, id, callback) {
	try {
		var object = this.getObject(Model, this.getConnection()),
			self = this;
		object.retrieve(id, function retrieveCallback(err, record) {
			if (err) { return callback(self.parseError(err)); }
			try {
				var result = _.omit(record, 'attributes'),
					instance = Model.instance(result, true);
				instance.setPrimaryKey(result.Id || result.id);
				callback(null, instance);
			}
			catch (e) {
				callback(e);
			}
		});
	}
	catch (E) {
		return callback(E);
	}
};
