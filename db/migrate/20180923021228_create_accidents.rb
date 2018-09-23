class CreateAccidents < ActiveRecord::Migration[5.2]
  def change
    create_table :accidents do |t|
      t.integer :age
      t.string :gender
      t.integer :year
      t.integer :month
      t.integer :day
      t.string :departament
      t.string :vehicle
      t.string :object
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
