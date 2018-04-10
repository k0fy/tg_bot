This bot send the events on the next 10 days from a specific remote calendar (ics), and is made to run from a raspberry pi.
You will need the token and the commands */help* */date* and */info* (through botfather, is really easy)

Configuration:
Remane the file *config.js.generic* to *config.js*.
Open *config.js* and add the token you got from botfather
```javascript
exports.telegram = {
  "token": "your-token"
}
```
To add a calendar you need the ics url and add it to the section *exports.cal*
```javascript
exports.cal = "https://xx.com/calendar.ics";
```

Things to be done:
Adapt the bot to run from heroku
