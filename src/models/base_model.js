'use strict'

/**
 * Export base_model Model Class
 * @author Fasil Shaikh
 * @memberof models
 * @module base_model_model
 */

module.exports.base_model = class base_model {
    constructor(schema) {
        this.schema = schema
    }

    /**
     * @summary Following function generates the mongo query as per the option/condition passed and fetch the data
     * @public
     * @memberof models.base_model
     * @param {Object} data - Conditions that need to used for the query
     * @param {callback} callback - Callback the data to the parent function
     * @param {boolean} [defaultFilter=true] - Default condition flag
     */
    select(data, callback, defaultFilter = true, ) {
        let response = {}
        defaultFilter = (defaultFilter) ? {"status":"A"} : {}
        let sort = {};
        var populateKey = "";
        if(data.hasOwnProperty("populate")) {
            populateKey = data.populate.key
            delete data.populate
        }
        if(data.hasOwnProperty("sort")) {
            sort = data.sort
            delete data.sort
        }
        let limit = 0
        if(data.hasOwnProperty("limit")) {
            limit = data.limit
            delete data.limit
        }
        let filter = Object.assign({}, defaultFilter, data);
        try{
            this.schema.find(filter)
            .populate(populateKey)
            .sort(sort)
            .limit(limit)
            .then((searchData) => {
                response.data = searchData
                response.count = response.data.length
                callback(null, response)
            })
            .catch((err) => {
                response.error = err
                response.type = 0
                response.error_code = "general_error_msg"
                callback(response, null)
            })
        }catch(e){
            response.error = e
            response.type = 0
            response.error_code = "general_error_msg"
            callback(response, null)
        }
    }

    /**
     * @summary Following function insert the data into the mongo DB
     * @public
     * @memberof models.base_model
     * @param {Object} data - Data that needs to be inserted
     * @param {callback} callback - Callback the data to the parent function
     */
    insert(data, callback){
        let response = {}
        try{
            this.schema.create(data)
            .then((insertData) => {
                response.data = [insertData]
                response.count = response.data.length
                callback(null, response)
            })
            .catch((err) => {
                response.error = err
                response.type = 0
                response.error_code = "general_error_msg"
                callback(response, null)
            })
        }catch(e){
            response.error = e
            response.type = 0
            response.error_code = "general_error_msg"
            callback(response, null)
        }
    }

    /**
     * @summary Following function updates the record as per the ID
     * @public
     * @memberof models.base_model
     * @param {Object} data - Consist of condition and the data that needs to be updated
     * @param {callback} callback - Callback the data to the parent function
     */
    findByIdAndUpdate(data, callback){
        let response = {}
        try{
            this.schema.findByIdAndUpdate(data.id, data.data, { new: true })
            .then((updateData) => {
                response.data = [updateData]
                response.count = 1
                callback(null, response)
            })
            .catch((err) => {
                response.error = err
                response.type = 0
                response.error_code = "general_error_msg"
                callback(response, null)
            })
        }catch(e){
            response.error = e
            response.type = 0
            response.error_code = "general_error_msg"
            callback(response, null)
        }
    }

    // /**
    //  * @summary Following function insert data in bulk
    //  * @public
    //  * @memberof models.base_model
    //  * @param {Array} data - Consist of condition and the data that needs to be updated
    //  * @param {callback} callback - Callback the data to the parent function
    //  */
    // insertMany(data, callback){
    //     var response = {}
    //     try{
    //         this.schema.create(data)
    //         .then((insertManydata) => {
    //             response.data = [insertManydata]
    //             response.count = response.data.length
    //             callback(null, response)
    //         })
    //         .catch((err) => {
    //             response.error = err
    //             response.type = 0
    //             response.error_code = "general_error_msg"
    //             callback(response, null)
    //         })
    //     }catch(e){
    //         response.error = e
    //         response.type = 0
    //         response.error_code = "general_error_msg"
    //         callback(response, null)
    //     }
    // }

    delete(filter, callback){
        var response = {}
        try{
            this.schema.deleteMany(filter)
            .then((data) => {
                response.data = [data]
                response.count = 1
                callback(null, response)
            })
            .catch((err) => {
                response.error = err
                response.type = 0
                response.error_code = "general_error_msg"
                callback(response, null)
            })
        }catch(e){
            response.error = e
            response.type = 0
            response.error_code = "general_error_msg"
            callback(response, null)
        }
    }
}

