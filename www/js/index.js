var score = 0;

function addPoints(score){
    document.querySelector(".addOne").addEventListener('click',function(){
        console.log('+1 point');
        score++;
        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO MatchLog (dateTime, score, teamid) VALUES(?,?,?)', ['2020-09-21', 1 , 1 ]);
        }
    });

// FUNCTION POUR INSERTION EN BASE
// JUSTE REQUETE  tx.executeSql('INSERT INTO MatchLog (dateTime, score, teamid) VALUES(?,?,?)', ['2020-09-21', 1 , 1 ]);







    document.querySelector(".addTwo").addEventListener('click',function(){
        console.log('+3 points');
        score += 3;
    });

    document.querySelector(".score").innerHTML = score;
};

addPoints(score);
console.log(score);

// document.querySelector(".addOne").addEventListener('click',function(){
//     console.log('+1 point');
//     score++;
//     document.querySelector(".score").innerHTML = score;
// });

// document.querySelector(".addTwo").addEventListener('click',function(){
//     console.log('+3 points');
//     score += 3;
//     document.querySelector(".score").innerHTML = score;
// });

// Base
var db = null;

document.addEventListener('deviceready',function(event){

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
});


// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },

//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//     },

//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

// app.initialize();