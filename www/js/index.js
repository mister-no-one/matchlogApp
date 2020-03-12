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
    var date = new Date(test);
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var seconds = "0" + date.getSeconds();
    var minutes = "0" + date.getMinutes();
    var hours = date.getHours();
    var day = date.getDate();
    var month = months_arr[date.getMonth()];
    var year = date.getFullYear();
    var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convdataTime;
}

db.transaction(function(tx) {
   var test = tx.executeSql('SELECT dateTime, score, teamid FROM MatchLog');
});

console.log(test);

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
        tx.executeSql('INSERT INTO MatchLog (dateTime, score, teamid) VALUES("2020-03-10", '+ score +', 1)');
    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Populated database OK');
    });
