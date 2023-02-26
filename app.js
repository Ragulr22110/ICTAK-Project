const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path')
 
const trackerRoutes = require('../backend/routes/tasksroute');
const userRoutes = require('../backend/routes/usersroute');
const projectRoutes = require('../backend/routes/projectroutes');
const taskRoutes = require('../backend/routes/tasksroute');

const app = new express();

app.use(express.static(path.join(__dirname,'/build')));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(trackerRoutes);
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);

app.get('*', (req,res)=>{
    res.sendfile(path.join(__dirname + '/build/index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on the PORT ${process.env.PORT}`);
});




