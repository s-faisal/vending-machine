const mongoose = require('mongoose');
const mongo_config = require("./base_schema").mongo_config

/**
 * @author Fasil Shaikh
 * Export order_history Schema
 * @memberof schemas
 * @module orderHistorySchema
 */

const orderHistorySchema = new mongoose.Schema({  
	
	product_id : {
		type            : mongoose.Types.ObjectId,
		trim            : true,
		maxlength       : 250,
		minlength       : 1,
		require         : [true,"Provide Key String."],
		ref: "product",
	},
	
	user_id : {
		type            : mongoose.Types.ObjectId,
		trim            : true,
		maxlength       : 250,
		minlength       : 1,
		require         : [true,"Provide Key String."],
		ref: "user",
	},
		
	status : {
        type			: String,
        require 		: [true,"Provide Status"],
        trim			: true,
        default 		: "A",
        enum			: ['A','I']
	},
		
	is_cancel : {
        type			: String,
        require 		: [true,"Provide Status"],
        trim			: true,
        default 		: "N",
        enum			: ['Y','N']
	},

	deleted_at : {
		type			: Date
	},
}, mongo_config);

orderHistorySchema.plugin(require("./base_schema.js").timestamp, require("./base_schema.js").mongo_var.timestamps);
module.exports.orderHistorySchema = mongoose.model('order_history', orderHistorySchema, 'order_history');