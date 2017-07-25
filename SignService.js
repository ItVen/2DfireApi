const crypto = require('crypto');

const appkey = "98ee362b4981c29ff7c932650d4e768c";
const secret ="1f2cc41322bef232098c563457c4f492";


//排序加密
module.exports ={

	checksum: function (str, algorithm, encoding) {
	    return crypto
	        .createHash(algorithm || 'md5')
	        .update(str, 'utf8')
	        .digest(encoding || 'hex')
	        .toUpperCase()
	},

	sortByKey: function  (timetamp,map){
		map.sort(function(a,b){
	       if(a["key"]>b["key"]){
	           return 1;
	       }else{
	           return -1;
	       }
		})
		//todo拼接成字符串
		let str = secret;
		for (let index in map){
			str += map[index].key+map[index].value;
		}
		str +=secret
		return str
	}
}