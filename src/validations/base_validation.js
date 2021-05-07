'use strict'
const Joi = require("joi")

/**
 * @author Fasil Shaikh
 * @class base_validation
 * @memberof validations
 * @module base_validation
 */

 module.exports.base_validation = class base_validation {

    /**
     * @summary Following function is responsible for generating a user friendly response of the error
     * @public
     * @memberof validations.base_validation
     * @param {object} data - Holds the data that needs to be checked
     * @param {object} rule - Holds the rule against which the data needs to be checked
     * @param {callback} callback - Callback the data to the parent function
     */
    validateResponse(data, rule, callback){
        let result = Joi.validate(data, rule, { abortEarly: false});
        if(result.hasOwnProperty("error") && result.error != null){
            let response = {}
            response.error = ""
            for (let i in result.error.details) {
                response.error += `, Invalid ${result.error.details[i].path}` 
            }
            response.error = response.error.substr(2)
            response.error_code = "validation_error_msg"
            response.type = 0
            callback(response, null)
        }else{
            callback(null, result)
        }
    }
}
