const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const User = require('./models/Span');


const app = express();
app.use(express.json());


dotEnv.config();

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const PORT = 3000;
process.env

app.post('/spans', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users/:id', async (req,res)=>{
  try{
    const userId = req.params.id;

    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  }
  catch(error){
    res.status(400).send(error);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
  });
