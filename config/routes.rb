Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to =>"demo#demo"
  get "/info", to: 'demo#accident_info'
  

end
