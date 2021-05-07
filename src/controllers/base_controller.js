'use strict'

/**
 * @author Fasil Shaikh
 * @version 1.0.0
 */

/**
 * @class base_controller
 * @classdesc Application Base Controller
 * @memberof controllers
 */

/**
 * Export Base Controller Class
 * @memberof controllers
 * @module base_controller
 */

module.exports.base_controller = class base_controller {
    /**
     * @private
     * @memberof controllers.base_controller
     * @member
     * @type {ObjectArray}
     */

    constructor() {
        this.modules = {};
    }

    /**
     * @summary add modules in controller
     * @public
     * @memberof controllers.base_controller
     * @function _addModules
     * @param {string} - Module Variable Name
     * @param {moduleObject} - Module Object
     */

    _addModules(moduleName, moduleValue) {
        this.modules[moduleName] = moduleValue;
    }
}