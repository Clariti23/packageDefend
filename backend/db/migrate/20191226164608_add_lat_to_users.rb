class AddLatToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :lat, :string
  end
end
