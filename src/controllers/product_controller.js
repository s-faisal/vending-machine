'use strict'

/**
 * @author Fasil Shaikh
 * @class product_controller
 * @extends controllers.base_controller
 * @memberof controllers
 */

const baseController = require("." + "/" + "base_controller.js").base_controller;
const productService = require(".." + "/services/" + "product_service.js").product_service;

/**
 * @memberof controllers
 * @module product_controller
 */

module.exports.product_controller = class product_controller extends baseController {
    constructor() {
        super();
    }

    /**
     * @summary Fetch product from the existing catalogue
     * @public
     * @memberof controllers.product_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    getProducts(req, res, next) {
        let productServiceObj = new productService();
        productServiceObj.getProducts(req, res, function (error, success) {
            if (error) {
                if(req.headers && req.headers.first_name && req.headers.last_name){
                    let response = {
                        success: 0,
                        data: error
                    };
                    res.status(422).send(response);
                }else{
                    res.render('products', {data:[]});
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
                    res.render('products', {data:success});
                    next();
                }
            }
        });
    }

    /**
     * @summary Add data if not present
     * @public
     * @memberof controllers.product_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    loadProductData(req, res, next) {
        let productServiceObj = new productService();
        productServiceObj.loadProductData(req, res, function (error, success) {
            if (error) {
                res.locals.res_body = {"product_status":error};
            } else {
                res.locals.res_body = {"product_status":success};
            }
            next();
        });
    }
}
