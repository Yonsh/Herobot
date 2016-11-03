// Description:
//   A flipped censor system

module.exports = function(robot) {
  robot.hear(/幹/i, function(res) {
    var message = res.message.text.replace(/[^幹]/g, "❤");
    if (message === res.message.text) {
      return;
    }

    res.reply("_Censored for you:_\n\n" + message);
  });
}
