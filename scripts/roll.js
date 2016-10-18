// Description:
//   Roll

module.exports = function(robot) {
  robot.respond(/roll/i, function(res){
    robot.emit(
      'telegram:invoke',
      'sendMessage', {
        chat_id: res.message.room,
        text: "*Roll (1 - 100):*\n\n" + Math.floor(Math.random() * 100 + 1),
        reply_to_message_id: res.message.id,
        parse_mode: 'Markdown'
      }, function (error, response) {
        if (error) {
          robot.logger.error(error);
        }
        robot.logger.debug(response);
    });
  });
}
