# SERVER

## DEPLOYMENT
Most stuff like cors and the procfile are already set up to work with Heroku, the only thing that I think ~might give 
you trouble is the fact that we're using an env file. Since you're not supposed to push this to heroku, I think 
you manually have to declare the environment variables in the UI or something


## TESTING
Set up a new cluster and db instance using MongoDB Atlas, then download MongoDB compass and copy the 
database connect string on index.js

~~~
mongoose.connect('mongodb+srv://connectstring', {
	useNewUrlParser: true,
});
~~~

If you're using Windows, running the start_servers.bat file will automatically start both the client and backend servers.
To do so manually, change into the server directory, then run:

~~~
node index.js
~~~
---
## Project Structure

### Routes:
All routes are declared in the index.js file

### Controllers:
All model controllers along with their respective functions are declared in their respective [ModelName]Controller.js file 

### Models:
All model schemas are declared in their respective [ModelName].js file 

---

## VerifyJWT
VerifyJWT is a middleware function that checks to make sure the client passed in a valid auth token with the request.
Failure to do so should return a 400 error.

### examples:
~~~
app.post('/login', UserController.login);
~~~
login is a public route, it does not require an auth token

~~~
app.get('/users/:id', verifyJWT, UserController.find);
~~~
A user's profile page should be protected and therefore passes verifyJWT as a middleware to ensure the client is logged in