# CLIENT

## PROJECT STRUCTURE
If you've ever worked with Rails, the project layout will seem pretty familiar.
Each model has a dedicated page for each part of its CRUD functionality. That is...

## /Pages
### /User
* Users : displays a list of all users 
* UserShow : user's profile page
* UserNew : page dedicated to creating a new user (register page)
* UserEdit : edit page for user information
* ValidatedForm : reusable component that verifies to make sure no required imputs are empty

Along with various other custom pages such as settings, which includes links to wallet, delete account, and edit user info

## /hooks
Here we contain all custom hooks and Context instances
### useAuth.js
Custom hook used for any API calls dealing with user authentication, 
return object containing functions for login, logout, and registerUser, as well as any erros encountered during the call.
* #### login()
  Login works by making the appropriate api call, saving the JWT token to the localstorage, and calling on the UserContext that we declared in App.js to set the authUser to the newly logged in user. modifying UserContext is necessary to login the user immediately without waiting for a page refresh.
* #### logout()
  Logout simply deletes the auth token from local storage and sets the authUser from UserContext to null

### useFindUser.js
useFindUser is the custom hook responsible for storing the currently authenticated user in state. On mounting, it 
checks the client's localstorage for a valid auth token. It returns the user object and setUser function.
This hook is used in App.js to maintain the state for the UserContext provider.

## /services
### auth-header.js
This function checks the client's local storage for a valid auth token, if it exists, it returns a header 
object to pass into a client's request.

## /Auth
### Login.js
Simple login page

### PrivateRoute.js
Checks to see if user is logged in, if not, redirects user to login page.

## DEALING WITH AUTHENTICATION
In App.js, we call useFindUser to check to see if the client has a valid auth token in the localstorage. 
This is passed down to all child components as React Context. Meaning that in any child component, if we want 
to verify whether or not a user is logged in, we can simply call:

~~~
const { authUser } = useContext(UserContext);

if (authUser) {
  // some logic
}
~~~

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
