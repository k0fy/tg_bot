var fs = require('fs');

function loadFortune(p){
  var json = {};
  try {
    json = JSON.parse(fs.readFileSync(p));
  }
  catch (err) {
    console.error(err);
  }

  return json;
}

function rnd(max){
  return Math.floor(Math.random() * (max - 0) + 0);
}

exports.getFortune = function(f) {
  const info = loadFortune(f);
  const tot = info.fortunes.length;
  const v = rnd(tot);

  return info.fortunes[v];
}