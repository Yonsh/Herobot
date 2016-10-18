// Description:
//   A flipped censor system

module.exports = function(robot) {

  robot.listen(function(msg) {
    return msg.user.name == "nelsliu" && msg.text && msg.text.length > 1 && msg.text.charAt(0) == "幹";
  }, function(res) {
    var template = "_Censored for you:_\n\n幹";
    for (var i = 0; i < res.message.text.length - 1; i++) {
      template += "❤"
    }
    robot.logger.info('Sending message to room: ' + res.message.room);
    robot.emit(
      'telegram:invoke',
      'sendMessage', {
        chat_id: res.message.room,
        text: template,
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
