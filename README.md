# Matcha
<img src="frontend/src/media/Matcha-logos_black.png" width="10%"/>
Matcha/Hive Helsinki

### URL 'Static Version' :
http://matcha-hive.herokuapp.com

## :diamond_shape_with_a_dot_inside: **Project's goal:**
Matcha is a Hive's School project. The idea here is to build a dating app. <br />
Starting from the frontend to the backend and handling all Geolocation matters as well.
<br />
The project goal is to learn the use of micro-frameworks and the ability to build <br /> 
a big web application that can be available for many users simultaneously.
<br />
<br />
Additionally, the web app should be working in real time. Meaning that any updates <br /> 
happens to any user, should render in the app right away like in the real world applications.
<br />

## :page_with_curl: **How it's done:** 

Explained here the user journey through once visiting the web app.

- Basic registration for basic user info.
- Email verification
- User token created and stored into the user's browser
- User profile info form
- User pictures form
- Displaying other users according to the current user's country and interests
- The ability to view other users profiles "The user are able to see several users at once"
- After liking, if the other user likes the current user back, they are able to chat
- Chat room that saves conversations.

## :arrow_forward: **Install the program:**

**Prerequisites:**
- Postgresql
- NPM
- Using <a href="backend/sql/database.sql"> this </a> script to initialize the database and tables.
- ```.env``` file for frontend with: **Google geolocation API, GEOAPI**
- ```.env``` file for the backend with: ***POSTGRES Database Info, Email and Password, GEOAPI, websocket API info***

<hr />

- ```git clone```
- ```cd backend```
- ```npm install```
- ```npm run dev or npm start```
- ```cd frontend```
- ```npm install```
- ```npm start```
