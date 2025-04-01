Feature: User Signup Story
  Scenario: User signs up successfully
  Given I am on the signup page
  When I enter valid credentials
  And I click the signup button
  Then Ishould be logged in successfully
  And I should be redirected to the home page

  Scenario: User signs up with taken credentials
  Given I am on the signup page
  When I enter taken credentials
  And I click the signup button
  Then I should see an error message

  Scenario: User signs up with short password
  Given I am on the signup page
  When I enter short password
  And I click the signup button
  Then I should see an error message

