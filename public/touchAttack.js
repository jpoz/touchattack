var mode = 'defend';
// var mode = 'attack';

var gameSpeed = 1000; //time player has to hit box
var boxSize = 80;
var benchSize = 15;
var refreshRate = 1000;
var refreshAmount = 50;
var shotCost = 20;
var blockValue = 10;
var gameLength = 30000;

var levels = [
// 1000 1 in 6
[[4100, 75, 97, "grow"], [5100, 73, 68, "grow"], [6100, 285, 48, "growleft"], [7100, 345, 148, "growleft"], [8100, 354, 41, "grow"], [9100, 53, 110, "grow"], [10100, 138, 123, "grow"], [11100, 95, 186, "grow"], [12100, 271, 135, "grow"], [13100, 128, 138, "grow"], [14100, 336, 123, "grow"], [15100, 291, 85, "grow"], [16100, 266, 192, "grow"], [17100, 117, 102, "grow"], [18100, 58, 181, "grow"], [19100, 253, 141, "grow"], [20100, 328, 160, "grow"], [21100, 101, 122, "grow"], [22100, 121, 134, "grow"], [23100, 156, 157, "growright"], [24100, 298, 195, "growup"], [25100, 281, 92, "grow"], [26100, 273, 150, "grow"], [27100, 104, 178, "grow"], [28100, 100, 128, "grow"], [29100, 345, 155, "grow"], [30100, 100, 58, "grow"], [31100, 270, 167, "growup"], [32100, 213, 165, "grow"]],
// 925 1 in 5
[[4100, 129, 80, "grow"], [5025, 159, 153, "grow"], [5950, 298, 151, "grow"], [6875, 143, 104, "grow"], [7800, 89, 65, "grow"], [8725, 304, 170, "grow"], [9650, 187, 46, "grow"], [10575, 201, 176, "grow"], [11500, 288, 172, "grow"], [12425, 339, 86, "grow"], [13350, 163, 110, "grow"], [14275, 181, 63, "growleft"], [15200, 69, 94, "grow"], [16125, 310, 63, "grow"], [17050, 205, 119, "grow"], [17975, 69, 168, "grow"], [18900, 87, 127, "grow"], [19825, 316, 93, "grow"], [20750, 84, 73, "grow"], [21675, 81, 128, "grow"], [22600, 325, 47, "grow"], [23525, 129, 120, "grow"], [24450, 335, 136, "grow"], [25375, 68, 80, "grow"], [26300, 282, 137, "grow"], [27225, 271, 172, "grow"], [28150, 255, 150, "grow"], [29075, 118, 156, "grow"], [30000, 207, 194, "grow"], [30925, 358, 104, "growleft"], [31850, 209, 104, "grow"]],
// 850 1 in 4
[[4100, 180, 78, "grow"], [4950, 190, 168, "grow"], [5800, 184, 178, "grow"], [6650, 86, 151, "grow"], [7500, 81, 146, "growright"], [8350, 99, 159, "grow"], [9200, 324, 186, "grow"], [10050, 49, 174, "grow"], [10900, 327, 129, "growleft"], [11750, 129, 159, "grow"], [12600, 61, 156, "grow"], [13450, 185, 177, "grow"], [14300, 108, 62, "grow"], [15150, 73, 130, "growright"], [16000, 127, 87, "growright"], [16850, 56, 146, "grow"], [17700, 133, 44, "growright"], [18550, 127, 96, "growright"], [19400, 102, 48, "grow"], [20250, 306, 98, "grow"], [21100, 209, 82, "grow"], [21950, 337, 99, "growleft"], [22800, 241, 156, "growleft"], [23650, 290, 173, "grow"], [24500, 108, 53, "grow"], [25350, 55, 135, "grow"], [26200, 41, 197, "grow"], [27050, 281, 83, "grow"], [27900, 57, 61, "grow"], [28750, 134, 168, "grow"], [29600, 332, 155, "grow"], [30450, 279, 153, "grow"], [31300, 199, 173, "grow"], [32150, 166, 196, "growright"]],
// 775 1 in 3
[[4100, 118, 89, "grow"], [4875, 143, 103, "growright"], [5650, 270, 146, "growleft"], [6425, 167, 185, "grow"], [7200, 354, 105, "grow"], [7975, 114, 96, "grow"], [8750, 107, 150, "growright"], [9525, 152, 58, "grow"], [10300, 175, 153, "growright"], [11075, 52, 156, "grow"], [11850, 111, 175, "grow"], [12625, 257, 157, "growleft"], [13400, 221, 185, "growleft"], [14175, 52, 190, "grow"], [14950, 345, 40, "grow"], [15725, 263, 72, "grow"], [16500, 174, 130, "growright"], [17275, 105, 104, "grow"], [18050, 233, 87, "grow"], [18825, 236, 115, "grow"], [19600, 192, 131, "growleft"], [20375, 142, 132, "grow"], [21150, 142, 179, "growup"], [21925, 251, 71, "growleft"], [22700, 92, 114, "growright"], [23475, 65, 177, "growup"], [24250, 303, 169, "grow"], [25025, 68, 88, "grow"], [25800, 74, 168, "grow"], [26575, 344, 168, "growup"], [27350, 340, 127, "grow"], [28125, 312, 89, "grow"], [28900, 300, 120, "growleft"], [29675, 235, 75, "grow"], [30450, 62, 112, "growright"], [31225, 217, 72, "growdown"], [32000, 128, 94, "grow"]],
// 700 1 in 2
[[4100, 199, 123, "grow"], [4800, 222, 185, "growright"], [5500, 146, 138, "growright"], [6200, 188, 188, "grow"], [6900, 284, 56, "growdown"], [7600, 306, 66, "grow"], [8300, 124, 186, "grow"], [9000, 149, 101, "grow"], [9700, 118, 159, "grow"], [10400, 292, 192, "grow"], [11100, 165, 135, "growleft"], [11800, 145, 114, "grow"], [12500, 271, 107, "growleft"], [13200, 143, 90, "grow"], [13900, 235, 134, "growleft"], [14600, 224, 157, "growleft"], [15300, 107, 154, "grow"], [16000, 155, 59, "growright"], [16700, 113, 71, "growright"], [17400, 217, 44, "growdown"], [18100, 209, 119, "growright"], [18800, 187, 169, "grow"], [19500, 347, 159, "growleft"], [20200, 262, 128, "growleft"], [20900, 161, 175, "grow"], [21600, 287, 176, "growup"], [22300, 355, 152, "grow"], [23000, 330, 169, "growleft"], [23700, 84, 40, "growright"], [24400, 218, 82, "grow"], [25100, 221, 145, "grow"], [25800, 113, 101, "grow"], [26500, 150, 145, "grow"], [27200, 318, 80, "grow"], [27900, 324, 175, "grow"], [28600, 181, 77, "grow"], [29300, 238, 195, "growright"], [30000, 358, 63, "growdown"], [30700, 227, 88, "growright"], [31400, 317, 129, "grow"], [32100, 73, 102, "growright"]],
// 625 1 in 1
[[4100, 49, 170, "growup"], [4725, 68, 92, "growright"], [5350, 147, 152, "growright"], [5975, 56, 123, "growright"], [6600, 288, 43, "growleft"], [7225, 78, 190, "growright"], [7850, 233, 100, "growleft"], [8475, 131, 140, "growright"], [9100, 192, 137, "growright"], [9725, 179, 52, "growright"], [10350, 69, 76, "growdown"], [10975, 109, 150, "growright"], [11600, 236, 173, "growright"], [12225, 334, 194, "growleft"], [12850, 225, 73, "growleft"], [13475, 155, 186, "growup"], [14100, 75, 56, "growdown"], [14725, 43, 149, "growright"], [15350, 136, 64, "growdown"], [15975, 59, 58, "growright"], [16600, 279, 78, "growdown"], [17225, 221, 96, "growleft"], [17850, 85, 63, "growdown"], [18475, 97, 56, "growright"], [19100, 154, 143, "growright"], [19725, 130, 116, "growright"], [20350, 285, 172, "growup"], [20975, 219, 116, "growleft"], [21600, 259, 126, "growleft"], [22225, 162, 81, "growleft"], [22850, 214, 150, "growleft"], [23475, 159, 88, "growright"], [24100, 88, 128, "growright"], [24725, 202, 88, "growright"], [25350, 298, 55, "growdown"], [25975, 324, 89, "growleft"], [26600, 305, 41, "growdown"], [27225, 85, 88, "growright"], [27850, 102, 149, "growright"], [28475, 105, 157, "growright"], [29100, 349, 171, "growleft"], [29725, 88, 165, "growup"], [30350, 174, 110, "growleft"], [30975, 220, 191, "growleft"], [31600, 189, 126, "growright"], [32225, 45, 98, "growright"]],
// 550 1 in 1
[[4100, 290, 116, "growleft"], [4650, 69, 63, "growdown"], [5200, 159, 122, "growright"], [5750, 272, 118, "growleft"], [6300, 313, 107, "growleft"], [6850, 103, 176, "growup"], [7400, 315, 175, "growup"], [7950, 243, 146, "growleft"], [8500, 197, 112, "growright"], [9050, 257, 183, "growup"], [9600, 350, 176, "growup"], [10150, 270, 174, "growleft"], [10700, 106, 74, "growdown"], [11250, 356, 172, "growup"], [11800, 126, 164, "growup"], [12350, 159, 162, "growup"], [12900, 343, 51, "growdown"], [13450, 85, 48, "growdown"], [14000, 337, 159, "growleft"], [14550, 196, 169, "growup"], [15100, 157, 68, "growdown"], [15650, 240, 114, "growleft"], [16200, 269, 76, "growdown"], [16750, 51, 71, "growdown"], [17300, 192, 161, "growleft"], [17850, 146, 67, "growright"], [18400, 40, 172, "growup"], [18950, 248, 145, "growleft"], [19500, 287, 158, "growleft"], [20050, 188, 187, "growright"], [20600, 89, 129, "growright"], [21150, 284, 151, "growleft"], [21700, 179, 55, "growright"], [22250, 285, 176, "growup"], [22800, 124, 47, "growright"], [23350, 200, 49, "growright"], [23900, 344, 41, "growleft"], [24450, 262, 118, "growleft"], [25000, 240, 88, "growright"], [25550, 148, 44, "growright"], [26100, 256, 130, "growleft"], [26650, 139, 73, "growdown"], [27200, 188, 193, "growright"], [27750, 218, 64, "growdown"], [28300, 307, 44, "growdown"], [28850, 354, 79, "growdown"], [29400, 268, 82, "growleft"], [29950, 226, 164, "growup"], [30500, 358, 163, "growleft"], [31050, 119, 135, "growright"], [31600, 254, 197, "growup"], [32150, 344, 167, "growup"]],
// 475 1 in 1
[[4100, 289, 106, "growleft"], [4575, 262, 194, "growup"], [5050, 205, 69, "growdown"], [5525, 43, 163, "growup"], [6000, 160, 187, "growleft"], [6475, 132, 170, "growup"], [6950, 268, 92, "growleft"], [7425, 169, 51, "growright"], [7900, 100, 48, "growright"], [8375, 193, 93, "growleft"], [8850, 219, 197, "growright"], [9325, 117, 135, "growright"], [9800, 297, 140, "growleft"], [10275, 176, 55, "growright"], [10750, 227, 135, "growleft"], [11225, 201, 121, "growleft"], [11700, 79, 123, "growright"], [12175, 77, 53, "growdown"], [12650, 257, 187, "growup"], [13125, 333, 176, "growleft"], [13600, 139, 178, "growright"], [14075, 254, 157, "growleft"], [14550, 295, 171, "growup"], [15025, 195, 98, "growright"], [15500, 158, 149, "growright"], [15975, 131, 61, "growdown"], [16450, 53, 73, "growright"], [16925, 158, 181, "growright"], [17400, 195, 57, "growdown"], [17875, 338, 190, "growup"], [18350, 277, 104, "growleft"], [18825, 235, 124, "growleft"], [19300, 332, 193, "growup"], [19775, 349, 175, "growup"], [20250, 246, 160, "growleft"], [20725, 275, 112, "growleft"], [21200, 43, 87, "growright"], [21675, 76, 64, "growright"], [22150, 280, 92, "growleft"], [22625, 327, 175, "growup"], [23100, 74, 89, "growright"], [23575, 238, 146, "growleft"], [24050, 59, 79, "growright"], [24525, 183, 92, "growleft"], [25000, 243, 195, "growleft"], [25475, 82, 103, "growright"], [25950, 287, 136, "growleft"], [26425, 278, 138, "growleft"], [26900, 127, 105, "growright"], [27375, 353, 69, "growdown"], [27850, 284, 178, "growup"], [28325, 249, 43, "growdown"], [28800, 303, 97, "growleft"], [29275, 140, 43, "growright"], [29750, 169, 93, "growright"], [30225, 223, 137, "growleft"], [30700, 161, 160, "growup"], [31175, 157, 142, "growright"], [31650, 307, 196, "growup"], [32125, 359, 161, "growup"], [32600, 269, 165, "growup"]],
// 400 1 in 1
[[4100, 299, 149, "growleft"], [4500, 215, 131, "growright"], [4900, 235, 69, "growright"], [5300, 310, 58, "growleft"], [5700, 69, 136, "growright"], [6100, 121, 134, "growright"], [6500, 117, 78, "growdown"], [6900, 284, 192, "growup"], [7300, 299, 132, "growleft"], [7700, 323, 152, "growleft"], [8100, 161, 81, "growleft"], [8500, 153, 47, "growdown"], [8900, 234, 51, "growright"], [9300, 304, 197, "growleft"], [9700, 134, 137, "growright"], [10100, 327, 65, "growdown"], [10500, 69, 120, "growright"], [10900, 128, 85, "growright"], [11300, 80, 56, "growright"], [11700, 350, 158, "growleft"], [12100, 230, 54, "growright"], [12500, 199, 41, "growdown"], [12900, 116, 134, "growright"], [13300, 173, 47, "growright"], [13700, 292, 130, "growleft"], [14100, 51, 184, "growright"], [14500, 205, 68, "growright"], [14900, 312, 95, "growleft"], [15300, 230, 42, "growright"], [15700, 156, 164, "growright"], [16100, 75, 107, "growright"], [16500, 146, 117, "growright"], [16900, 83, 122, "growright"], [17300, 207, 89, "growleft"], [17700, 243, 140, "growleft"], [18100, 226, 110, "growleft"], [18500, 357, 161, "growup"], [18900, 154, 171, "growup"], [19300, 156, 187, "growup"], [19700, 193, 114, "growleft"], [20100, 121, 80, "growdown"], [20500, 301, 181, "growup"], [20900, 237, 141, "growright"], [21300, 161, 78, "growleft"], [21700, 260, 45, "growdown"], [22100, 349, 159, "growleft"], [22500, 256, 88, "growleft"], [22900, 351, 123, "growleft"], [23300, 347, 45, "growleft"], [23700, 227, 148, "growleft"], [24100, 297, 171, "growup"], [24500, 290, 49, "growleft"], [24900, 106, 79, "growright"], [25300, 202, 140, "growleft"], [25700, 222, 94, "growleft"], [26100, 275, 177, "growleft"], [26500, 219, 64, "growdown"], [26900, 196, 101, "growleft"], [27300, 193, 101, "growleft"], [27700, 217, 70, "growdown"], [28100, 254, 116, "growleft"], [28500, 124, 172, "growup"], [28900, 315, 114, "growleft"], [29300, 65, 197, "growright"], [29700, 349, 153, "growleft"], [30100, 66, 121, "growright"], [30500, 49, 121, "growright"], [30900, 155, 89, "growright"], [31300, 111, 152, "growright"], [31700, 255, 162, "growup"], [32100, 271, 162, "growleft"], [32500, 183, 199, "growup"]],
// 325 1 in 1
[[4100, 56, 63, "growright"], [4425, 308, 186, "growleft"], [4750, 232, 94, "growleft"], [5075, 60, 191, "growup"], [5400, 355, 182, "growleft"], [5725, 140, 130, "growright"], [6050, 317, 185, "growleft"], [6375, 78, 106, "growright"], [6700, 275, 187, "growleft"], [7025, 274, 43, "growdown"], [7350, 150, 163, "growup"], [7675, 238, 90, "growright"], [8000, 116, 94, "growright"], [8325, 318, 59, "growleft"], [8650, 215, 186, "growright"], [8975, 113, 48, "growdown"], [9300, 199, 162, "growup"], [9625, 230, 68, "growdown"], [9950, 82, 46, "growright"], [10275, 278, 174, "growleft"], [10600, 97, 56, "growright"], [10925, 69, 60, "growright"], [11250, 57, 63, "growdown"], [11575, 159, 185, "growright"], [11900, 231, 149, "growleft"], [12225, 316, 96, "growleft"], [12550, 97, 171, "growright"], [12875, 324, 48, "growdown"], [13200, 168, 170, "growleft"], [13525, 339, 81, "growleft"], [13850, 125, 72, "growright"], [14175, 144, 95, "growright"], [14500, 131, 43, "growright"], [14825, 346, 77, "growleft"], [15150, 230, 101, "growleft"], [15475, 120, 80, "growright"], [15800, 222, 114, "growleft"], [16125, 260, 60, "growleft"], [16450, 43, 67, "growright"], [16775, 166, 176, "growup"], [17100, 81, 123, "growright"], [17425, 106, 138, "growright"], [17750, 174, 187, "growup"], [18075, 138, 141, "growright"], [18400, 191, 95, "growright"], [18725, 234, 149, "growleft"], [19050, 168, 111, "growright"], [19375, 270, 52, "growleft"], [19700, 289, 90, "growleft"], [20025, 41, 149, "growright"], [20350, 68, 112, "growright"], [20675, 179, 59, "growright"], [21000, 277, 46, "growleft"], [21325, 233, 66, "growleft"], [21650, 126, 106, "growright"], [21975, 115, 138, "growright"], [22300, 104, 139, "growright"], [22625, 332, 56, "growleft"], [22950, 337, 105, "growleft"], [23275, 144, 115, "growright"], [23600, 259, 153, "growleft"], [23925, 145, 173, "growup"], [24250, 285, 59, "growleft"], [24575, 327, 117, "growleft"], [24900, 253, 153, "growleft"], [25225, 199, 67, "growleft"], [25550, 79, 135, "growright"], [25875, 230, 143, "growright"], [26200, 169, 48, "growleft"], [26525, 168, 191, "growright"], [26850, 205, 127, "growright"], [27175, 57, 126, "growright"], [27500, 210, 199, "growup"], [27825, 299, 193, "growleft"], [28150, 42, 165, "growup"], [28475, 103, 198, "growup"], [28800, 197, 69, "growdown"], [29125, 298, 65, "growleft"], [29450, 249, 194, "growleft"], [29775, 86, 197, "growright"], [30100, 122, 113, "growright"], [30425, 139, 142, "growright"], [30750, 195, 55, "growleft"], [31075, 140, 194, "growup"], [31400, 216, 189, "growright"], [31725, 327, 80, "growdown"], [32050, 156, 117, "growright"], [32375, 167, 160, "growup"], [32700, 326, 159, "growleft"]]
];

