const e = require('express');
const yup = require('yup');
const kassert = require('./src/kassert');

const app = e();
app.use(e.json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const jwtTemplate = {
  iss: '',
  sub: '',
  aud: [],
  iat: 0,
  exp: 0,
  nbf: 0,
  department: '',
  mail: '',
  name: '',
  org: '',
  roles: '',
  userId: '',
};

const roleAssertion = (value, token) => {
  const check = {};
  token.roles.split(',').forEach((v, i) => { check[v] = i; });
  return value.split(',').every(v => check[v] !== undefined);
};

app.use(kassert({
  assertions: {
    role: roleAssertion,
  },
}));

app.listen(3001, () => { console.log('Listening at http://localhost:3001/'); });
