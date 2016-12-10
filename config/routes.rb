HackinTheRetirement::Application.routes.draw do
  root to: 'main#home'

  get '/oauth', to: 'session#oauth'
  get '/onboarding', to: 'main#onboarding'
end
