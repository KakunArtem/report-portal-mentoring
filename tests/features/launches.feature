Feature: Launches

  Scenario: Should show one latest launch
    Given I am logged in as a test user
    And I navigate to the launches page
    When I select the latest launches
    Then I should see one latest launch