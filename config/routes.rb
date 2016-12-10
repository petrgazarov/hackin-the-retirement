HackinTheRetirement::Application.routes.draw do
  root to: 'main#home'

  get '/oauth', to: 'session#oauth'
  get '/onboarding', to: 'main#onboarding'
  get '/recommendation', to: 'main#recommendation'
  post '/fetch_and_save_current_form', to: 'api#fetch_and_save_current_form'
end
