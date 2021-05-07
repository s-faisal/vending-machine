'use strict'


/**
* @author Fasil Shaikh
* @class user_model
* @memberof models
*/

const baseModel = require("." + "/" + "base_model.js").base_model;
const userSchema = require(".." + "/schemas/" + "user.js").userSchema;

/**
 * Export user_log Model Class
 * @memberof models
 * @extends models.base_model
 * @module user_model
 */

module.exports.user_model = class user_model extends baseModel {
	constructor(db) {
		super(userSchema);
	}
}