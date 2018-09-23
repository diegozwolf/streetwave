class DemoController < ApplicationController
  def demo
  end

  def accident_info
    @accident= Accident.all.sample
    render  json: @accident    
  end

end
