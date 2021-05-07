
const timestamps = require('mongoose-timestamp');

/**
 * @author Fasil Shaikh
 */

const mongo_config = {
	/**
        * defaults to null (which means use the connection's autoIndex option) <br>
        * @type {Boolean}
        */
	autoIndex:true,
	/**
        * defaults to true <br>
        * @type {Boolean}
        */
	_id:true,
	/**
        * defaults to true <br>
        * @type {Boolean}
        */
	id:false,
	/**
        * controls document#toObject behavior when called manually - defaults to true <br>
        * @type {Boolean}
        */
	minimize:false,
	/**
        * defaults to "__v" <br>
        * @type {Boolean}
        */
	versionKey:"_rev",
	/**
        * Record Created and Updated columns <br>
        * @type {Boolean}
        */
	timestamps:false
}

const mongo_var = {
	timestamps:{
		createdAt:"created_at",
		updatedAt:"updated_at"
	},
	version_option:function(name){
		return {
			collection:name+"_versions",
			strategy:"collection"
		}
	}
}

module.exports.mongo_config = mongo_config;
module.exports.timestamp	= timestamps;
module.exports.mongo_var	= mongo_var;