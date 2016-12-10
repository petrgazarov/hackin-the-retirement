class SessionController < ApplicationController
  def oauth
    #get data for test user, log this user in

    redirect_to '/onboarding'
  end
end
