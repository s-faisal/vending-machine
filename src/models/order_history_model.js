'use strict'

/**
* @author Fasil Shaikh
* @class order_history_model
* @memberof models
*/

const baseModel = require("." + "/" + "base_model.js").base_model;
const orderHistorySchema = require(".." + "/schemas/" + "order_history.js").orderHistorySchema;

/**
 * Export order_history_log Model Class
 * @memberof models
 * @extends models.base_model
 * @module order_history_model
 */

module.exports.order_history_model = class order_history_model extends baseModel {
	constructor(db) {
		super(orderHistorySchema);
	}
}