var red = '#DE4448'
var green = '#51B45B'
var yellow = '#DECE67'
var blue = '#5E84BE'

var powerDiv;
var game_board;
var gameStartTime;
var currentLevel;

var attackSequence = [];
var bench = [];
var powerLevel = 100;
var currentTouches = [];
var gameActive = false;
var blockedCount = 0;
var totalCount = 0;

var debugDiv;

$(document).ready(function() {
  TouchAttack.setup();
});


var TouchAttack = {
  setup: function(attribute){
    if (navigator.appVersion.indexOf('iPhone OS ') < 0) {
      this.warn('Oops come back to this site on your iPhone or iPod Touch.');
      return;
    }
    
    document.addEventListener("touchmove", TouchAttack.disableTouch, false);
    
    if (!window.navigator.standalone ) { 
      this.warn('Click the + and select "Add to Home Screen" to install TouchAttack');
      return;
    }
    
    window.onorientationchange = TouchAttack.onorientationchange;
        
    this.onorientationchange();
    
    for (var i=benchSize;i>0;i--) {
      var square = $.engineer.make('attack_square', { 
        onTouchStartFuntion: TouchAttack[mode],
        onTouchEndFuntion: TouchAttack['un'+mode]
      });
      $('body').append(square);
      bench.push(square);
    }
    
    game_board = document.getElementById('game_board'); 
    document.body.ontouchstart = TouchAttack.disableTouch;

    powerDiv = $('#powerLevel');
    debugDiv = $('#debug');
    
    powerDiv.css('width',powerLevel + '%');
    
    for (var i=levels.length;i>0;i--) {
        var div = document.getElementById('level'+i+'start');
        if (i == 1 || localStorage['level'+i]) {
          $(div).removeClass('disabled');
          div.level = i;
          div.ontouchend = function() {
            // location.reload(true);
            TouchAttack.start(this);
          };
          div.ontouchstart = function() {
            // location.reload(true);
            $(this).css('background',yellow);
          };
        }
    }

    document.getElementById('reload').ontouchend = function() {
      location.reload(true);
    }
  
  },
  warn: function(warning) {
    $('#warning')
      .fadeIn()
      .find('#warningText')
        .text(warning);
  },
  unwarn: function() {
    $('#warning').fadeOut();
    $('#game').fadeIn();
  },
  onorientationchange: function() {
    window.scrollTo(0, 1)
    var orientation = window.orientation;

    if (0 == (90 % orientation)) {
      TouchAttack.unwarn();
    } else {
      TouchAttack.warn('This game is meant to be played in landscape. Please rotate your device.');
    }
  },
  start: function(levelDiv){
    currentLevel = levelDiv.level;

    $('#Level').text('Level ' + currentLevel);
    
    attackSequence = levels[currentLevel-1];
      
    totalCount = attackSequence.length;
    
    TouchAttack.moveMenuTo(-320); // Level
    setTimeout(TouchAttack.moveMenuTo, 1000, -640); // 3
    setTimeout(TouchAttack.moveMenuTo, 2000, -960); // 2
    setTimeout(TouchAttack.moveMenuTo, 3000, -1280); // 2
    setTimeout(TouchAttack.moveMenuTo, 4000, -1920); // GO
    
    setTimeout(TouchAttack.startTimer, 4000);
    
    this[mode+'Start'](); // let's get this party started
  },
  startTimer: function(){
    timerDiv = $('#timerLevel');
    timerDiv.css({'width':'0%','background-color':red });
    setTimeout(TouchAttack.gameOver, gameLength, true);
    gameStartTime = new Date;
  },
  attackStart: function() {
    attackSequence = [];
    
    game_board.ontouchstart = TouchAttack.attack;
    game_board.ontouchmove = TouchAttack.disableTouch;
    
    setTimeout(TouchAttack.refreshPower, refreshRate);
    
    gameActive = true;
  },
  attack: function(e) {
    e.preventDefault();
    $.each(e.touches, function(i,t) {
      var x = t.pageX - (boxSize/2);
      var y = t.pageY - (boxSize/2);
      bench.push(bench.shift().send('attack', x, y));
      
      attackSequence.push([(new Date) - gameStartTime, x, y]);
    });
  },
  unattack: function(e) {
    e.preventDefault();
  },
  defendStart: function() {
    game_board.ontouchstart = TouchAttack.disableTouch;
    game_board.ontouchmove = TouchAttack.disableTouch;
    
    $.each(attackSequence, function(i,a) {
      setTimeout(TouchAttack.shoot, a.shift(), a.shift(), a.shift(), a.shift());
    });
    
    gameActive = true;
  },
  defend: function(e) {
    e.preventDefault();
    $(this).css({
      'background-color':yellow
    });
  },
  undefend: function(e) {
    $(this).css('display','none').data('touched',true);
  },
  shoot: function(x, y, direction) {
    if (gameActive) {
      var square = bench.shift().send('shoot', x, y, direction);
      bench.push(square);
      setTimeout(TouchAttack.blocked, gameSpeed, square);
    }
  },
  blocked: function(elem) {
    if (!elem.data('touched')) {
      elem.css('background', red);
      powerDiv.css('background', red);
      powerLevel = powerLevel - shotCost;
    } else {
      blockedCount++;
      powerDiv.css('background', green);
      powerLevel = powerLevel + blockValue;
      if (powerLevel > 100) { powerLevel = 100 };
    }
    powerDiv.css('width',powerLevel + '%');
    
    if (powerLevel < 1) {
      TouchAttack.gameOver(false);
    }
  },
  powerReady: function() {
    return !!(powerDiv.width() > (shotCost/480) & powerLevel > shotCost)
  },
  refreshPower: function() {
    powerLevel = powerLevel + refreshAmount;
    if (powerLevel > shotCost){
      powerDiv.css('background-color',green);
    }
    if (powerLevel > 100) { powerLevel = 100 };
    powerDiv.css('width',powerLevel + '%');
    setTimeout(TouchAttack.refreshPower, refreshRate);
  },
  gameOver: function(lived) {
    if (gameActive) {
      gameActive = false;

      game_board.ontouchstart = function() {};
      
      if (lived) {
        var resultText = "You made it! Your score was:";
        var resultColor = 'white';
        currentLevel++;
        localStorage['level'+currentLevel] = true;
      } else {
        var resultText = "You died, but you made it out with:";
        var resultColor = red;
      }
      
      $('.resultDescription').text(resultText).css('color',resultColor);
      $('#results').css('top',0);
      $('#blocked').text(blockedCount);
      $('#total').text(totalCount);
    }
  },
  disableTouch: function(event)
  {
  	event.preventDefault();
  },
  moveMenuTo: function(top){
    $('#menu').css('top',top);
  }
}

