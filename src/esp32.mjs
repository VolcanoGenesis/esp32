// import express from 'express';
// const app = express();
// const port = 3000;

// app.use(express.json());

// let latestData = null;

// app.post('/data', (req, res) => {
//   const { meanIntensity, glucoseLevel } = req.body; // Extract data from the request
//   const timestamp = new Date().toISOString();

//   latestData = {
//     meanIntensity,
//     glucoseLevel,
//     timestamp
//   };

//   console.log(`Received data: Mean Intensity = ${meanIntensity}, Glucose Level = ${glucoseLevel}, Timestamp = ${timestamp}`);
//   res.status(200).send('Data received successfully');
// });

// app.get('/data', (req, res) => {
//   if (latestData) {
//     res.json(latestData);
//   } else {
//     res.status(404).send('No data available');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
import express from 'express';
import mongoose from 'mongoose';
// import { BloodData } from './Blooddata.js';
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://admin:aditya@cluster0.m6mgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
});

const bloodDataSchema = new mongoose.Schema({
    meanIntensity: {
        type:Number,
        required: [true,'Please provide mean intensity']
    },
    glucoseLevel: {
        type:Number,
        required: [true,'Please provide glucose level']
    },
    timestamp: { type: Date, default: Date.now }
});

const BloodData = mongoose.model('BloodData', bloodDataSchema);
// Define a route to add data to the BloodData collection

app.get('/', async (req, res) => {
    res.send('Hemlo Chums!');
});

app.post('/blooddata', async (req, res) => {
    try{
        const watchData= await BloodData.create(req.body);
        res.status(200).send(watchData);
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/getData', async (req, res) => {
    try {
        const allData = await BloodData.find();
        console.log(allData);
        res.status(200).json(allData);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// Start the server
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on http://0.0.0.0:3000');
  });