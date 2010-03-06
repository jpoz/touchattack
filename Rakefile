require 'rubygems'
require 'httparty'
require 'db'

class GoogleClosureCompiler
  include HTTParty
  base_uri 'closure-compiler.appspot.com'
  
  def compile()
    GoogleClosureCompiler.post('/compile', :body => {
      :compilation_level => "SIMPLE_OPTIMIZATIONS",
      :output_format => "text",
      :output_info => "compiled_code",
      :js_code => File.read('public/touchAttack.js')
    })
  end
end

task :default => [:compile]

task :compile do
   File.open('public/touchAttack-min.js','w') do |file|
     file.puts GoogleClosureCompiler.new.compile
   end
   puts "DONE"
end

task :compile_console do
   puts GoogleClosureCompiler.new.compile
end

task :dbsetup do
  puts DataMapper.auto_migrate!.inspect
end