var http = require("http");
var https = require("https");

/**
 * Getting the JSON response from api
 * @param options the specifications to api call
 * @param onResult the callback function for handling the accessed JSON
 */
exports.getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.error('error: ' + err.message);
    });

    req.end();
};
