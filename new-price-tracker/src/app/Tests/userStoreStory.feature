Feature: User Stores Story
  Scenario: User goes to the Store List page
  Given I am not logged in
  When I click the Store List page
  Then I should be redirected to login page
  
  Scenario: User goes to the store details page
  Given I am logged in
  And I don't see a store
  When I click the store details page
  Then I should see no stores in the store list
  
  Scenario: User goes to the store details page
  Given I am logged in
  And I see a store
  When I click the store name for the store details
  Then I should be redirected to the store details page

  Scenario: User adds a store
  Given I am logged in
  When I click the add store button
  And I enter the store details
  And I click the save button
  Then I should see the store added to the main store list
  
  Scenario: User edits a store
  Given I am logged in
  And I see a store
  When I click the edit button for the store
  And I make changes to the store details
  And I click the save button
  Then I should see the store updated
  
  Scenario: User deletes a store
  Given I am logged in
  And I see a store
  When I click the delete button for the store
  Then I should see the store removed from the store list
