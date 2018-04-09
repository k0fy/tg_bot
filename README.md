This bot send the events on the next 10 days from a specific remote calendar (ics).
The bot is made to run from a raspberry pi

You will need the token and the commands "/help" "/date" and "/info"

Configuration:
Remane te file config.js.generic to config.js and add the token you got from botfather in the section "token": "xxx"

exports.telegram = {
  "token": "xxx"
}

To add a calendar you need the ics url and add it yo the section "exports.cal"

exports.cal = "https://xx.com/calendar.ics";

Things to be done:
Adapt the bot to run from heroku
