# CollabHub

The CollabHub project offers a dedicated platform through which one could discover or contribute to open-source projects. By matching developers with relevant projects and collaborators, CollabHub makes it possible to solve two of the most important challenges that open-source ecosystem face—finding the right project which match the developer slills and interest and effective communication among contributors. The platform offers robust filtering options and GitHub integration to enhance user experience, making it easier for contributors and maintainers to collaborate. The following report describes the development of CollabHub, speaks about its potential for building a more connected and efficient open source community. 

### Deployed Link: https://web-grp5.netlify.app/ 

### Backend URL: https://csci-5709-webproject.onrender.com

### Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Express, Node.js
- **Database**: MongoDB
- **Deployment**: Netlify for frontend deployment, Render for backend deployment
- **Programming Language**: Typescript


### Group Information
- Members:  

    * Kenil Patel (B00954251) kenilpatel121200@gmail.com
    * Tathya Kapadia (B00968181) tt857842@dal.ca  	 
    * Krutik Kulkarni (B00981839) kr677398@dal.ca
    * Piyush Joshi (B00978594) py287300@dal.ca
    * Jay Patel (B00981520) Jy356444@dal.ca	
    * Jainish Patel (B00981519) jn891368@dal.ca


## Getting Started

### Prerequisites

To have a local copy of this up and running on your local machine, you will first need to install the following software / libraries / plug-ins

```

npm (Comes with node.js installation)

Frontend Dependencies:
"dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.97",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1",
    "react-scripts": "5.0.1",
    "react-toastify": "^10.0.5",
    "dotenv": "^16.4.5",
    "styled-components": "^6.1.11",
    "typescript": "^4.9.5",
    "typewriter-effect": "^2.21.0",
    "web-vitals": "^2.1.4"
}

Backend Dependencies:

"dependencies": {
    "axios": "^1.7.2",
    "body-parser": "^1.20.2",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "mongodb": "^6.8.0"
}

```

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins


### Installing

#### Install Node.js (to use npm)

1. Goto https://nodejs.org/en/download and download the LTS installer as per your OS.

2. Run the installer.

3. Accept License Agreement

4. Choose Installation path.

5. Keep the default installation settings and click next.

6. Skip the optional installation window and click next and click install.

7. To check the installation, run the below commands.


```
node -v
```

Sample output: v20.11.0

```
npm -v
```

Sample output: 10.2.4

#### Install all libraries (Frontend + Backend)

Goto top level folder of the project ("/"). Run the below command.
This will install dependencies of both React and Node.js apps.

```
npm install
```

Sample output: added 1565 packages, changed 69 packages, and audited 1635 packages in 2m
Done in 3m 34.4s

#### Start Frontend and Backend

Goto folder of the project ("collab-hub/"). Run the below command.
This will start both React app.

```
npm start
```

Goto folder of the project ("backend/"). Run the below command.
This will start both Node.js app.

```
npm run dev
```

## Deployment

  
**Frontend:**

Link the GitHub/GitLab repository with [Netlify](https://app.netlify.com/).

Then, use the below site configurations:

* Base directory: `/collab-hub/`

* Build command: `npm run build`

* Publish directory: `/collab-hub/build`

  
**Backend:**

Link the GitHub/GitLab repository with [OnRender](https://app.netlify.com/).

Then, use the below site configurations:
* Base directory: `/backend/`

* Start Command: `node index.js`

## Built With

  

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

  

* [React](https://react.dev/) - The Frontend Library

* [Create React App](https://create-react-app.dev/) - Tool to generate boilerplate code and structure of a React App

* [npm](https://www.npmjs.com/) - Dependency management

* [Node](https://www.npmjs.com/) - JavaScript runtime environment

* [Express](https://www.npmjs.com/) - web framework for [Node.js](https://nodejs.org/en/)

* [MongoDB](https://www.mongodb.com/) - NoSQL Database
  
  

**References:**

[1]	“Node.Js — download,” Nodejs.org. [Online]. Available: https://nodejs.org/en/download. [Accessed: 25-Jul-2024].

[2]	“React,” React.dev. [Online]. Available: https://react.dev/. [Accessed: 25-Jul-2024].

[3]	“Netlify app,” Netlify.com. [Online]. Available: https://app.netlify.com/. [Accessed: 27-Jul-2024].

[4]	“Express - Node.js web application framework,” Expressjs.com. [Online]. Available: https://expressjs.com. [Accessed: 25-Jul-2024].

[5]	“Create react app,” Create-react-app.dev. [Online]. Available: https://create-react-app.dev/. [Accessed: 25-Jul-2024].

[6]	“Npm: React-router-dom,” npm. [Online]. Available: https://www.npmjs.com/package/react-router-dom. [Accessed: 25-Jul-2024].

[7]	“Rapidly build modern websites without ever leaving your HTML,” Tailwindcss.com. [Online]. Available: https://tailwindcss.com. [Accessed: 25-Jul-2024].

[8]	“Npm: Typescript,” npm. [Online]. Available: https://www.npmjs.com/package/typescript.[Accessed: 25-Jul-2024].

[9] “MongoDB: The developer data platform,” MongoDB. [Online]. Available: https://www.mongodb.com. [Accessed: 26-Jul-2024].
