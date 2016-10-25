// Description:
//   Get google translate voice in Chinese

module.exports = function(robot) {

    robot.respond(/voice /i, function(res){
      var msg = res.message.text;
      msg = msg.substring(msg.indexOf("voice ") + 6);

      if (msg !== '') {
        robot.emit(
          'telegram:invoke',
          'sendAudio', {
            chat_id: res.message.room,
            audio: "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=zh-TW&q=" + msg.replace(/[ \n]/g, "%20"),
            performer: "估狗小姐",
            title: msg,
            caption: msg
          }, function (error, response) {
            if (error) {
              robot.logger.error(error);
            }
            robot.logger.debug(response);
        });
      }

    });
}
