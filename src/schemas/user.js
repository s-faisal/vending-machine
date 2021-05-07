const mongoose = require('mongoose');
const mongo_config = require("./base_schema").mongo_config

/**
 * @author Fasil Shaikh
 * Export user Schema
 * @memberof schemas
 * @module userSchema
 */

const userSchema = new mongoose.Schema({  

    first_name : {
		type            : String,
		trim            : true,
		maxlength       : 255,
		minlength       : 1,
		require         : [true,"Provide a valid data."]
	},

    last_name : {
		type            : String,
		trim            : true,
		maxlength       : 255,
		minlength       : 1,
		require         : [true,"Provide a valid data."]
	},
		
	wallet_amount : {
        type			: Number,
        require 		: [true,"Provide a price"],
        trim			: true,
		minlength       : 1,
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

userSchema.plugin(require("./base_schema.js").timestamp, require("./base_schema.js").mongo_var.timestamps);
module.exports.userSchema = mongoose.model('user', userSchema, 'user');