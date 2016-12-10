class CreateFinancialProfiles < ActiveRecord::Migration
  def change
    create_table :financial_profiles do |t|
      t.timestamps

      t.integer :user_id
      t.boolean :smoker
      t.boolean :drinker
      t.boolean :retirement_age
      t.integer :mortgage_value
      t.integer :car_loan_value
      t.integer :bank_loan_value
      t.integer :amount_to_pass_to_heir
    end
  end
end
