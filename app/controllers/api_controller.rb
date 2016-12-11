class ApiController < ApplicationController
  def fetch_and_save_current_form
    FinancialProfile.create!({ user_id: user.id }.merge(new_financial_profile_data) )

    head :ok
  end

  private

  def values_from_questions
    {
      "yesno_38571180" => :smoker,
      "yesno_38571394" => :drinker,
      "number_38571502" => :retirement_age,
      "number_38571594" => :amount_to_pass_to_heir,
      "number_38572105" => :mortgage_value,
      "number_38572468" => :car_loan_value,
      "number_38572509" => :bank_loan_value
    }
  end

  def last_response
    @last_response ||= api_data['responses'].select { |f| f['completed'] == '1' }.last['answers']
  end

  def new_financial_profile_data
    result = {}

    values_from_questions.keys.map do |k|
      result[values_from_questions[k]] = last_response[k]
    end

    result
  end

  def api_data
    @api_data ||= HTTParty.get "https://api.typeform.com/v1/form/Xk0UUt?key=#{ENV['TYPEFORM_KEY']}"
  end

  def user
    User.create
  end
end
