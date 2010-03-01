class GameGenerator
  class << self
    def new_game(timeout)
      game = []
      (29100/timeout).times do |i| 
        game << [4100 +(i * timeout), (40 + rand(480 - 80*2)), (40 + rand(320 - 80*2))]
      end
      game.inspect
    end
  end
end

puts GameGenerator.new_game(400)