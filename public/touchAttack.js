// var mode = 'attack';
var mode = 'defend';

var gameSpeed = 1000; //time player has to hit box
var boxSize = 80;
var refreshRate = 1000;
var refreshAmount = 50;
var shotCost = 20;
var blockValue = 10;
var gameLength = 30000;

var attackSequence = [[4100, 283, 41], [5100, 109, 84], [6100, 294, 194], [7100, 126, 111], [8100, 106, 142], [9100, 400, 140], [10100, 63, 54], [11100, 69, 53], [12100, 121, 175], [13100, 171, 144], [14100, 57, 139], [15100, 231, 137], [16100, 123, 188], [17100, 144, 93], [18100, 248, 187], [19100, 159, 85], [20100, 87, 87], [21100, 252, 91], [22100, 400, 199], [23100, 42, 67], [24100, 119, 120], [25100, 192, 130], [26100, 359, 106], [27100, 282, 122], [28100, 92, 95], [29100, 146, 70], [30100, 400, 91], [31100, 165, 74], [32100, 254, 158], [33100, 77, 58]];

var red = '#DE4448'
var green = '#51B45B'
var yellow = '#DECE67'
var blue = '#5E84BE'

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
  
  document.getElementById('startButton').ontouchend = function() {
    TouchAttack.start();
  }
  
  document.getElementById('reload').ontouchend = function() {
    location.reload(true);
  }
  
  TouchAttack.setup();
});


var TouchAttack = {
  setup: function(attribute){
    for (var i=10;i>0;i--) {
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
  start: function(){
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
    totalCount++;
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