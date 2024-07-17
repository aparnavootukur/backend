const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const express = require('express');
const sequelize = require('./config/db');
const cors=require('cors')
const path = require('path');

const app = express();
app.use(cors())
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');


app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

sequelize.sync().then(() => {
  console.log('Database connected and synced');
}).
catch(err => {
  console.log('Error connecting to the database', err);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
