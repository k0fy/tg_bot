/*******
falta implementar VALARM

84590.03179689482 { type: 'VALARM',
  params: [],
  trigger: { params: { VALUE: 'DURATION' }, val: '-PT5M' },
  action: 'DISPLAY',
  description: 'nota',
  'ORAGE-DISPLAY-ALARM': 'ORAGE' }
* */


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const months1 = ['ene', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

//var cal  = function () {};
//var data = ical.parseFile(idCal);



/**
* combierte el nombre (3 primeros caracteres) en ingles del mes
* en el numero (0-11)
**/
function getMonthIndex(m){
  if(m.length >3){ m = m.slice(0,3); }
  return months.indexOf(m+1);
}


/***
*  todoOnMonth()
*  todoOnMonth(1)
*  todoOnMonth("jan")
**/
exports.todosOnMonth = function(data, evento){
  if(typeof(evento) == "string"){
    evento = getMonthIndex(evento);
  }
  if(evento == undefined){
    var d1 = new Date();
    evento = d1.getMonth();
  }
  //
  var ouput = {};
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      //
      var ev = data[k];
      if( ev["type"] == 'VTODO'){
        var z={};
        var d="";
        //
        if(ev.summary != undefined ){
          if (ev.start.getMonth() == evento){///
            d = fixDay(ev.start.getDate());
            //
            if(ouput[d] == undefined){
              ouput[d] = [];
            }
            //
            if(ev.class != undefined){ z["class"] = ev.class; }
            else { z["class"]=="PUBLIC"; }
            //
            if(ev.dtstamp != undefined){ z["dtstamp"] = extractDate(ev.dtstamp); }
            else{z["dtstamp"] ="";}
            //
            if(ev.created != undefined){ z["created"]  = extractDate(ev.created); }
            else{z["created"] ="";}
            //
            var lastModified=undefined;
            if(ev["last-modified"] != undefined){ z["lastModified"] = ev["last-modified"]; }
            else{z["lastModified"]="";}
            //
            if(ev.summary != undefined){ z["summary"]=ev.summary; }
            else{ z["summary"]="NONE"; }
            //
            if(ev.description != undefined){ z["description"]=ev.description; }
            else{ z["description"]="NONE"; }
            //
            if(ev.location != undefined){ z["location"]=ev.location; }
            else{ z["location"]="undefined"; }
            //
            if(ev.categories != undefined){ z["categories"]=ev.categories; }
            else{ z["categories"]=[]; }
            //
            if(ev.duration != undefined){ z["duration"]=ev.duration; }
            else{ z["duration"]=""; }
            //
            if(ev.priority != undefined){ z["priority"]=ev.priority.toString(); }
            else{ z["priority"]="0"; }
            //
            if(ev["PERCENT-COMPLETE"] != undefined){ z["percentCompleted"]=ev["PERCENT-COMPLETE"]; }
            else{ z["percentCompleted"] ="-1"; }
            //
            ouput[d].push(z);
          }
        }
      }
    }
  }
  return ouput;
}
/***
*  Get events in a specific month;
*  or events in the current month, if there is no parameter
*
*  eventsOnMonth(data)
*  eventsOnMonth(data,1)
*  eventsOnMonth(data,"jan")
* */
exports.eventsOnMonth = function(data, evento){
  if(typeof(evento) == "string"){
    evento = getMonthIndex(evento);
  }
  if(evento == undefined){
    var d1 = new Date();
    evento = d1.getMonth();
  }
  console.log(evento,typeof(evento));
  //
  var ouput = {};
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      //
      var ev = data[k];
      if( ev["type"] == 'VEVENT'){
        if(ev.summary != undefined ){
          if (ev.start.getMonth() == evento){
            //
            var d = ev.start.getDate();
            if(d.toString().length==1){d = "0" + d;}
            //
            if(ouput[fixDay(ev.start.getDate().toString())] == undefined){
              ouput[fixDay(ev.start.getDate().toString())] = [];
            }
            //
            var diaMes = fixDay(ev.start.getDate().toString());
            /*
            var summary = undefined;
            var clase = undefined;
            var priority = undefined;
            
            if(ev.summary != undefined){ summary=ev.summary;}
            else{ summary = "";}
            if(ev.class != undefined){ clase=ev.class;}
            else{ clase = "PUBLIC";}
            if(ev.priority != undefined){ priority=ev.priority;}
            else{ priority = "-1";}
            */

          //
            var summary = undefined;
            var clase = undefined;
            var priority = undefined;
            var description = undefined;
            
            if(ev.description != undefined){ description=ev.summary;}
            else{ description = "";}
            if(ev.summary != undefined){ summary=ev.summary;}
            else{ summary = "";}
            if(ev.class != undefined){ clase=ev.class;}
            else{ clase = "PUBLIC";}
            if(ev.priority != undefined){ priority=ev.priority;}
            else{ priority = "-1";}
            
            var dia = diaMes.toString();
//            ouput[dia].push({"summary":summary ,"class":clase, "priority":priority});
            ouput[day].push({"summary":summary ,"class":clase, "priority":priority, "description":description});
          }
        }
      }
    }
  }
  return ouput;
}

