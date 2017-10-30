# Most-Wanted Community

The Most-Wanted Community is a MEAN stack (MongoDB, ExpressJS, AngularJS, NodeJS) Single-Page Application, designed and developed for Need-For-Speed Most-Wanted fans to share experiences and download addons. 

## Current Version
```Version 1```

## Change Log
- **version 1 :** signup/login, post/delete/like/dislike/comment on moment, edit profile, view photo gallery, download file, etc. (see more details in *FEATURES*;

## Prerequisites

```
UI: bootstrap
Frontend: Angular.js
Backend: Node.js
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
* Sign up or log in with valid username and password;
* Navigation bar and home page will show different views before and after logging in;

### Profile
* Current user's profile is able to access by himself;
* Personal information (e.g., gender, E-mail, facebook, twitter, etc.) could be edited (add, delete, edit) in the profile page;

### Moment Managerment
* Post/delete moments in the channel page;
* Like/dislike anyone's moment (each user could only like/dislike a moment once);
* Comment on anyone's moment (no limit);

### Points Rule
* A points rule is designed to encourage the users to be more active;
* Each user has a 'points' attribute, which is associated with the number of moments, comments, like and dislike;

### Download
* Addons (car modifications for the game) are listed in the download page;
* Details of each addons could be reviewed through the 'details' button;
* Technical specs table and photo gallery are designed in the detail page;
* Thumbnail images in photo gallery could be zoomed in;

### About
* Brief introduction of this application is presented through 'Jumbtron';
* Contact information (e.g., E-mail, social apps, etc.) are provided;
* A customer suggestion form is designed for any user;


## Author
* **Jun Hu**


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
