document.addEventListener('deviceready',function(event){

    var score = 0;

    var x = document.querySelectorAll(".addScore");

// ADD SCORE ON TEAM
for (i = 0; i < x.length; i++) {
    x[i].addEventListener('click', function(){
       var score = this.getAttribute("data-score");
       var team = this.getAttribute("data-team");
       addScore(score,team);
   });
}

dateNow = Date.now();

// FUNCTIONS
function addScore(score,team){
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO MatchLog (dateTime, score, teamid) VALUES(?,?,?)', [Date.now(), score , team ]);
    });
}

function convertDate(timeStamp){
    var date = new Date(timeStamp);
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var seconds = "0" + date.getSeconds();
    var minutes = "0" + date.getMinutes();
    var hours = date.getHours();
    var day = date.getDate();
    var month = months_arr[date.getMonth()];
    var year = date.getFullYear();
    var convdataTime = day+'-'+month+'-'+year+' à '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convdataTime;
}

db.transaction(function(tx) {

 tx.executeSql('SELECT dateTime, score, teamid FROM MatchLog', [], function(tx,result){

    var baseElement = document.querySelector('.match-log');

    for(var i = 0; i < result.rows.length; i++){

        var cloneElement = baseElement.cloneNode(true);

        cloneElement.querySelector('.date').innerHTML = convertDate(result.rows.item(i).dateTime);
        cloneElement.querySelector('.points').innerHTML = result.rows.item(i).score;
        cloneElement.querySelector('.teamid').innerHTML = result.rows.item(i).teamid;

        document.querySelector('.app').appendChild(cloneElement);
    }
});
});
});

// Base
var db = null;


if (window.cordova.platformId === 'browser') {
    db = window.openDatabase('ScoreGames', '1.0', 'Data', 2*1024*1024);
    console.log("Opening browser database"); } 
    else {
        db = window.sqlitePlugin.openDatabase({name: 'ScoreGames.db', location: 'default'});
        console.log("Opening mobile (plugin) database");
    }

    // db ...
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MatchLog (id INTEGER PRIMARY KEY, dateTime, score, teamid)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Team (id INTEGER PRIMARY KEY, name)');
        tx.executeSql('INSERT INTO Team (name) VALUES (?)', ["Lakers"]);
        tx.executeSql('INSERT INTO Team (name) VALUES (?)', ["Chicago Bulls"]);

    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Populated database OK');
    });
