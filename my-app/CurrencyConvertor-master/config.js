exports.database = "mongodb://localhost/CurrencyConvertor";

var fromCurrency = ["BTC", "ETH", "XRP", "BCH", "EOS", "XLM", "LTC", "ADA", "MIOTA", "USDT", "TRX", "XMR", "NEO", "DASH", "ETC"];
var toCurrency = ["USD","EUR","RUB","BTC", "ETH", "XRP", "BCH", "EOS", "XLM", "LTC", "ADA", "MIOTA", "USDT", "TRX", "XMR", "NEO", "DASH", "ETC"];

exports.currencies = {
  fromCurrency: fromCurrency,
  toCurrency: toCurrency
};

exports.options = {
  all:{
      host: 'min-api.cryptocompare.com',
      port: 443,
      path: '/data/pricemulti?fsyms=' + fromCurrency + '&tsyms=' + toCurrency,
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  },
  special:(specialFromCurrency,specialToCurrency)=>{
    return {
        host: 'min-api.cryptocompare.com',
        port: 443,
        path: '/data/pricemulti?fsyms=' + specialFromCurrency + '&tsyms=' + specialToCurrency,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
  }
}
