'use strict'
const config = require('./config.js');

//----config-----
const BOTVER = config.ver.version;
const BOTCODENAME = config.ver.codename;
const TELEGRAMAPI = config.telegram.token;


var ical = require('ical');

const Telegram = require('telegram-node-bot', {workers: 1} );

const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram(TELEGRAMAPI, {workers: 1});


//mios
//const fortune = require('./fortunes.js');
var calendario = require('./calendario.js');


//captura de errores
process.on('uncaughtException', function (error) {
	console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});

process.on('unhandledRejection', function (error, p) {
	console.log("\x1b[31m","Error: ", error.message, "\x1b[0m");
});

/***
 * calendario
 */
class CalController extends TelegramBaseController {
  calHandler($){
    var eventsForDays=10;

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    ical.fromURL(config.cal, {}, function(err, data){
      var f= new Date();
      
      for(var d = 0; d < eventsForDays; d ++){
        var mes = f.getMonth();
        var dia = f.getDate() + d;
        var events = calendario.eventsOnDate(data, mes, dia);
        
        //itera todos los eventos
        for(var evId in events){
          var event = events[evId];
          var info = "";
          
          //itera en cada evento del dia
          for(var ev in event){
            var fecha = "Geek Events for " + dia + " - " + months[mes] + "\n";
            
            var nl = "";
            if((event.length-1) > parseInt(ev)){ nl = "\n"; }
            else{ nl=""; }
            
            if(event[ev].summary != event[ev].description){
              info = info + " - " + event[ev].summary + "\n" + event[ev].description + nl;
            }
            else{ info = info + " - " + event[ev].summary + nl; }
          }
          
        $.sendMessage(fecha + info);
        }
      }
    });
  }
  
  get routes() {
    return { 'calCommand': 'calHandler'}
  }
}

//help
/***
 * 
 * */
class HelpController extends TelegramBaseController {
  helpHandler($){
    var msg = "/date - Get the events of the next 10 days\n" +
      "/help - This help\n" +
      "/info - About the bot..";
    $.sendMessage(msg);
  }

  get routes() {
    return { 'helpCommand': 'helpHandler'}
  }
}

/***
 * informacion
 * */
class InfoController extends TelegramBaseController {
  infoHandler($){
    var msg = "Ver: " + BOTVER + " - codename: " + BOTCODENAME + "\n" + 
              "This bot sends calendar events in the next 10 days";

    $.sendMessage(msg);
  }
  get routes() {
    return { 'infoCommand': 'infoHandler'}  
  }
}


tg.router
  .when(new TextCommand('/help', 'helpCommand'), new HelpController())
  .when(new TextCommand('/date', 'calCommand'), new CalController())
  .when( new TextCommand('/info', 'infoCommand'), new InfoController() )