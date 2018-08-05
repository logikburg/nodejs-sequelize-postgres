##### nodejs-sequelize-postgres

### Instructions to bring up the service.
This is based on nodejs. You can directly download the code and follow steps to bring up the service.
> npm install 

This help to install dependentency to run application.

Configure database setting in service.js file, as this file is responsible to connect to Transactional database. I used Postgres and ORM library Sequelize to make job easy.

> node index.js

This bring up server up and initiate to accept incoming request.

### How to test for this service and strategy about the service

>_POST /api/users_
<p>create a new user</p>
<dl>
  <dt>Request:</dt>
  <dd>{ username, password, email } as string</dd>
  <dt>Response:</dt>
  <dd>{ User } as json object</dd>
</dl>

>_POST /api/authenticate_
<dl>
  <dd>authentication for a user and get token for authorization</dd>
  <dt>Request:</dt>
  <dd>{ username, password } as string</dd>
  <dt>Response:</dt>
  <dd>{ username, token, expiresIn } as json object</dd>
</dl>

>_POST /api/logout_
<dl>
  <dd>logout for a user and destroy token for user</dd>
  <dt>Request:</dt>
  <dd>[Token] as header, { username, token } as string</dd>
  <dt>Response:</dt>
  <dd>{ message } as string</dd>
</dl>

>_POST /api/userDetails_
<dl>
  <dd>create a detail data for user such as policy, genetic result etc.</dd>
  <dt>Request:</dt>
  <dd>[Token] as header, {username,dob,firstname,lastname,geneticresult} as json string</dd>
  <dt>Response:</dt>
  <dd>{ UserDetails } as json object</dd>
</dl>

>_GET /api/usersDetail/{username}_
<p stype='{font-size:10px'>create a detail data for user such as policy, genetic result etc.</p>
<dl>
  <dd>create a detail data for user such as policy, genetic result etc.</dd>
  <dt>Request:</dt>
  <dd>[Token] as header, {username,dob,firstname,lastname,geneticresult} as json string</dd>
  <dt>Response:</dt>
  <dd>{ UserDetails } as json object</dd>
</dl>

>_GET /api/usersDetail/{username}/geneticresult_
<dl>
  <dd>Get geneticresult data for a user.</dd>
  <dt>Request:</dt>
  <dd>[Token] as header field</dd>
  <dt>Response:</dt>
  <dd>{ geneticresult } as json object</dd>
</dl>
