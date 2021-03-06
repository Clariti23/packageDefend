class UsersController < ApplicationController
  before_action :require_login
  skip_before_action :require_login, only: [:index, :create, :show, :update]

  def index 
    @users = User.all
    if @users
      render json: @users.to_json(user_serializer) 
      # render json: @users
    else
      render json: {
        status:404,
        errors: ['No users found']
      }
    end 
  end

  def show
    @user = User.find(params[:id])
    if @user
      render json: @user.to_json(user_serializer) 
    else 
      render json: {
        status: 404,
        errors: ['User not found']
      }
    end
  end

  def create
    @user = User.new(user_params) 
    # set default values for users
    @user[:balance] = 100
    @user[:rating] = nil
    @user[:pic_link] = "https://www.libarts.colostate.edu/music/wp-content/mu-plugins/cla-people/templates/userphoto.png"
    if @user.valid?
      @user.save
      render json: {
        status: 200,
        message: "New user saved!"
      }

    else
      render json: {
        status: 500,
        errors: ""
      }
    end
  end 

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: {
      status: 204,
      message: "user updated",
      user: user
    }
end

  private

  def user_serializer
    {
      :only => [:id, :f_name, :l_name, :email, :address, :balance, :rating, :pic_link, :lat, :long],
      :include => [:orders, :listings, :comments, :favoritesiis] }
  end

  def user_params
    params.require(:user).permit(:f_name, :l_name, :email, :address, :balance, :rating, :pic_link, :password, :password_confirmation, :lat, :long)
  end

end