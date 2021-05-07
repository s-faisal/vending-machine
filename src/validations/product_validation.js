'use strict'
const Joi = require("joi")
const baseValidation = require("." + "/" + "base_validation.js").base_validation;

/**
 * @author Fasil Shaikh
 * @class product_validation
 * @extends validations.base_validation
 * @memberof validations
 * @module product_validation
 */

module.exports.product_validation = class product_validation extends baseValidation {

    /**
     * @summary Following function is responsible for generating the rule for getProduct api
     * @public
     * @memberof validations.product_validation
     * @param {object} data - Holds the data that needs to be checked
     * @param {callback} callback - Callback the data to the parent function
     */
    getProduct(data, callback){
        let rule = Joi.object().keys({
            page: Joi.number().required().label("Page"),
            order_by: Joi.any().valid("dish","type","cusine","price").default('dish').optional().label("Order By"),
            is_asc: Joi.boolean().default(true).optional().label("is Ascending"),
            search_by: Joi.string().optional().default('').label("Search By"),
        }).required().unknown(true);

        this.validateResponse(data, rule, (validateErr, validateSucc)=>{
            callback(validateErr, validateSucc)
        })
    }
}
