'use strict'
const Joi = require("joi")
const baseValidation = require("." + "/" + "base_validation.js").base_validation;

/**
 * @author Fasil Shaikh
 * @class order_history_validation
 * @extends validations.base_validation
 * @memberof validations
 * @module order_history_validation
 */

module.exports.order_history_validation = class order_history_validation extends baseValidation {

    /**
     * @summary Following function is responsible for generating the rule for placeOrder api
     * @public
     * @memberof validations.order_history_validation
     * @param {object} data - Holds the data that needs to be checked
     * @param {callback} callback - Callback the data to the parent function
     */
    placeOrder(data, callback){
        let rule = Joi.object().keys({
            data: Joi.string().min(1).required().label("Details"),
            amount: Joi.number().min(1).required().label("Amount"),
        }).required().unknown(true);

        this.validateResponse(data, rule, (validateErr, validateSucc)=>{
            callback(validateErr, validateSucc)
        })
    }

    /**
     * @summary Following function is responsible for generating the rule for cancel and refund request
     * @public
     * @memberof validations.order_history_validation
     * @param {object} data - Holds the data that needs to be checked
     * @param {callback} callback - Callback the data to the parent function
     */
    processRefund(data, callback){
        let rule = Joi.object().keys({
            data: Joi.string().min(1).required().label("Details"),
        }).required().unknown(true);

        this.validateResponse(data, rule, (validateErr, validateSucc)=>{
            callback(validateErr, validateSucc)
        })
    }
}
