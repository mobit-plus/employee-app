const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

//const {db_Data} = require('./employee');


MongoClient.connect('mongodb://localhost:27017/EmployeeApp',(error, client) => {
    if (error) {
        //return console.log('Unable to connect MongoDB server!');
        return console.log(`Unable to connect MongoDB server!`);
    }
    console.log('connect to MongoDB server');
    

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/EmployeeApp');

    let db = client.db('EmployeeApp');

    
   
     
    // db.collection('employee').insertOne({
    //     empId: 1,
    //     empName: 'Prasoon Tare',
    //     empNo: 1,
    //     jobNo: 87,
    //     mgrNo: 6599,
    //     hireDate: new Date().getTime(),
    //     Department:{
    //         deptno: 7, 
    //         deptname: 'Developer', 
    //         depltloc: 'Pittsburgh'
    //     }
    // },(er, result) => {
    //     if (er) {
    //         return  `Employee ${empName} not Stored!${er}`;
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    
    client.close();
});

module.exports = {MongoClient};