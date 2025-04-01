Feature: User Shopping Lists Story
  Scenario: User goes to the Shopping List details page
  Given I am not logged in
  When I click the list details page
  Then I should be redirected to login page

  Scenario: User goes to the Shopping List details page
  Given I am logged in
  And I don't have a list
  When I click the list details page
  Then I should see no lists in the list

  Scenario: User adds a Shopping list
  Given I am logged in
  When I click the add list button
  And I pick the grocery items
  And I enter the list name
  And I click the save button
  Then I should see the list added to the main list

  Scenario: User goes to the Shopping List details page
  Given I am logged in
  And I have a list
  When I click the list name for the list details
  Then I should be redirected to the Shopping List details page
  
  Scenario: User edits the Shopping List
  Given I am logged in
  And I have a Shopping List
  When I click the edit button for the Shopping List
  And I make changes to the Shopping List items.
  And I click the save button
  Then I should see the list updated

  Scenario: User deletes the Shopping List
  Given I am logged in
  And I have a Shopping List
  When I click the delete button for the Shopping List
  Then I should see the list removed from the Shopping List page
