class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :reference_id

      t.integer :ssn
      t.string :first_name
      t.string :surname
      t.string :address1
      t.string :city
      t.string :state_code
      t.string :postal_code
      t.string :country_code
      t.date   :birth_date
      t.string :mobile_phone_number
      t.string :email_address
      t.integer :driver_license
      t.string :driver_license_issue_location
      t.date :driver_license_issue_date
      t.date :driver_license_expiration_date
      t.string :third_party_user_id
    end
  end
end
