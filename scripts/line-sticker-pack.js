'use strict'

module.exports = function (robot) {
  const CMD = 'linesticker ';

    robot.respond(/linesticker /i, function (res) {
      let msg = res.message.text;
      msg = msg.substring(msg.indexOf(CMD) + CMD.length);
      if (msg !== '') {
        let productId = msg.match(/\d.*/i);
        try {
          productId = parseInt(productId);
        } catch (exception) {
          res.send('Something is wrong with the link.');
        }

        res.send('http://dl.stickershop.line.naver.jp/products/0/0/1/' + productId + '/PC/stickerpack.zip');
      }

    });
}
