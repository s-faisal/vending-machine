
/**
* @author Fasil Shaikh
* @param {Object} err
* @param {Array} data
* @param {Array} formatCell
* @description Gets the data from data and format the response in a way that the original column name doesn't passess to the front-end
*/

module.exports.filterData = async (err, data, formatCell) => {
	try {
		if(data){
			if(data.data && data.data.length > 0 && formatCell.length > 0){
				let records = data.data
				formatCell.push("_id")
				let formattedResponse = []
				records.forEach((record)=>{
					let temp = {}
					formatCell.forEach((cell)=>{
						if(typeof record[cell] !== typeof undefined){
                            let formattedCellName = cell.split("_")
                            formattedCellName = formattedCellName.map(function(x,i){ return (((i!=0) ? x.charAt(0).toUpperCase() : x.charAt(0).toLowerCase())  + x.slice(1).toLowerCase()) }).join("")
                            temp[formattedCellName] = record[cell]
						}
					})
					formattedResponse.push(temp)
				})
				data.data = formattedResponse
				return {err : err, succ: data}
			}else{
				return {err : err, succ: data}
			}
		}else{
			return {err : err, succ: data}
		}
	} catch (e) {
		return {err : {type:1, error: e, error_code:"general_error_msg"}, succ: null}
	}
}