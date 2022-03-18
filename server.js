const express    = require('express');      
const app        = express();                
const bodyParser = require('body-parser');
// import the student schema defined in the student.js file
const  Student = require('./models/student'); 
//register router middleware
const router = express.Router();  


app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());

const port = process.env.PORT || 8000;        

const config = require('./config');

const mongoose = require('mongoose');

mongoose.connect(config.db[app.settings.env]);

const mongoose     = require('mongoose');  
const Schema       = mongoose.Schema;

const StudentSchema   = new Schema({  
    student_id: String,
    name: String,
    registration_number: String,
    course: String,
    year_of_study: Number,
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Student', StudentSchema);


router.get('/students/:student_id', function(request, response) {  
    Student.findOne({student_id: request.params.student_id}, function(err, Student) {

        if (err) 
        {
        response.status(500);

        response.setHeader('Content-Type', 'application/vnd.error+json');
        response.json({ message: "An error occurred, unable to get student details"});

    } 
    else if (Student == null) 
    {

        response.status(404);
        response.setHeader('Content-Type', 'application/vnd.error+json');
        response.json({ message: "ProductQuantity not found for product_id "+request.params.student_id});

    } 
    else 
    {

        response.status(200);
        response.setHeader('Content-Type', 'application/hal+json');

        let student_resource = halson({
        student_id: Student.student_id,
        name: Student.name,
        course: Student.course,
        year: Student.year_of_study,
        registration_number: Student.registration_number,
        created_at: Student.created_at
        }).addLink('self', '/students/'+Student.student_id)
        //response
        response.send(JSON.stringify(student_resource));

    }
    });    
});

// let's now register our routes
app.use('/', router);

// now start the server on port 8000

app.listen(port);  
console.log('Starting server on port ' + port);