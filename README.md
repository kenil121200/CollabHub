
<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use --->

<!--- You may delete any comments in this sample README.md file. If needing to use as a .txt file then simply delete all comments, edit as needed, and save as a README.txt file --->

  

# Assignment 3

  

*  *Date Created*: 27 July 2024

*  *Last Modification Date*: 27 July 2024

*  *Assignment Frontend URL (Deployed Application)*: [<https://web-grp5.netlify.app](https://web-grp5.netlify.app)
 
*  *Assignment Backend URL (Deployed Application)*: [<https://csci-5709-webproject.onrender.com/>](https://csci-5709-webproject.onrender.com/)

*  *Git URL of Group Repo.*: [<https://git.cs.dal.ca/kkulkarni/csci-5709-grp-05/-/tree/main?ref_type=heads>](https://git.cs.dal.ca/kkulkarni/csci-5709-grp-05/-/tree/main?ref_type=heads)

* *Git URL of my Branch.*: [<https://git.cs.dal.ca/kkulkarni/csci-5709-grp-05/-/tree/B00968181-Tathya?ref_type=heads>](https://git.cs.dal.ca/kkulkarni/csci-5709-grp-05/-/tree/B00968181-Tathya?ref_type=heads)

  
  
  

## Authors

  

* [Tathya Kapadia](tt857842@dal.ca)

  

## Completed feature and realted tasks  

**Feature:** Multiple Project List(All listed Projects) .

**Tasks:**

1. Filter projects based on different criteria such as tech stack etc.
2. Search by project title.

## List of files created and modified

 1. collab-hub\src\App.tsx
 2. collab-hub\src\features\ProjectsPage\Projects.tsx
 3. collab-hub\src\features\ProjectsPage\productlist.json
 4. collab-hub\src\components\NavBar\index.tsx
 5. backend\src\services\user projects\listedProjects.services.ts
 6. backend\src\routers\user Projects\listedProjectsRoutes.ts
 7. backend\src\controllers\user projects\listedProjects.controller.ts


## How to test my feature.
  
Task-1: Filter projects based on different criteria such as tech stack etc.

    Test-1: On the side of the search bar select the filter option and select the langauges and wait for the projects to filter automatically.

    Test-2: Select and deselct the langauge as required and see the result becomes 0 and 1 respectively(as there is only 1 entry in the database).

    Test-3: Select the domain on top. To test it properly deselct the All button ad nthen select it again.


Task-2: Search by project title.

    Test-1: Open the /projects page without login.You will be able to see the projects page and do the permitted actions as specified.

    Test-2: Open the /projects page withlogin. You will be able to see the projects page and do the permitted actions as specified.

## Getting Started

  

### Prerequisites

  

To have a local copy of this up and running on your local machine, you will first need to install the following software / libraries / plug-ins


```

npm (Comes with node.js installation)

Frontend Dependencies:
"dependencies": {
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^5.16.5",
    "@mui/material": "^5.16.5",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.97",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "axios": "^1.7.2",
    "dotenv": "^16.4.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.23.1",
    "react-scripts": "5.0.1",
    "react-toastify": "^10.0.5",
    "styled-components": "^6.1.11",
    "typescript": "^4.9.5",
    "typewriter-effect": "^2.21.0",
    "web-vitals": "^2.1.4"
}

Backend Dependencies:

"dependencies": {

    "@types/body-parser": "^1.19.5",
    "@types/compression": "^1.7.5",
    "@types/cookie-parser": "^1.4.7",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/mongodb": "^4.0.7",
    "@types/node": "^20.14.12",
    "http": "^0.0.1-security",
    "nodemon": "^3.1.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
}

```


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

Goto to the required folders using ```cd backend ```and ```cd collab-hub``` and perform the following command to install all the libraries
```
npm install
```


#### Start Frontend and Backend

Goto to the required folders using ```cd backend ```and ```cd collab-hub``` and perform the following command to start the application

```
npm run start
```
 

## Deployment

  
**Frontend:**

Link the GitHub/GitLab repository with [Netlify](https://app.netlify.com/).

Then, use the below site configurations:

* Base directory: `collab-hub/`

* Build command: `npm run build`

* Publish directory: `collab-hub/build`

  
**Backend:**

Link the GitHub/GitLab repository with [OnRender](https://render.com/).

Then, use the below site configurations:
* Base directory: `backend`

* Build command: `npm install`

* Start Command: `npm run start`

## Built With

  

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

  
* [React](https://react.dev/) - The Frontend Library

* [Create React App](https://create-react-app.dev/) - Tool to generate boilerplate code and structure of a React App

* [npm](https://www.npmjs.com/) - Dependency management

* [Node](https://www.npmjs.com/) - JavaScript runtime environment

* [Express](https://www.npmjs.com/) - web framework for [Node.js](https://nodejs.org/en/)

* [MongoDB](https://www.mongodb.com/) - NoSQL Database

## Sources Used

### frontend  collab-hub\src\features\ProjectsPage\Projects.tsx

*Lines 83-95, 184-197*

```
const CustomSearchBar = styled('div')(({ theme }) => ({
  flex: 1,
  padding: '0 10px',
  border: '1px solid #ccc',
  borderRadius: '20px',
  margin: '10px 20px',
  lineHeight: '40px',
  backgroundColor: '#f1f1f1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', 
  width: 'calc(100% - 40px)' 
}));

const filteredProjects = projectList.filter((project) => {
    const matchesDomain =
      selectedOptions.includes("All") ||
      selectedOptions.some((option) => project.projectDomain.toLowerCase().includes(option.toLowerCase()));
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchText.toLowerCase());
    const matchesLanguages =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((lang) =>
        project.projectTechnologies.toLowerCase().includes(lang.toLowerCase())
      );

    return matchesDomain && matchesSearch && matchesLanguages;
  });

```

  
The code above was created by adapting the code in [Implement React Filter Step-by-step](https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm)


<!---How---> 
- The code in [Implement React Filter Step-by-step](https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm) was implemented keeping in mind the usage in both javascript and typescript and proper presentation of demo.

<!---Why--->
-  [Implement React Filter Step-by-step](https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm)'s Code was used was particularly valuable as it covered various methods to implement a search filter in React. This diversity in approaches not only provided multiple solutions but also broadened my understanding of React's capabilities. It served as an excellent foundation for experimentation, allowing me to explore different techniques in my development process, enhancing the efficiency and effectiveness of my feature implementation.

<!---How--->
-  [Implement React Filter Step-by-step](https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm)'s Code was modified according to the need of my application on the basos of filter as well as search and y keeping in mind that both of them work together.


### frontend collab-hub\src\features\ProjectsPage\Projects.tsx

*Lines 155-158*

```
       fetch(`${process.env.REACT_APP_BACKEND_LINK}/listedProjects/getAllProjects`)
        .then(response => response.json())
        .then(data => setProjectList(data))
        .catch(error => console.error('Error fetching projects:', error));

```

<!---How--->
-  The code in [Using fetch with TypeScript](https://kentcdodds.com/blog/using-fetch-with-type-script) has proper explanation and detailed code implmenetation.

<!---Why--->
- [Using fetch with TypeScript](https://kentcdodds.com/blog/using-fetch-with-type-script)'s Code provided an ideal way to use fetch with typescript

<!---How--->
-  [Using fetch with TypeScript](https://kentcdodds.com/blog/using-fetch-with-type-script)'s Code was modified by me and adjusted accordingly to the requirements

## Acknowledgments

  
* I am grateful to the creators of the source from where I have taken the inspiration to do my assignment as well as the creaters of the packages that I have used in the assignment


* I would also like to mention these sources for taking the icons and design ideas

    * https://mui.com/material-ui/material-icons/
    * https://devicon.dev/
    * https://www.indiegogo.com/


**References:**

[1]	“Node.Js — download,” Nodejs.org. [Online]. Available: https://nodejs.org/en/download. [Accessed: 27-Jul-2024].

[2]	 “React,” React.dev. [Online]. Available: https://react.dev/. [Accessed: 27-Jul-2024].

[3]	“Netlify app,” Netlify.com. [Online]. Available: https://app.netlify.com/. [Accessed: 27-Jul-2024].

[4]	“Express - Node.js web application framework,” Expressjs.com. [Online]. Available: https://expressjs.com. [Accessed: 27-Jul-2024].

[5]	“Create react app,” Create-react-app.dev. [Online]. Available: https://create-react-app.dev/. [Accessed: 27-Jul-2024].

[6]	“Npm: React-router-dom,” npm. [Online]. Available: https://www.npmjs.com/package/react-router-dom. [Accessed: 27-Jul-2024].

[7]	“Npm: React-toastify,” npm. [Online]. Available: https://www.npmjs.com/package/react-toastify. [Accessed: 27-Jul-2024].

[8]	“Rapidly build modern websites without ever leaving your HTML,” Tailwindcss.com. [Online]. Available: https://tailwindcss.com. [Accessed: 27-Jul-2024].

[9]	“Npm: Typescript,” npm. [Online]. Available: https://www.npmjs.com/package/typescript.[Accessed: 27-Jul-2024].

[10]	“MongoDB: The developer data platform,” MongoDB. [Online]. Available: https://www.mongodb.com. [Accessed: 27-Jul-2024].