/***
*  Gets the events of an specific date
*
*  params:
*    month: the month mumber or month name
*    day: day of the month
*
*  eventsOnDate(1,1)
*  eventsOnDate("jan, 1)
* */
exports.eventsOnDate = function(data, mon, day){
  if(typeof(mon) == "string"){
    mon = getMonthIndex(mon);//++++
  }
  //
  var ouput = {};
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      //
      var ev = data[k];
      if (ev["type"]=="VEVENT"){
        if(ev.summary != undefined && ev.start.getMonth() == parseInt(mon) && ev.start.getDate()==day){
          var day1 = parseInt(day);
          day1 = fixDay(day1.toString());
          //
          if(ouput[day1] == undefined){ ouput[day1] = []; }
          
          //
          var summary = undefined;
          var clase = undefined;
          var priority = undefined;
          var description = undefined;
          
          if(ev.description != undefined){ description=ev.summary;}
          else{ description = "";}
          if(ev.summary != undefined){ summary=ev.summary;}
          else{ summary = "";}
          if(ev.class != undefined){ clase=ev.class;}
          else{ clase = "PUBLIC";}
          if(ev.priority != undefined){ priority=ev.priority;}
          else{ priority = "-1";}
          
          ouput[day1].push({"summary":summary ,"class":clase, "priority":priority, "description":description});
        }
      }
    }
  }
  return ouput;
};


/***
* Gets all the events in the calendar
*
* events(data)
* */
exports.allEvents = function(data){
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = new Date().getFullYear();
  var ev=[];
  var et=[];
  var calendario={};
   
  for (var mon in months){
    var a = new Date(year, parseInt(mon)+1, 0).getDate();
    
    for(var day = 1; day <= a; day++){
  		for (var k in data){
  		  if (data.hasOwnProperty(k)){
  		    var ev = data[k];
  		    //
  		    if (ev["type"]=="VEVENT"){
  		      if(ev.summary != undefined && ev.start.getMonth() == parseInt(mon)+1 && ev.start.getDate()==day){
              var yy = ev.start.getFullYear();
              if(calendario[yy]==undefined){
                calendario[yy]={};
              }
              
              var mon1 = parseInt(mon)+1;
              mon1 = fixDay(mon1.toString());
              if(calendario[yy][mon1]==undefined){
                calendario[yy][mon1]={};
              }
              
              var day1 = parseInt(day);
              day1 = fixDay(day1.toString());
              if(calendario[yy][mon1][day1]==undefined){
                calendario[yy][mon1][day1] = [];
              }
              calendario[yy][mon1][day1].push({"summary":ev.summary ,"class":ev.class, "priority":ev.priority});
  		      }
  		    }
  		  }
  		}
  	}
  }
  return calendario;
}

