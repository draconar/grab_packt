var request = require('request');
var cheerio = require('cheerio');
//we need cookies for that, therefore let's turn JAR on
request = request.defaults({
        jar: true
    });


var loginDetails = { email: "xxxxx@xxxx.com", password: "xxxxxxxx", op: "Login", form_id: "packt_user_login_form", form_build_id: "" };
var url = 'https://www.packtpub.com/packt/offers/free-learning';
var getBookUrl;

request(url, function(err, res, body) {
		if(err) {
			callback.call(null, new Error('Request failed'));
			return;
		}

		var $ = cheerio.load(body);
		getBookUrl = $("a.twelve-days-claim").attr("href");
		var newFormId = $("input[type='hidden'][id^=form][value^=form]").val();

		if (newFormId) {
		    loginDetails.form_build_id = newFormId; 
		}
        
        request.post({
          	uri: url,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        	body: require('querystring').stringify(loginDetails)
                }, function(err, res, body){
        	if(err) {
        		callback.call(null, new Error('Login failed'));
        		return;
        	};
        	    
        	    
                    request('https://www.packtpub.com'+getBookUrl, function(err, res, body) {
                        if(err) {
                            callback.call(null, new Error('Request Error'));
                            return;
                        }
                        
                		var $ = cheerio.load(body);
                		
                        console.log('https://www.packtpub.com'+getBookUrl);
                        console.log(Math.random(10))
                    });
                
	  
	});
	
});