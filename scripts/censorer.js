// Description:
//   A flipped censor system

module.exports = function(robot) {
  robot.hear(/幹/i, function(res) {
    res.reply("_Censored for you:_\n\n" + res.message.text.replace(/[^幹]/g, "❤"));
  });
}
