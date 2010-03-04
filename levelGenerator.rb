class GameGenerator
  class << self
    
    WIDTH = 480 - 80*2
    HEIGHT = 320 - 80*2
    
    def direction(x, y)
      direction = case rand(4)
      when 0
       (y > (HEIGHT-80)) ? direction(x,y) : 'down'
      when 1
       (y < (80*2)) ? direction(x,y) : 'up'
      when 2
       (x > (WIDTH-80)) ? direction(x,y) : 'right'
      when 3
       (x < (80*2)) ? direction(x,y) : 'left'
      else
        self.direction(x, y)
      end
    end
    
    def new_game(timeout, direction_likeihood)
      game = []
      (29100/timeout).times do |i| 
        x = (40 + rand(WIDTH))
        y = (40 + rand(HEIGHT))
        moving = (0 == rand(direction_likeihood)) ? 'grow'+direction(x,y) : 'grow'
        game << [4100 +(i * timeout), x, y, moving]
      end
      "// #{timeout} 1 in #{direction_likeihood}\n" + game.inspect + ","
    end
  end
end

10.times do |i|
  puts GameGenerator.new_game(1000-(i*75), [6-i,1].max) 
end
