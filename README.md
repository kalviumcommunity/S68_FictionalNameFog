**Project Overview & Key Features**

This project will be about names from fictional shows, movies, comics, etc. which are comparatively harder to remember than names in real life.

The key features that will be included are:

- Hall of Fame for the top 10 names that are the hardest to remember.
- Function for the user to add names.
- Function to randomly display a name based on fixed conditions that the user can set.

#

##### Deploy Link - https://s68-fictionalnamefog.onrender.com

### Mongo Atlas Connection
Added entity data to Mongo, and connected to the Mongo Database.

### CRUD Operations
Created CRUD operations (GET, POST, PUT, DELETE) and tested with Bruno API Testing.

### Base Frontend Setup
Created Vite setup for frontend and created a landing page with 4 buttons based on Key Features.

Landing page only has buttons because there is no design as of yet, and the buttons are in name only to show what key features will be available.

### Deployment
Deployed Frontend on Netlify

### Design A Component
Created a frontend component to display names from the database

### Using The Component
Connected the component to the backend to retrieve names from the database

### Inserting An Entity
Created new **Add Name** page, which is connected to the backend and adds the information to the database.
These names can be viewed at the "**/viewnames**" route, or by clicking View Names on the navbar.

### Updating & Deleting An Entity In React
Implemented **Edit** and **Delete** functionalities for managing entities in the database.

- **Edit**: Clicking the "Edit" button navigates to a form where the user can update entity details. On submission, the updated information is sent to the backend and stored in the database.
- **Delete**: Clicking the "Delete" button removes the selected entity from the database and triggers a re-render to reflect the changes in the UI.

### User Validation
Added validation for all entity functions in the routes.js file.

### Adding Relations Between Entities
- Created basic user schema, and added "**createdBy**" to each name.
- Added a dropdown in displayNames.jsx to filter names based on user.

### Using SQL database
Connected to SQL Database.

### Working With Cookies
Created endpoints with the following actions.
- Logging in and setting the username in a cookie.
- Logging out and removing the cookie from the browser.

---

Deploy Link: https://asapname.netlify.app/