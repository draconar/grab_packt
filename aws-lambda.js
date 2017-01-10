require('dotenv').load({
    path: __dirname + '/.env'
});

var request = require('request');
var cheerio = require('cheerio');
var loginDetails = {
    email: process.env.PACKT_EMAIL,
    password: process.env.PACKT_PASSWORD,
    op: "Login",
    form_id: "packt_user_login_form",
    form_build_id: ""
};
var url = 'https://www.packtpub.com/packt/offers/free-learning';
var loginError = 'Sorry, you entered an invalid email address and password combination.';
var getBookUrl;
var bookTitle;

//we need cookies for that, therefore let's turn JAR on
request = request.defaults({
    jar: true
});

exports.handler = function(event, context, callback) {

    request(url, function(err, res, body) {
        if (err) {
            callback('Request failed');
            return;
        }

        var $ = cheerio.load(body);
        getBookUrl = 'https://www.packtpub.com' + $("a.twelve-days-claim").attr("href");
        bookTitle = $(".dotd-title").text().trim();
        var newFormId = $("input[type='hidden'][id^=form][value^=form]").val();

        if (newFormId) {
            loginDetails.form_build_id = newFormId;
        }

        request.post({
            uri: url,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: require('querystring').stringify(loginDetails)
        }, function(err, res, body) {
            if (err) {
                callback('Login failed');
                return;
            };
            var $ = cheerio.load(body);
            var loginFailed = $("div.error:contains('"+loginError+"')");
            if (loginFailed.length) {
                callback('Login failed, please check your email address and password');
                return;
            }

            request(getBookUrl, function(err, res, body) {
                if (err) {
                    callback('Request Error');
                    return;
                }

                console.log({
                    title: bookTitle,
                    url: getBookUrl,
                });
            });
        });
    });
}

