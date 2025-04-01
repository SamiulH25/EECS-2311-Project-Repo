Feature: User Profile Page Story
  Scenario: User goes to the profile page
  Given I am logged in
  When I click the User Profile button
  Then I should be redirected to the profile page

  Scenario: User goes to the profile page
  Given I am not logged in
  When I click the User Profile button
  Then I should be redirected to the login page
  
  Scenario: User edits their profile GIF dropdown
  Given I am logged in
  When I click the User Profile button
  And I click the GIF dropdown to a different option
  Then I should see the GIF change each time I click on a new option

