Feature: Login

  Scenario: Should login with valid user
    Given I open the login page
    When I login with valid user
    Then I should be redirected to the dashboard

  Scenario: Should display bad credentials label with invalid user
    Given I open the login page
    When I login with invalid user
    Then I should see bad credentials label