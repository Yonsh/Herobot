// Description:
//   Anonymously send post to certain room
//
// Configuration:
//   HUBOT_TELEGRAM_ANONYMOUS_ROOM_ID: required, target room id

var roomId = process.env.HUBOT_TELEGRAM_ANONYMOUS_ROOM_ID;
var botName = process.env.TELEGRAM_BOT_NAME;
var botNameLength = botName ? botName.length : 0;

if (roomId != null) {
  module.exports = function(robot) {
    var flag = [];   // 0: None, 1: Sticker, 2: Markdown, 3: Photo, 4: Document, 5: Voice

    function purifyMessage(msg) {
      return msg.substring(botNameLength + 1);
    }

    robot.listen(function(msg) {
      return flag[msg.user.id] != null && flag[msg.user.id] != 0;
    }, function(res) {
      switch (flag[res.message.user.id]) {
        case 1:
          try {
            var sticker = res.message.message.sticker.file_id;

            robot.emit(
              'telegram:invoke',
              'sendSticker', {
                chat_id: roomId,
                sticker: sticker
              }, function (error, response) {
                if (error) {
                  robot.logger.error(error);
                }
                robot.logger.debug(response);
            });

          } catch (err) {
            console.log(err);
            res.send("Anonymous Sticker: Error, please try again.");
          }
          break;
        case 2:
          try {
            var text = purifyMessage(res.message.text);

            robot.emit(
              'telegram:invoke',
              'sendMessage', {
                chat_id: roomId,
                text: text,
                parse_mode: 'Markdown'
              }, function (error, response) {
                if (error) {
                  robot.logger.error(error);
                }
                robot.logger.debug(response);
            });

          } catch (err) {
            console.log(err);
            res.send("Anonymous MarkDown Message: Error, please try again.");
          }
          break;
        case 3:
          try {
            var photo = res.message.message.photo;
            var photo_id = photo[photo.length-1].file_id;
            var caption = res.message.message.caption || '';

            robot.emit(
              'telegram:invoke',
              'sendPhoto', {
                chat_id: roomId,
                photo: photo_id,
                caption: caption
              }, function (error, response) {
                if (error) {
                  robot.logger.error(error);
                }
                robot.logger.debug(response);
            });

          } catch (err) {
            console.log(err);
            res.send("Anonymous Photo: Error, please try again.");
          }
          break;
        case 4:
          try {
            var documentId = res.message.message.document.file_id;
            var caption = res.message.message.caption || '';

            robot.emit(
              'telegram:invoke',
              'sendDocument', {
                chat_id: roomId,
                document: documentId,
                caption: caption
              }, function (error, response) {
                if (error) {
                  robot.logger.error(error);
                }
                robot.logger.debug(response);
            });

          } catch (err) {
            console.log(err);
            res.send("Anonymous Photo: Error, please try again.");
          }
          break;
        case 5:
          try {
            var voiceId = res.message.message.voice.file_id;
            var caption = res.message.message.caption || '';

            robot.emit(
              'telegram:invoke',
              'sendVoice', {
                chat_id: roomId,
                voice: voiceId,
                caption: caption
              }, function (error, response) {
                if (error) {
                  robot.logger.error(error);
                }
                robot.logger.debug(response);
            });

          } catch (err) {
            console.log(err);
            res.send("Anonymous Voice: Error, please try again.");
          }
          break;
      }
      flag[res.message.user.id] = 0;
    });

    robot.respond(/anon /i, function(res){
      if (roomId === res.message.room) {
        return;
      }

      var msg = res.message.text;
      msg = msg.substring(msg.indexOf("anon ") + 5);

      if (msg !== '') {
        robot.emit(
          'telegram:invoke',
          'sendMessage', {
            chat_id: roomId,
            text: msg,
          }, function (error, response) {
            if (error) {
              robot.logger.error(error);
            }
            robot.logger.debug(response);
        });
      }

    });

    robot.respond(/anonsticker/i, function(res){
      if (roomId === res.message.room) {
        return;
      }

      flag[res.message.user.id] = 1;

      res.send("Anonymous Sticker: OK, please send a sticker to me.")

    });

    robot.respond(/anonmarkdown/i, function(res){
      if (roomId === res.message.room) {
        return;
      }

      flag[res.message.user.id] = 2;

      robot.emit(
        'telegram:invoke',
        'sendMessage', {
          chat_id: res.message.room,
          text: "Anonymous MarkDown Message: OK, please send a MarkDown message.\n\n" +
                "*bold text*\n" +
                "_italic text_\n" +
                "[text](http://www.example.com/)\n" +
                "`inline fixed-width code`\n" +
                "```text\n" +
                "pre-formatted fixed-width code block\n" +
                "```",
          disable_web_page_preview: 'true'
        }, function (error, response) {
          if (error) {
            robot.logger.error(error);
          }
          robot.logger.debug(response);
      });

    });

    robot.respond(/anonphoto/i, function(res){
      if (roomId === res.message.room) {
        return;
      }

      flag[res.message.user.id] = 3;

      res.send("Anonymous Photo: OK, please send a photo to me.")

    });

    robot.respond(/anondoc/i, function(res){
      if (roomId === res.message.room) {
        return;
      }

      flag[res.message.user.id] = 4;

      res.send("Anonymous Document: OK, please send a document to me.")

    });

    robot.respond(/anonvoice/i, function(res){
      if (roomId === res.message.room) {
        return;
      }

      flag[res.message.user.id] = 5;

      res.send("Anonymous Voice: OK, please send voice to me.")

    });
  }
}
