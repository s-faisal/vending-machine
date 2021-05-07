'use strict'

/**
 * @author Fasil Shaikh
 * @class order_history_controller
 * @extends controllers.base_controller
 * @memberof controllers
 */

const baseController = require("." + "/" + "base_controller.js").base_controller;
const orderHistoryService = require(".." + "/services/" + "order_history_service.js").order_history_service;

/**
 * Export App Controller Class
 * @memberof controllers
 * @module order_history_controller
 */

module.exports.order_history_controller = class order_history_controller extends baseController {
    constructor() {
        super();
    }

    /**
     * @summary Place the order on the basis of the items selected by the user
     * @public
     * @memberof controllers.order_history_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    placeOrder(req, res, next) {
        let orderHistoryServiceObj = new orderHistoryService();
        orderHistoryServiceObj.placeOrder(req, res, function (error, success) {
            if (error) {
                let response = {
                    success: 0,
                    message: error
                };
                res.status(422).send(response);
            } else {
                let response = {
                    success: 1,
                    message: success
                };
                res.status(200).send(response);
            }
            next();
        });
    }

    /**
     * @summary Fetch order for the existing customer
     * @public
     * @memberof controllers.order_history_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    getOrders(req, res, next) {
        let orderHistoryServiceObj = new orderHistoryService();
        orderHistoryServiceObj.getOrders(req, res, function (error, success) {
            if (error) {
                if(req.headers && req.headers.first_name && req.headers.last_name){
                    let response = {
                        success: 0,
                        data: error
                    };
                    res.status(422).send(response);
                }else{
                    res.render('orders', {data:[]});
                    next();
                }
            } else {
                if(req.headers && req.headers.first_name && req.headers.last_name){
                    let response = {
                        success: 1,
                        data: success
                    };
                    res.status(200).send(response);
                }else{
                    res.render('orders', {data:success});
                    next();
                }
            }
        });
    }

    /**
     * @summary Process the cancel & refund for the selected product
     * @public
     * @memberof controllers.order_history_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    processRefund(req, res, next) {
        let orderHistoryServiceObj = new orderHistoryService();
        orderHistoryServiceObj.processRefund(req, res, function (error, success) {
            if (error) {
                let response = {
                    success: 0,
                    message: error
                };
                res.status(422).send(response);
            } else {
                let response = {
                    success: 1,
                    message: success
                };
                res.status(200).send(response);
            }
            next();
        });
    }

    /**
     * @summary Remove the order details that was created by test cases for test users
     * @public
     * @memberof controllers.order_history_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    testRemoveOrderData(req, res, next) {
        let orderHistoryServiceObj = new orderHistoryService();
        orderHistoryServiceObj.testRemoveOrderData(req, res, function (error, success) {
            if (error) {
                res.send(error)
            } else {
                res.send(success)
            }
            next();
        });
    }
}
