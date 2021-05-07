"use strict";

/**
 * @author Fasil Shaikh
 * @class product_service
 * @memberof services
 */

const productModel = require(".." + "/models/" + "product_model.js").product_model;
const helper = require(".." + "/helpers/" + "common.js");
const fs = require('fs')
const userService = require(".." + "/services/" + "user_service.js").user_service;

/**
 * Export product Service Class
 * @memberof services
 * @module product_service
 */

module.exports.product_service = class product_service {
    constructor() {
    }

    /**
     * @summary Following function is responsible getting the list of the products
     * @public
     * @memberof services.product_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */
    getProducts(req, res, callback){
        let productModelObj =  new productModel()
        let userServiceObj = new userService()
        productModelObj.select({}, async (error, success)=>{
            if(error){
                callback("Something went wrong", null)
            }else{
                let filter = {}

                //Addition paramater to validate the test cases
                if(req.headers && req.headers.first_name && req.headers.last_name){
                    filter.first_name = req.headers.first_name
                    filter.last_name = req.headers.last_name
                }
                userServiceObj.getUserInfo(filter, async (errorUser, successUser)=>{
                    if(errorUser){
                        callback("Something went wrong", null)
                    }else{
                        //Determines what data should go out to the users
                        let {err, succ} = await helper.filterData(error, success, ['type','price','product_name'])
                        if(succ && successUser && successUser.data && successUser.data.length>0){
                            //Validate whether there will be next page or not
                            succ.userInfo = [{
                                name: `${successUser.data[0].first_name} ${successUser.data[0].last_name}`,
                                amount: successUser.data[0].wallet_amount
                            }]
                        }
                        callback(err, succ)
                    }
                })
            }
        }, true)
    }

    /**
     * @summary Add data if not present
     * @public
     * @memberof services.product_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */
    loadProductData(req, res, callback){
        let productModelObj =  new productModel()
        productModelObj.select({}, (err, succ)=>{
            if(err){
                callback("Something went wrong", null)
            }else{
                if(succ.data.length==0){
                    //Load the product data from a file
                    const data = fs.readFileSync('./product_data.txt',
                    {encoding:'utf8', flag:'r'});
                    productModelObj.insert(JSON.parse(data), (errCount, succCount)=>{
                        if(errCount){
                            callback("Something went wrong", null)
                        }else{
                            callback(null,"Data inserted successfully")
                        }
                    })
                }else{
                    callback(null, "Data already present!")
                }
            }
        }, false)
    }

    /**
     * @summary Fetch Data of the product
     * @public
     * @memberof services.product_service
     * @param {Object} filter - Condition on which data should be fetched
     * @param {callback} callback - Callback the data to the parent function
     */
    getProductInfo(filter, callback){
        let productModelObj =  new productModel()
        productModelObj.select(filter, (err, succ)=>{
            if(err){
                callback("Something went wrong", null)
            }else{
                callback(null, succ)
            }
        }, true)
    }
}