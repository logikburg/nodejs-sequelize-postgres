const express = require('express')
const bodyParser = require('body-parser')
const { User, UserDetail } = require('./service')
const Sequelize = require('sequelize')
//const bcrypt = require('bcrypt');

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.setHeader('charset', 'utf-8');
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", 'x-access-token, accept');
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", 'Accept, Content-Type');
  next();
});

// login user
app.post('/api/authenticate', (req, res) => {
  if(!req.body.username){
    return res.status(400).json({ err: `no username is supplied!`})
  }
  if(!req.body.password) {
    return res.status(400).json({ err: `no password is supplied!`})
  }

  let uname = req.body.username;
  let pass = req.body.password;

  let token;
  let result;
  console.log("looking for a user have username:" + uname);
  User.find({
    where: {
      username: uname,
      password: pass
    }
  })
  .then(
      user => {
        if(!user) {
          return res.status(401).json({ err: `Not authorized`})
        }
        console.log("user token: " + user.token);
        if(user.token){
          token = user.token;
          console.log("assigned user token: " + token);
          return res.status(200).json({ "token": token});
        }

        token = "ye2NDomfopm32=="
        user.updateAttributes({
          token: token
        })
        .then(function () {
            console.log("update the user.token: " + user.token) // 'token'
            return res.status(200).json({ "token": token});
        })

      }, function(errors) {
        console.log(errors);
        return res.status(500).json({ err: `Something went wrong !`})
    }
  )
})

// logout user
app.post('/api/logout', (req, res) => {
  console.log(req.body);
  var token = req.headers['x-access-token'];
  if(token == null) {
      return res.status(400).json({ err: `authorized token missed :(`})
  }
  let uname = req.body.username;
  User.update({
      token: null,
      updatedAt: Sequelize.DATE,
    }, {
    where: {
      username: uname,
      token: token
    }
  }).then(
    user => res.json({user: uname, message: 'logout successfully' })
  );
})

// create a user
app.post('/api/users', (req, res) => {
    console.log(req.body)
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ err: err.errors[0]}))
})

// create a userDetail
app.post('/api/userDetails', (req, res) => {
  console.log(req.body);
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    UserDetail.create(req.body)
        .then(userDetail => res.json(userDetail))
        .catch(err => res.status(400).json({ err: err}))
})

// create a user
app.get('/api/userDetails/:userId?', (req, res) => {
    console.log(req.body);
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    let userId = req.params.userId;
    UserDetail.findAll({
      where: {
        username: userId
      }
    }).then(user => res.json(user));
})

// get detail user Information
app.get('/api/userDetails/:userId?/:policycode?/geneticresult', (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  let userId = req.params.userId;
  let policycode = req.params.policycode;
  UserDetail.findAll({
    where: {
      username: userId,
      policycode: policycode
    }
  }).then(user => {
    if(!user) {
      res.json({})
    }
    res.json(user.geneticresult);
  })
})

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
