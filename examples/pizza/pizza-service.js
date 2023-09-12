var util = require('util');
var bleno = require('../..');

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
                properties: ['write'], // 只配置写属性
                onWriteRequest: (data, offset, withoutResponse, callback) => {
                  const receivedValue = data.toString('utf-8'); // 将接收到的数据转为字符串
                  console.log('Received value:', receivedValue);
          
                  // 这里可以对接收到的值进行处理
          
                  callback(bleno.Characteristic.RESULT_SUCCESS); // 返回成功状态
                },
              }),
        ]
    });
}

util.inherits(PizzaService, bleno.PrimaryService);

module.exports = PizzaService;
