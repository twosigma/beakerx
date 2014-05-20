Feature: Creating and closing notebooks
As a researcher I should be able to create new notebooks and then close them at any time. So that I can easily try out multiple things in multiple notebooks.

Background:
  When I am viewing beaker
  Then I see the the user dashboard

Scenario: Creating and closing multiple notebooks.
  When I create a notebook
  Then I should see a new notebook
  And I visit the user dashboard
  And I close all the open notebooks
  Then I should see the following notebooks:
    | ID | Open Date | Name | Path | Edited | Operation |