/****
*  Get journals in a specific month;
*  or events in the current month, if there is no parameter
*
*  journalsOnMonth(data)
*  journalsOnMonth(data,1)
*  journalsOnMonth(data,"jan")
* */
exports.journalsOnMonth = function(data, mes){
  if(typeof(mes) == "string"){
    mes = getMonthIndex(mes);
  }
  if(mes == undefined){
    var d1 = new Date();
    mes = d1.getMonth();
  }
  
  var VJOURNAL = {};
  var ouput = {};
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      var ev = data[k];
      
      if( ev["type"] == 'VJOURNAL'){
        var o = extractDate(ev.created);
        var y=o["y"];
        var m=o["m"];
        var d=o["d"];
        
        if(ev.summary != undefined && mes == m){
          if(VJOURNAL[y] == undefined){
            VJOURNAL[y]={};
          }
          if(VJOURNAL[y][m] == undefined){
            VJOURNAL[y][m]={};
          }
          if(VJOURNAL[y][m][d] == undefined){
            VJOURNAL[y][m][d]=[];
          }
          
          var lastModified=undefined;
          if(ev["last-modified"] != undefined){
            lastModified=ev["last-modified"];
          }
          //
          VJOURNAL[y][m][d].push({
          "params":ev.params, "class":ev.class,
          "dtstamp":ev.dtstamp, "categories":ev.categories,
          "description":ev.description, "summary":ev.summary,
          "start":ev.start, "last-modified":lastModified,
          "priority":ev.priority});
        }
      }
    }
  }
  return VJOURNAL;
}

/****
 * 
 * 
 * */
exports.journals=function(data){
  var VJOURNAL = {};
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      var ev = data[k];

      if( ev["type"] == 'VJOURNAL'){
        if(ev.summary != undefined){

          var o = extractDate(ev.created);
          var y=o["y"];
          var m=o["m"];
          var d=o["d"];
          if(VJOURNAL[y] == undefined){
            VJOURNAL[y]={};
          }

          if(VJOURNAL[y][m] == undefined){
            VJOURNAL[y][m]={};
          }

          if(VJOURNAL[y][m][d] == undefined){
            VJOURNAL[y][m][d]=[];
          }

          var lastModified=undefined;
          if(ev["last-modified"] != undefined){
            lastModified=ev["last-modified"];
          }
          VJOURNAL[y][m][d].push({"params":ev.params,
                                  "class":ev.class,
                                  "dtstamp":ev.dtstamp,
                                  "categories":ev.categories,
                                  "description":ev.description,
                                  "summary":ev.summary,
                                  "start":ev.start,
                                  "last-modified":lastModified,
                                  "priority":ev.priority}
                                );
        }
      }
    }
  }
  return VJOURNAL;
}

//
function isValarm(seccion){
  if(seccion[k].hasOwnProperty("type") && seccion[k].type=="VALARM" ){
    return 1;
  }
  else{return 0;}
}
//
function fixDay(n){
  if(n.length == 1){
    var day = "0" + n;
    return day;
  }
  else {
    return n;
  }
}
/***
* Gets all the events
**/
function allEvents(data, month){
  //var data = ical.parseFile(filename);
  var ouput = {};
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      var ev = data[k]
      if(ev.summary != undefined){
        if(ev.start.getMonth() == month ){
          ouput[ev.summary] = ev.start.getDate() + " - " +  months[ev.start.getMonth()] + ": " + ev.summary;
        }
      }
    }
  }
  return ouput;
}

/****
 * 
 * */
function extractDate(d){
  var o={};
  o["y"]=d.substring(0,4);
  o["m"]=d.substring(4,6);
  o["d"]=d.substring(6,8);
  o["h"]=d.substring(9,11);
  o["m"]=d.substring(11,13);
  o["s"]=d.substring(13,15);
  return o;
}
