require 'rubygems'
require 'dm-core'
require 'do_sqlite3'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/touchAttack.db")

class Score
  include DataMapper::Resource

  property :id,         Serial
  property :level,      Integer
  property :score,      Integer
  property :total,      Integer
  property :created_at, DateTime
end