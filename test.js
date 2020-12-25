const e = require('express');
const kassert = require('./src/kassert');
const StandardRoleAssertion = require('./src/StandardRoleAssertion');

const app = e();
app.use(e.json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use('/', kassert({ assertions: [new StandardRoleAssertion('ARM_User')] }));

app.get('/', (req, res) => {
  res.json({ message: 'success' });
});

app.listen(3001, () => { console.log('Listening at http://localhost:3001/'); });
