const cors = require('cors');
const express = require('express');
const app = express();
const config = require("./config");
const requester = require("./requester");

app.use(cors({ origin: '* ' , credentials :  true}));


app.use(express.static('www'));

//app.get('/', (req, res, next) => {
//    res.send("Nothing here.");
//  }
//);

app.get('/getcurrencylist',(req, res)=>{
  res.send({
    fromCurrency: config.currencies.fromCurrency,
    toCurrency: config.currencies.toCurrency
  });
});

/**
 * Responding to client side request of data
 * @param currency_name the code for needed currency
 * @response JSON containing all the currency exchanges
 */
app.get('/getcurrencyexchange/:from_currency/:to_currency', (req, res) => {
  //if(typeof req.params.from_currency != 'string' || typeof req.params.to_currency != 'string'){
  //  res.status(422);
  //  return res.end('Invalide request!');
  //}
  console.log(config.options.special(req.params.from_currency.toUpperCase(),req.params.to_currency.toUpperCase()));
  requester.getJSON(config.options.special(req.params.from_currency.toUpperCase(),req.params.to_currency.toUpperCase()), function(statusCode, result) {
    if(result[req.params.from_currency.toUpperCase()] && result[req.params.from_currency.toUpperCase()][req.params.to_currency.toUpperCase()])
       return res.send({result:result[req.params.from_currency.toUpperCase()][req.params.to_currency.toUpperCase()]});
    res.status(422);
    res.end('Invalide request!');
  });
});

app.get('/getallexchanges',(req, res)=>{
  requester.getJSON(config.options.all, function(statusCode, result) {
    res.send(result);
  });
});

app.listen(3000);
