class MainController < ApplicationController
  layout :resolve_layout

  def home

  end

  def onboarding

  end

  def recommendation
    
  end

  private

  def resolve_layout
    case action_name
    when 'onboarding'
      'typeform'
    when 'recommendation'
      'typeform'
    else
      'application'
    end
  end
end
