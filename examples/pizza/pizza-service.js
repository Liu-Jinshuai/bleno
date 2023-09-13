var util = require('util');
var bleno = require('../..');
let notifyCallback = null;

var PizzaCrustCharacteristic = require('./pizza-crust-characteristic');
var PizzaToppingsCharacteristic = require('./pizza-toppings-characteristic');
var PizzaBakeCharacteristic = require('./pizza-bake-characteristic');

function PizzaService(pizza) {
    bleno.PrimaryService.call(this, {
        uuid: '13333333333333333333333333333337',
        characteristics: [
            // new PizzaCrustCharacteristic(pizza),
            // new PizzaToppingsCharacteristic(pizza),
            // new PizzaBakeCharacteristic(pizza)
            new bleno.Characteristic({
                uuid: '13333333333333333333333333330001',
                properties: ['notify','write'], // 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'各代表什么意思
                onWriteRequest: (data, offset, withoutResponse, callback) => {
                  const receivedValue = data.toString('utf-8'); // convert received data to string
                  
                  // do something with received data here...
                  if (notifyCallback) {
                    const resultData = Buffer.from('Your operation result', 'utf8');
                    notifyCallback(resultData);
                  }
                  
                  console.log('Received value:', receivedValue);
                  callback(this.RESULT_SUCCESS); // return result status
                },
                onSubscribe: (maxValueSize, updateValueCallback) => {
                  console.log('Client subscribed');
                  notifyCallback = updateValueCallback;
                },
                onUnsubscribe: () => {
                  console.log('Client unsubscribed');
                  notifyCallback = null;
                }
              }),
        ]
    });
}

util.inherits(PizzaService, bleno.PrimaryService);

module.exports = PizzaService;
