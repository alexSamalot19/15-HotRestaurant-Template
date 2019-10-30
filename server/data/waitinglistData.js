const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const waitList = [{
  customerName: 'test',
  phoneNumber: '69',
  customerEmail: '@u',
  customerId: 'helloworld',
}];

app.get('/', (req, res) => {
  res.sendFile(path.json(__dirname, 'home.html'));
});

app.get('/reserve', (req, res) => {
  res.sendFile(path.json(__dirname, 'reserve.html'));
});
app.get('/api/waitlist', (req, res) => {
  return res.json(waitList);
});

app.get('/api/waitlist/:clients', (req, res) => {
  const s = req.params.clients;

  console.log(s);

  for (let i = 0; i < waitList.length; i++) {
    if (s === waitList[i].routeName) {
      return res.json(waitList[i]);
    }
  }

  return res.json(false);
});

app.post('/api/waitlist', (req, res) => {
  const newClients = req.body;

  newClients.routeName = newClients.name.replace(/\s+/g, '').toUpperCase();

  console.log(newClients);

  waitList.push(newClients);

  res.json(newClients);
});

app.listen(PORT, () => {
  console.log('app listen on PORT ' + PORT);
});
