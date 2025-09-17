import express from 'express';

const app = express();
const PORT = 3000;

const customers = [
    { id: 1, name: 'John Doe', email: "jhon.doe@icloud.com" },
    { id: 2, name: 'Jane Smith', email: "jane.smith@gmail.com"},
    { id: 3, name: 'Alice Johnson', email: "alice.johnson@citromail.com" },
];

app.get('/customers', (req, res) => {
  res.json(customers);
});

app.get('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id, 10);
  const customer = customers.find(c => c.id === customerId);
  
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

app.post('/customers', express.json(), (req, res) => {
  const newCustomer = {
    id: customers.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.put('/customers/:id', express.json(), (req, res) => {
  const customerId = parseInt(req.params.id, 10);
  const customer = customers.find(c => c.id === customerId);
  
  if (customer) {
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

app.delete('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id, 10);
  const customerIndex = customers.findIndex(c => c.id === customerId);
  
  if (customerIndex !== -1) {
    customers.splice(customerIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});