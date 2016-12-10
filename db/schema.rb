# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161210203628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "financial_profiles", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.boolean  "smoker"
    t.boolean  "drinker"
    t.boolean  "retirement_age"
    t.integer  "mortgage_value"
    t.integer  "car_loan_value"
    t.integer  "bank_loan_value"
    t.integer  "amount_to_pass_to_heir"
  end

  create_table "users", force: true do |t|
    t.string  "reference_id"
    t.integer "ssn"
    t.string  "first_name"
    t.string  "surname"
    t.string  "address1"
    t.string  "city"
    t.string  "state_code"
    t.string  "postal_code"
    t.string  "country_code"
    t.date    "birth_date"
    t.string  "mobile_phone_number"
    t.string  "email_address"
    t.integer "driver_license"
    t.string  "driver_license_issue_location"
    t.date    "driver_license_issue_date"
    t.date    "driver_license_expiration_date"
    t.string  "third_party_user_id"
  end

end
