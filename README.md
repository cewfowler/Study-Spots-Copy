# study-spots
Group 3 for Wednesday 12:50 section

Welcome to StudySpots(TM)! This is a web application designed by:
Christian Fowler, Adam Hochberger, Danny Moolchand, and Robert Parker.

This app lets users view a map of all the buildings in the University of Florida. The purpose of this app is to allow students to easily locate avaialable classrooms or study rooms, view the most coveted ones, and to also reserve one for their own personal user.

In order to vote on a room or add a new room, you must create and account first. Otherwise, you can just browse the map and rooms in each building.

Below is a weekly summary of our accomplishments: 


Week 1 8-Oct: 
Created user stories for Sprint 1
Divide tasks among the four of us:
Chris: Implement basic schema and server
Adam: Learn MapBox API and implement basic map into index.
Danny: Write blog summary and user 
Robert: Begin web app wireframing
Planned out general tasks to be completed in Sprint 2 and Sprint 3	


Week 2 - 15-Oct:
Implemented index.html with the MapBox API to include the map on the page
Implemented the server.js, spotsClass.js, spots.serve.model.js, and routes.js
Wireframed the basic design of the website
Wrote letter to client
More map functionality - like clicking on points, automatic centering, etc.
CSS additions to index.html


Week 3 - 22-Oct: 
Added routes for getting rooms and buildings from JSON
Implemented user schema for user accounts
Began framework for user authentication
Created MongoDB database for buildings and successfully loaded them onto the map


Week 4 - 29-Oct:
Implemented user authentication (server side only)
Added functionality to MapBox map on index.html
Created “add room” button so users and add rooms to buildings (server side only)
Refactored code to have separate functions in separate files
Added building popup to show information
Sidebar now populated with buildings
Code refactoring


Week 5 - 5-Nov:
Converted project over to angular to use $scope (thanks Adam)
Rewrote functions to use $scope
Implemented updating rooms route to spotFactory so buildings can now have rooms
Popups of buildings now show pictures of buildings - loaded from UF API
Created login and register on front-end and tied it to server side
Implemented authentication and register routes
Sidebar now interactive - clicking on buildings locate them on map and can filter buildings by name or code
Code refactoring


Week 6 - 12-Nov:
More functionality to sidebar - now on click expands to show rooms and upvotes/downvote
CSS added to sidebar
Rooms can now be posted to buildings and be seen on the map
Implemented a getUser route to load information of users


Week 7 - 19-Nov:
Thanksgiving Break, no commits to project.


Week 8 - 26-Nov:
Tons of bug fixes with userFactor, userAuthentication
More functionality to MapBox
Reserve Spot button on popups open menu and populate with buildings name - user experience
Color coded markers on map - user experience
Updated user schema, user authentication/registration/login fully implemented
CSS added to sign-in and login forms
Code refactoring
Fixed bugs with upvoting and downvoting


Week 9 - 3-Dec:
Implemented sessions with Passport
Made routes for getting user information for logging in / logging out
Updated userSchema
Upvotes/Downvotes working properly now and tied to users, along with permissions to only vote if user is logged in
Included reservation system on front-end
More functionality to popups in MapBox
Markers are now colored to help differentiate the different buildings
Account page set up
Redesigned whole site!




