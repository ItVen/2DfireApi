
const querystring = require('querystring');
const Co = require('hprose').co;
const http = require('http');
const SignService = require('./SignService.js');
const PostServices = require('./PostServices.js');
const hostname= "open.2dfire-daily.com";
const appkey = "98ee362b4981c29ff7c932650d4e768c";
const secret ="1f2cc41322bef232098c563457c4f492";


let keys = new Array();

function initData(timetamp){
  keys.push({key:"method",value:"dfire.users.login"});
  keys.push({key:"appkey",value:appkey});
  keys.push({key:"v",value:"1.0"});
  keys.push({key:"username",value:"maodou"});
  keys.push({key:"locale",value:"zh_CN"});
  keys.push({key:"password",value:"C0D4C5093500E077EC8DBBAEB17E3A24"});
  keys.push({key:"timestamp",value:timetamp});
}
//签名加密并转为大写
//开始请求
function initPostData(){
	Co(function* (){
		let timetamp = Date.parse(new Date());
		initData(timetamp);
		let sign = SignService.checksum(SignService.sortByKey(timetamp,keys), 'sha1');
		console.log(sign)  
		let post_data = querystring.stringify({
				method : 'dfire.users.login', 
				appkey: appkey,
				v:"1.0",
				username: 'maodou',
				locale:'zh_CN',
				'password':'C0D4C5093500E077EC8DBBAEB17E3A24',
				timestamp:timetamp,
				sign:sign
			}); 

		let options = { 
				hostname: hostname, 
				path: '/router', 
				method: 'POST', 
				headers: {  
		            "Content-Type": 'application/x-www-form-urlencoded',  
		            "Content-Length": Buffer.byteLength(post_data)  
		        } 
	        }; 
	    let body = yield PostServices.httpReq(options,post_data);
	    console.log(body);
	}).catch(err=>{
		console.log(err)
	});
}

initPostData();