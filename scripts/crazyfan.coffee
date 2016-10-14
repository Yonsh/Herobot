module.exports = (robot) ->
  robot.listen(
    (message) ->
      try match = message.match(/^(?!\/)(.*)$/)
      catch e then match = false
      message.user.name is "nelsliu" and match
    (response) ->
      roll = Math.random()
      if roll > 0.75
        response.reply "I LOVE YOU!!! #{response.message.user.first_name.toUpperCase()}!!!!"
      else if roll > 0.5
        response.reply "KISS ME!!! #{response.message.user.first_name.toUpperCase()}!!!!"
      else if roll > 0.25
        response.reply "ENSLAVE ME!!! #{response.message.user.first_name.toUpperCase()}!!!!"
  )
