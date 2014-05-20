Feature: Creating the first notebook
As a researcher I should be prompted to create a notebook so that I can evalute code and try out beaker.

  Scenario: Creating the first notebook
    When I am viewing beaker
    Then I see the the user dashboard
    And I create a notebook
    Then I should see a new notebook
