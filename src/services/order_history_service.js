"use strict";

/**
 * @author Fasil Shaikh
 * @class product_service
 * @memberof services
 */
const orderHistoryModel = require(".." + "/models/" + "order_history_model.js").order_history_model;
const productService = require(".." + "/services/" + "product_service.js").product_service;
const orderHistoryValidation = require(".." + "/validations/" + "order_history_validation.js").order_history_validation;
const userService = require(".." + "/services/" + "user_service.js").user_service;
const helper = require(".." + "/helpers/" + "common.js");

/**
 * Export order_history Service Class
 * @memberof services
 * @module order_history_service
 */

module.exports.order_history_service = class order_history_service {
    constructor() {
    }

    /**
     * @summary Following function is responsible for validating and placing the order as per the user request
     * @public
     * @memberof services.order_history_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */

    placeOrder(req, res, callback){
        let validation =  new orderHistoryValidation()
        let reqData = req.body
        let productServiceObj = new productService()
        let userServiceObj = new userService()
        validation.placeOrder(reqData, async (error, success)=>{
            if(error){
                callback(error, success)
            }else{
                reqData = success.value
                // Get Data of the respective product
                let filter = {
                    _id: (reqData.data),
                } 
                productServiceObj.getProductInfo(filter, (productErr, productSucc)=>{
                    if(productErr){
                        callback("Something went wrong", null)
                    }else{
                        if(productSucc.data && productSucc.data.length==1){
                            let productInfo = productSucc.data[0]

                            //validate the price that was given by user with the actual price of product
                            if(reqData.amount >= productInfo.price){

                                //validate the price of product with users wallet
                                var userBalanceCheck = {
                                    wallet_amount: {$gte: productInfo.price}
                                }

                                //Addition paramater to validate the test cases
                                if(req.headers && req.headers.first_name && req.headers.last_name){
                                    userBalanceCheck.first_name = req.headers.first_name
                                    userBalanceCheck.last_name = req.headers.last_name
                                }
                                userServiceObj.getUserInfo(userBalanceCheck, async (userErr, userSucc)=>{
                                    if(userErr){
                                        callback("Something went wrong", null)
                                    }else{
                                        if(userSucc.data && userSucc.data.length==1){
                                            let userInfo = userSucc.data[0]
                                            let insertData = {
                                                product_id: productInfo._id,
                                                user_id: userInfo._id,
                                            }

                                            //Insert product purchased details
                                            await this.asyncInsert(insertData)
                                            var updateData = {
                                                id: userInfo._id,
                                                data: {
                                                    wallet_amount: userInfo.wallet_amount - productInfo.price
                                                }
                                            }

                                            //Update user wallet
                                            await userServiceObj.asyncUserUpdate(updateData)
                                            var successMsg = `Order has been successfully placed for ${productInfo.product_name}.`

                                            //If extra currency given by user then return the change to user.
                                            if((reqData.amount - productInfo.price) > 0){
                                                successMsg += ` Also, here is your change of Rs. ${reqData.amount - productInfo.price} (Don't worry! Credited to your account)`
                                            }
                                            callback(null, successMsg)
                                        }else{
                                            callback("Insufficeint Balance", null)            
                                        }
                                    }
                                })
                            }else{
                                callback("Currency entered should be more than to equal to the price of product", null)
                            }
                        }else{
                            callback("Invalid Product Selection", null)
                        }
                    }
                })
            }
        })
    }

    /**
     * @summary Following function is responsible to convert the generic insert function to an async function
     * @public
     * @memberof services.order_history_service
     * @param {object} data - Contains the data that needs to be inserted
     */
    asyncInsert(data){
        return new Promise((resolve, reject) => {
            let orderHistoryModelObj = new orderHistoryModel()
            orderHistoryModelObj.insert(data, async (err, succ)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(succ)
                }
            })
        })   
    }

    /**
     * @summary Following function is responsible getting the list of the products that have already purchased
     * @public
     * @memberof services.order_history_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */
    getOrders(req, res, callback){
        let orderHistoryModelObj =  new orderHistoryModel()
        let userServiceObj = new userService()
        
        //Fetch order information
        let filter = {
            populate: {
                key: 'product_id user_id'
            },
            sort: {created_at:-1},
        }
        // Addition paramater to validate the test cases
        if(req.headers && req.headers.first_name && req.headers.last_name){
            filter.populate.key = [{path:"product_id"},{path:"user_id",match:{
                    first_name: req.headers.first_name,
                    last_name: req.headers.last_name,
                }
            }]
        }
        orderHistoryModelObj.select(filter, async (error, success)=>{
            if(error){
                callback("Something went wrong", null)
            }else{
                let userFilter = {}

                //Addition paramater to validate the test cases
                if(req.headers && req.headers.first_name && req.headers.last_name){
                    userFilter.first_name = req.headers.first_name
                    userFilter.last_name = req.headers.last_name
                }
                //Get user information
                userServiceObj.getUserInfo(userFilter, async (errorUser, successUser)=>{
                    if(errorUser){
                        callback("Something went wrong", null)
                    }else{
                        //delete the null users from the orders data after using populate match condition
                        success.data.forEach((elem, i) => {
                            if(elem.user_id == null){
                                delete success.data[i]
                            }
                        })

                        //Determines what data should go out to the users
                        let {err, succ} = await helper.filterData(error, success, ['is_cancel','product_id','user_id'])
                        if(succ && successUser && successUser.data && successUser.data.length>0){
                            // Validate whether there will be next page or not
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
     * @summary Following function is responsible for processing a cancellation and refund request
     * @public
     * @memberof services.order_history_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */

    processRefund(req, res, callback){
        let validation =  new orderHistoryValidation()
        let reqData = req.body
        let userServiceObj = new userService()
        let orderHistoryModelObj = new orderHistoryModel()

        //validates the request parameters 
        validation.processRefund(reqData, async (error, success)=>{
            if(error){
                callback(error, success)
            }else{
                reqData = success.value

                //Fetches the order information
                let filter = {
                    _id: (reqData.data),
                    populate: {
                        key: 'product_id user_id'
                    },
                    is_cancel: 'N'
                } 
                orderHistoryModelObj.select(filter, async (orderErr, orderSucc)=>{
                    if(orderErr){
                        callback("Something went wrong", null)
                    }else{
                        if(orderSucc.data && orderSucc.data.length==1){

                            //Populate order info, user info, product info
                            let orderInfo = orderSucc.data[0]
                            let productInfo = orderSucc.data[0].product_id
                            let userInfo = orderSucc.data[0].user_id

                            //update the refund/cancel status
                            let updateOrderData = {
                                id: orderInfo._id,
                                data: {
                                    is_cancel: 'Y'
                                }
                            }
                            await this.asyncUpdate(updateOrderData)

                            //update the user's wallet account
                            var updateUserData = {
                                id: userInfo._id,
                                data: {
                                    wallet_amount: userInfo.wallet_amount + ((productInfo.price) ? productInfo.price : 0)
                                }
                            }
                            await userServiceObj.asyncUserUpdate(updateUserData)
                            callback(null, `Refund request has been processed for product ${productInfo.product_name}.`)
                        }else{
                            callback("Invalid Order Selection", null)
                        }
                    }
                })
            }
        })
    }

    /**
     * @summary Following function is responsible to convert the generic update function to an async function
     * @public
     * @memberof services.order_history_service
     * @param {object} data - Contains the data and condition that needs to updated
     */
    asyncUpdate(data){
        return new Promise((resolve, reject) => {
            let orderHistoryModelObj = new orderHistoryModel()
            orderHistoryModelObj.findByIdAndUpdate(data, async (err, succ)=>{
                if(err){
                    resolve(err)
                }else{
                    resolve(succ)
                }
            })
        })   
    }

    /**
     * @summary Remove the order details that was created by test cases for test users
     * @public
     * @memberof services.order_history_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */
    testRemoveOrderData(req, res, callback){
        let userServiceObj =  new userService()
        let orderHistoryModelObj = new orderHistoryModel()
        let filter = {
            first_name: req.headers.first_name,
            last_name: req.headers.last_name
        }
        userServiceObj.getUserInfo(filter, (err, succ)=>{
            if(err){
                callback("Something went wrong", null)
            }else{
                if(succ.data.length==1){
                    let filterOrder = {
                        user_id: succ.data[0]._id,
                    }
                    orderHistoryModelObj.delete(filterOrder, (errOrder, succOrder)=>{
                        if(errOrder){
                            callback("Something went wrong", null)
                        }else{
                            callback(null, "Orders deleted successfully!")
                        }
                    })
                }else{
                    callback("Something went wrong", null)
                }
            }
        }, false)
    }
}