const express = require('express');
const app = express();
const port = 3000;

// To parse POST request data
app.use(express.urlencoded({ extended: true }));

// Static directory for serving CSS and other assets
app.use(express.static(__dirname + '/public'));

// HTML forms for each route
const homePage = `
  <h1>Welcome to the Home Page</h1>
  <a href="/contact">Contact</a> |
  <a href="/bio">Bio</a>
`;

const contactPage = `
  <h1>Contact Information</h1>
  <form action="/contact" method="post">
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name"><br>
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email"><br><br>
    <input type="submit" value="Submit">
  </form>
  <a href="/home">Home</a> |
  <a href="/bio">Bio</a>
`;

const bioPage = `
  <h1>Short Bio</h1>
  <form action="/bio" method="post">
    <label for="bio">Short Bio:</label><br>
    <textarea id="bio" name="bio" rows="4" cols="50"></textarea><br><br>
    <input type="submit" value="Submit">
  </form>
  <a href="/home">Home</a> |
  <a href="/contact">Contact</a>
`;

// Route for the home page
app.get('/home', (req, res) => {
  res.send(homePage);
});

// Route for the contact page (GET request to view contact form)
app.get('/contact', (req, res) => {
  res.send(contactPage);
});

// Route for the contact page (POST request to submit contact form)
app.post('/contact', (req, res) => {
  const { name, email } = req.body;
  res.send(`<h1>Contact Information Received:</h1><p>Name: ${name}</p><p>Email: ${email}</p><a href="/contact">Go Back</a>`);
});
// Route for the bio page (GET request to view bio form)
app.get('/bio', (req, res) => {
    res.send(bioPage);
  });
  
  // Route for the bio page (POST request to submit bio form)
  app.post('/bio', (req, res) => {
    const { bio } = req.body;
    res.send(`<h1>Short Bio Received:</h1><p>${bio}</p><a href="/bio">Go Back</a>`);
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
