Feature: User Login Story
  Scenario: User logs in successfully
  Given I am on the login page
  When I enter valid credentials
  And I click the login button
  Then I should be redirected to the home page

  Scenario: User logs in with invalid credentials
  Given I am on the login page
  When I enter invalid credentials
  And I click the login button
  Then I should see an error message

  Scenario: User logs out
  Given I am logged in
  When I click the logout button
  Then I should be logged out
