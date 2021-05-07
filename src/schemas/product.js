const mongoose = require('mongoose');
const mongo_config = require("./base_schema").mongo_config

/**
 * @author Fasil Shaikh
 * Export product Schema
 * @memberof schemas
 * @module productSchema
 */

const productSchema = new mongoose.Schema({  

    product_name : {
		type            : String,
		trim            : true,
		maxlength       : 255,
		minlength       : 1,
		require         : [true,"Provide a valid product name."]
	},
		
	price : {
        type			: Number,
        require 		: [true,"Provide a price"],
        trim			: true,
		minlength       : 1,
	},

    type : {
		type            : String,
		trim            : true,
		maxlength       : 255,
		minlength       : 1,
		require         : [true,"Provide a valid type."]
	},
		
	last_ordered : {
        type            : Date,
        trim            : true,
        maxlength       : 250,
        minlength       : 1,
        require         : [true,"Provide Key String."]
    },
		
	status : {
        type			: String,
        require 		: [true,"Provide Status"],
        trim			: true,
        default 		: "A",
        enum			: ['A','I']
	},

	deleted_at : {
		type			: Date
	},
}, mongo_config);

productSchema.plugin(require("./base_schema.js").timestamp, require("./base_schema.js").mongo_var.timestamps);
module.exports.productSchema = mongoose.model('product', productSchema, 'product');