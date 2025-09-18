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
    const { name, email } = req.body;
  
    // Ellenőrzés
    if (!name || !email) {
      return res.status(400).json({ error: 'A name és email mezők kötelezőek!' });
    }
  
    const newCustomer = {
      id: customers.length + 1,
      name,
      email,
    };
  
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
  });
  

  app.put('/customers/:id', express.json(), (req, res) => {
    const customerId = parseInt(req.params.id, 10);
    const customer = customers.find(c => c.id === customerId);
  
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
  
    // ellenőrizd, hogy minden kötelező mező meg van-e adva
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
  
    // ha minden megvan, frissítsd az adatokat
    customer.name = name;
    customer.email = email;
  
    res.json(customer);
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