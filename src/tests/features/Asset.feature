@Asset
Feature: Maintain an Asset and update cubes for reporting					

#   Scenario Outline: Maintain an Asset and update cubes for reporting	
#     Given Execution Summary from <Row>

#     Examples: 
#       | Row |
#       | 128 |

 #PCC-734,PCC-718,PCC-666
  Scenario Outline: To Transfer a released Asset
    Given user enters "Fin_Analyst" credentials and logs in to "Infor Application" the Application
    # When user clicks on "Asset Analyst" role
    # When user clicks on menu and selects Assets
    # Then user checks the company field exist under search
    # Then user clicks on "Interfacing Assets" tab
    # Then user clicks on "Invoice Interface Records" tab
    # Then user checks the Distribution Project field exist under search
    # When user clicks on Interfaces menu item
    # #Then user clicks on "Invoice Interface Records" tab
    # Then user checks the Distribution Project field exists 
    # When user selects a record and release with compute 
    # Then user clicks on "Unreleased" tab
    # Then user should see the Asset in unreleased tab 
    # Then user clicks on "Released" tab
    # When user selects a Released Asset
    # Then user clicks on Transfer button
    # When user enters the Transfer Details for <Row Number>
    # Then user releases the transfer Asset
    # Then user clicks on "Transfers" tab
    # When user validates the Asset Transfer status
    # Then logout

    Examples: 
      | Row Number |
      |          4 |
   

    