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
  
  level2: [[4100, 169, 108], [4500, 321, 111], [4900, 330, 99], [5300, 157, 74], [5700, 208, 98], [6100, 285, 158], [6500, 68, 199], [6900, 79, 125], [7300, 294, 51], [7700, 199, 57], [8100, 339, 50], [8500, 298, 42], [8900, 242, 83], [9300, 253, 67], [9700, 244, 142], [10100, 144, 88], [10500, 317, 46], [10900, 346, 122], [11300, 136, 67], [11700, 354, 136], [12100, 142, 180], [12500, 115, 79], [12900, 218, 73], [13300, 149, 139], [13700, 114, 80], [14100, 316, 174], [14500, 192, 106], [14900, 128, 198], [15300, 339, 191], [15700, 117, 124], [16100, 75, 95], [16500, 179, 51], [16900, 43, 53], [17300, 321, 161], [17700, 95, 180], [18100, 302, 183], [18500, 82, 42], [18900, 323, 178], [19300, 92, 68], [19700, 140, 113], [20100, 91, 73], [20500, 252, 95], [20900, 325, 110], [21300, 237, 182], [21700, 327, 88], [22100, 118, 156], [22500, 197, 47], [22900, 324, 99], [23300, 131, 171], [23700, 154, 99], [24100, 74, 45], [24500, 133, 122], [24900, 57, 56], [25300, 236, 136], [25700, 235, 155], [26100, 329, 52], [26500, 348, 79], [26900, 189, 90], [27300, 93, 197], [27700, 329, 119], [28100, 229, 144], [28500, 131, 71], [28900, 152, 160], [29300, 295, 127], [29700, 219, 152], [30100, 301, 173], [30500, 277, 133], [30900, 56, 140], [31300, 47, 175], [31700, 231, 184], [32100, 279, 138], [32500, 80, 164]]

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