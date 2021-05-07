'use strict'


/**
* @author Fasil Shaikh
* @class product_model
* @memberof models
*/

const baseModel = require("." + "/" + "base_model.js").base_model;
const productSchema = require(".." + "/schemas/" + "product.js").productSchema;

/**
 * Export product_log Model Class
 * @memberof models
 * @extends models.base_model
 * @module product_model
 */

module.exports.product_model = class product_model extends baseModel {
	constructor(db) {
		super(productSchema);
	}
}