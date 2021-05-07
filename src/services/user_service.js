"use strict";

/**
 * @author Fasil Shaikh
 * @class user_service
 * @memberof services
 */

const userModel = require(".." + "/models/" + "user_model.js").user_model;
const fs = require('fs')

/**
 * Export user Service Class
 * @memberof services
 * @module user_service
 */

module.exports.user_service = class user_service {
    constructor() {
    }

    /**
     * @summary Add data if not present
     * @public
     * @memberof services.user_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */
    loadUserData(req, res, callback){
        let userModelObj =  new userModel()
        userModelObj.select({}, (err, succ)=>{
            if(err){
                let response = res.locals.res_body
                response.user_status = "Something went wrong"
                callback(response, null)
            }else{
                let response = res.locals.res_body
                if(succ.data.length==0){
                    //Load the user data from a file
                    const data = fs.readFileSync('./user_data.txt',
                    {encoding:'utf8', flag:'r'});
                    userModelObj.insert(JSON.parse(data), (errCount, succCount)=>{
                        if(errCount){
                            response.user_status = "Something went wrong"
                            callback(response, null)
                        }else{
                            response.user_status = "Data inserted successfully!"
                            callback(null, response)
                        }
                    })
                }else{
                    response.user_status = "Data already present!"
                    callback(null, response)
                }
            }
        }, false)
    }

    /**
     * @summary Fetch Data of the user
     * @public
     * @memberof services.user_service
     * @param {Object} filter - Condition on which data should be fetched
     * @param {callback} callback - Callback the data to the parent function
     */
    getUserInfo(filter, callback){
        let userModelObj =  new userModel()
        userModelObj.select(filter, (err, succ)=>{
            if(err){
                callback("Something went wrong", null)
            }else{
                callback(null, succ)
            }
        }, true)
    }

    /**
     * @summary Following function is responsible to convert the generic update function to an async function
     * @public
     * @memberof services.user_service
     * @param {object} data - Contains the data and condition that needs to updated
     */
    asyncUserUpdate(data){
        return new Promise((resolve, reject) => {
            let userModelObj = new userModel()
            userModelObj.findByIdAndUpdate(data, async (err, succ)=>{
                if(err){
                    resolve(err)
                }else{
                    resolve(succ)
                }
            })
        })   
    }

    /**
     * @summary Add data for testing the application
     * @public
     * @memberof services.user_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */
    testLoadUserData(req, res, callback){
        let userModelObj =  new userModel()
        let filter = {
            first_name: "test",
            last_name: "user"
        }
        userModelObj.select(filter, (err, succ)=>{
            if(err){
                callback("Something went wrong", null)
            }else{
                if(succ.data.length==0){
                    const data = {
                        "first_name": "test",
                        "last_name": "user",
                        "wallet_amount": 1000023,
                        "status": "A"
                    };
                    userModelObj.insert((data), (errCount, succCount)=>{
                        if(errCount){
                            callback("Something went wrong", null)
                        }else{
                            callback(null, "Data inserted successfully")
                        }
                    })
                }else{
                    callback(null, "Data already present")
                }
            }
        }, false)
    }

    /**
     * @summary Remove the testing user data
     * @public
     * @memberof services.user_service
     * @param {request} req - User Request Object
     * @param {response} res - User Response Object
     * @param {callback} callback - Callback the data to the parent function
     */
    testRemoveUserData(req, res, callback){
        let userModelObj =  new userModel()
        let filter = {
            first_name: req.headers.first_name,
            last_name: req.headers.last_name
        }
        userModelObj.delete(filter, (err, succ)=>{
            if(err){
                callback("Something went wrong", null)
            }else{
                callback(null, "User deleted successfully!")
            }
        }, false)
    }
}