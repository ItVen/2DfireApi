const https = require('http');
const hprose = require("hprose");

module.exports = {
	httpReq: function(options,post_data){
       
        return new Promise(function(resolve, reject){
            let req = https.request(options, function(res){
                let data = [];
                res.setEncoding('utf-8');
                res.on('data', function(chunk){
                    data.push(chunk);
                });

                res.on('end', function(){
                    //成功后调用
                    resolve(data);
                });
            });

            req.on('error', function(err){
                //失败后调用
                reject(err);
            });

            req.write(post_data + "\n");  
            req.end();
        });
	}
}
