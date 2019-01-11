Rails.application.routes.draw do
  namespace :api do  
    resources :blogs do
      resources :posts do 
        resources :comments
      end
    end
  end
end

