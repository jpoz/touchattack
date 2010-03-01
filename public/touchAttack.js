// var mode = 'attack';
var mode = 'defend';

var gameSpeed = 1000; //time player has to hit box
var boxSize = 80;
var benchSize = 15;
var refreshRate = 1000;
var refreshAmount = 50;
var shotCost = 20;
var blockValue = 10;
var gameLength = 30000;

var levels = {
  level1: [[4100, 333, 121], [5100, 192, 93], [6100, 263, 139], [7100, 178, 193], [8100, 288, 44], [9100, 53, 194], [10100, 211, 131], [11100, 222, 161], [12100, 53, 60], [13100, 243, 198], [14100, 270, 167], [15100, 151, 164], [16100, 92, 121], [17100, 274, 117], [18100, 255, 171], [19100, 230, 136], [20100, 153, 173], [21100, 292, 133], [22100, 78, 91], [23100, 258, 49], [24100, 249, 118], [25100, 87, 197], [26100, 339, 170], [27100, 58, 130], [28100, 210, 130], [29100, 196, 161], [30100, 237, 113], [31100, 283, 125], [32100, 53, 158]],
  level2: [[4100, 60, 50], [4400, 352, 60], [4700, 97, 46], [5000, 149, 60], [5300, 134, 148], [5600, 334, 132], [5900, 142, 136], [6200, 167, 138], [6500, 256, 175], [6800, 60, 100], [7100, 112, 103], [7400, 197, 89], [7700, 186, 104], [8000, 297, 111], [8300, 142, 61], [8600, 309, 72], [8900, 231, 178], [9200, 109, 41], [9500, 68, 118], [9800, 154, 175], [10100, 233, 131], [10400, 174, 187], [10700, 121, 131], [11000, 329, 166], [11300, 258, 185], [11600, 150, 54], [11900, 117, 138], [12200, 59, 58], [12500, 125, 177], [12800, 310, 48], [13100, 139, 106], [13400, 124, 71], [13700, 167, 177], [14000, 148, 159], [14300, 286, 131], [14600, 127, 47], [14900, 118, 121], [15200, 97, 88], [15500, 65, 127], [15800, 320, 72], [16100, 140, 193], [16400, 272, 103], [16700, 304, 66], [17000, 157, 41], [17300, 294, 158], [17600, 85, 126], [17900, 47, 149], [18200, 176, 193], [18500, 132, 126], [18800, 204, 163], [19100, 290, 150], [19400, 203, 115], [19700, 285, 164], [20000, 76, 96], [20300, 308, 83], [20600, 249, 87], [20900, 253, 69], [21200, 301, 179], [21500, 213, 135], [21800, 179, 83], [22100, 178, 75], [22400, 42, 113], [22700, 175, 164], [23000, 349, 52], [23300, 142, 153], [23600, 324, 86], [23900, 210, 108], [24200, 51, 70], [24500, 171, 58], [24800, 278, 195], [25100, 90, 51], [25400, 183, 70], [25700, 206, 136], [26000, 152, 167], [26300, 152, 100], [26600, 137, 42], [26900, 157, 118], [27200, 346, 119], [27500, 269, 160], [27800, 359, 127], [28100, 356, 102], [28400, 191, 180], [28700, 234, 155], [29000, 202, 118], [29300, 209, 179], [29600, 161, 69], [29900, 248, 153], [30200, 229, 72], [30500, 313, 182], [30800, 135, 133], [31100, 268, 151], [31400, 261, 101], [31700, 134, 176], [32000, 132, 137], [32300, 249, 71], [32600, 307, 198], [32900, 134, 142]]
}

var red = '#DE4448'
var green = '#51B45B'
var yellow = '#DECE67'
var blue = '#5E84BE'

var attackSequence = [];
var bench = [];
var powerLevel = 100;
var powerDiv;
var game_board;
var currentTouches = [];
var gameActive = false;
var gameStartTime;
var blockedCount = 0;
var totalCount = 0;

var debugDiv;

$(document).ready(function() {
  
  document.getElementById('level1start').ontouchend = function() {
    TouchAttack.start(1);
  }
  
  document.getElementById('level2start').ontouchend = function() {
    TouchAttack.start(2);
  }
  
  document.getElementById('reload').ontouchend = function() {
    location.reload(true);
  }
  
  TouchAttack.setup();
});


var TouchAttack = {
  setup: function(attribute){
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
  },
  start: function(level){
    $('#Level').text('Level ' + level);
    
    attackSequence = levels['level'+level];
    
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
    setTimeout(TouchAttack.gameOver, gameLength);
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
      setTimeout(TouchAttack.shoot, a.shift(), a.shift(), a.shift());
    });
    
    gameActive = true;
  },
  defend: function(e) {
    e.preventDefault();
    $(this).css({
      'background-color':yellow,
    });
  },
  undefend: function(e) {
    $(this).css('display','none').data('touched',true);
  },
  shoot: function(x, y) {
    if (gameActive) {
      var square = bench.shift().send('shoot', x, y);
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
      TouchAttack.gameOver();
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
  gameOver: function() {
    if (gameActive) {
      gameActive = false;

      // alert('Game Over');
      game_board.ontouchstart = function() {};
      
      $('#results').css('top',0);
      $('#blocked').text(blockedCount);
      $('#total').text(totalCount);
      // mode = 'defend'
      // bench = [];
      // 
      // TouchAttack.start();
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
      shoot: function(x,y) {
        self.data('touched',false);
        self.css({
          'display':'block',
          'background':blue,
          'top':y,
          'left':x,
          '-webkit-animation-name': 'grow',
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