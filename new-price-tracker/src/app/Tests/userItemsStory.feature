Feature: User Items Story
  Scenario: User goes to the items page
  Given I am logged in
  When I click the items button
  Then I should be redirected to the items page
  
  Scenario: User goes to the items page
  Given I am not logged in
  When I click the items button
  Then I should be redirected to the login page

  Scenario: User adds an item
  Given I am logged in
  When I click the add item button
  And I enter the item details
  And I click the save button
  Then I should see the item added to the main list
  
  Scenario: User edits an item
  Given I am logged in
  And I have an item in the list
  When I click the edit button for the item
  And I make changes to the item details
  And I click the save button
  Then I should see the item updated
  
  Scenario: User deletes an item
  Given I am logged in
  And I have an item in the list
  When I click the delete button for the item
  Then I should see the item removed from the list
  
  Scenario: User goes to the item details page
  Given I am logged in
  And I have an item in the list
  When I click the item name for the item details
  Then I should be redirected to the item details page
  
