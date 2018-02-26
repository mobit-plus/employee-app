const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const publicPath = path.join(__dirname, '../public');
//console.log(publicPath);
//const {MongoClient} = require('./../connection/mongodb-connect');


const port = process.env.PORT || 3000;

app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/EmployeeApp');

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
        console.log('new employee join');

    socket.on('newEmpjoin', (param,callback) => {
        if (!param.empname) {
            return callback('All field are require!');
        }
            //console.log(param)

        let Employee = mongoose.model('Employee', {
            Name:{type:String, required: true, minlength: 3, trim: true},
            Last:{type:String,required: true, minlength: 3, trim: true},
            ID:{type:Number, default:false},
            Job:{type:String,required: true, minlength: 6, trim: true},
            Address:{type:String, required: true, minlength: 6, trim: true},
            hiredDate:{type:Date ,default: Date.now}
        });
        
        let NewEmployee = new Employee({
            Name:param.empname,
            Last: param.emplast,
            ID: param.id,
            Job: param.job,
            Address: param.add
        });
        NewEmployee.save().then((doc) => {
             console.log(JSON.stringify(doc, undefined, 2));
        },(er) => {
            console.log('Unable to save Data!',er);
        });
    });
    
    socket.on('disconnect',() => {
        console.log('disconnect');
    });
});


server.listen(port, () => {
    console.log(`server up to port: ${port}`);
});