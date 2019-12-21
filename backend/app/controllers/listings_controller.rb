class ListingsController < ApplicationController
    def index
        listings = Listing.all
        render json: {
          listings: listings
        }
      end

    def show
        listing = params[:id]
        listing = Listing.find(params[:id])
        render json: {
            listing: listing
          }
    end

  def listing_params
    params.require(:listing).permit(:price, :max_hold, :created_at, :updated_at)
  end
  
end