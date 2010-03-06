require 'rubygems'
require 'sinatra'
require 'haml'
require 'db'

get '/' do
  haml :index
end

not_found do
  haml :'404'
end

post '/newScore' do
  score = Score.new
  score.attributes = { :level => params[:level], :score => params[:score], :total => params[:total] }
  puts score.inspect
  score.save
end

error do
  'Sorry there was a nasty error - ' + env['sinatra.error']
end