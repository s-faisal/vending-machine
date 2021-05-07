'use strict'

/**
 * @author Fasil Shaikh
 * @class user_controller
 * @extends controllers.base_controller
 * @memberof controllers
 */

const baseController = require("." + "/" + "base_controller.js").base_controller;
const userService = require(".." + "/services/" + "user_service.js").user_service;

/**
 * @memberof controllers
 * @module user_controller
 */

module.exports.user_controller = class user_controller extends baseController {
    constructor() {
        super();
    }

    /**
     * @summary Add data if not present
     * @public
     * @memberof controllers.user_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    loadUserData(req, res, next) {
        let userServiceObj = new userService();
        userServiceObj.loadUserData(req, res, function (error, success) {
            if (error) {
                res.send(error)
            } else {
                res.send(success)
            }
            next();
        });
    }

    /**
     * @summary Add data for testing the application
     * @public
     * @memberof controllers.user_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    testLoadUserData(req, res, next) {
        let userServiceObj = new userService();
        userServiceObj.testLoadUserData(req, res, function (error, success) {
            if (error) {
                res.send(error)
            } else {
                res.send(success)
            }
            next();
        });
    }

    /**
     * @summary Remove the user details that was created by test cases
     * @public
     * @memberof controllers.user_controller
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     */

    testRemoveUserData(req, res, next) {
        let userServiceObj = new userService();
        userServiceObj.testRemoveUserData(req, res, function (error, success) {
            if (error) {
                res.send(error)
            } else {
                res.send(success)
            }
            next();
        });
    }
}
