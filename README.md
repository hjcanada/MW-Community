# Most-Wanted Community

The Most-Wanted Community is a MEAN stack (MongoDB, ExpressJS, AngularJS, NodeJS) Single-Page Application, designed and developed for Need-For-Speed Most-Wanted fans to share experiences and download addons. 

## Current Version
```Version 1.0```

## Change Log
- **version 1.0 :** signup/login, post/delete/like/dislike/comment on moment, edit profile, view photo gallery, download file, etc. (see more details in *FEATURES*);

## Prerequisites

```
UI: bootstrap 4
Frontend: Angular.js
Backend: Node.js, Express.js
Database: MongoDB
```


## Installation
1. Clone the repository: ```git clone https://github.com/hjcanada/MW-Community.git``` 
2. Install the required packages for backend: ```npm install --unsafe-perm```
3. Install the required packages for frontend: ```cd public/``` ```bower install --allow-root```
4. Start the server: ```node server.js```
5. Open the browser with: ```http://localhost:8000```


## Features

* Most of the functionalities are only accessible to the registered user;

### Signup/Login
* Sign up or log in with valid username and password, and warning/error/success alerts will be shown based on different conditions;
* Navigation bar and home page will show different views before and after logging in;

### Profile
* Current user's profile is able to access by himself;
* Personal information (e.g., gender, E-mail, facebook, twitter, etc.) could be edited (add, delete, edit) in the profile page;

### Moment Managerment
* Post/delete moments in the channel page;
* Like/dislike anyone's moment (either like or dislike, and available to re-select);
* Comment on anyone's moment (no limit);

### Points System
* A points system is designed in backend associated with database to encourage the users to be more active;
* Gain points by posting moments (+4), commenting (+2) and like/dislike moments (+1);
* When a moment is deleted, all the related users will lose points, comments number and post number gained from this moment;

### Download
* Addons (car modifications for the game) are listed in the download page;
* Details of each addons could be reviewed through the 'details' button;
* Technical specs table and photo gallery are designed in the detail page;
* Thumbnail images in photo gallery could be zoomed in;

### About
* Brief introduction of this application is presented through 'Jumbotron';
* Contact information (e.g., E-mail, social apps, etc.) are provided;
* A customer suggestion form is designed for any user, and warning/error/success alerts will be shown based on different conditions;


## Author
* **Jun Hu**


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