$.engineer.define('attack_square',{
  defaults: {
    onTouchStartFuntion: function() {},
    onTouchEndFuntion: function() {}
  },
  structure: function(options) {
    return $('<div/>', {
      css: {
        'background':blue,
        'position':'absolute',
        'top':-9,
        'left':0,
        'width':'1px',
        'height':'1px'
      }
    });
  },
  behavior: function(options) {
    var self = this;
    var publicMethods = {
      attack: function(x,y) {
        self.css({
          'top':y,
          'left':x,
          '-webkit-animation-name': 'shrink',
          '-webkit-animation-duration': (gameSpeed/1000)+'s'
        });
      },
      shoot: function(x,y,direction) {
        self.data('touched',false);
        self.css({
          'display':'block',
          'background':blue,
          'top':y,
          'left':x,
          '-webkit-animation-name': direction,
          '-webkit-animation-duration': (gameSpeed/1000)+'s'
        });
      }
    }
    
    self[0].ontouchstart = options.onTouchStartFuntion;
    self[0].ontouchend = options.onTouchEndFuntion;
    self[0].ontouchmove = function(e) { e.preventDefault(); }
    
    self.bind('webkitAnimationEnd', function (){ 
      bench.push(self.css({
        'top':-9,
        '-webkit-animation-name': null,
        '-webkit-animation-duration': null
      }));
    });
    
    return publicMethods;
  }
});