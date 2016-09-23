 
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');



//Connect to the database
mongoose.connect('mongodb://dilushika:123@ds025263.mlab.com:25263/todoapp')
	.then((result) => console.log('connection successful'))
	.catch((err) => console.error(err)); 


//Add the middleware to the express application
app.use(express.static(path.join(__dirname, 'public')));
// log every request to the console
app.use(morgan('dev')); 
// parse application/x-www-form-urlencoded                                        
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json            
app.use(bodyParser.json());  
// parse application/vnd.api+json as json                                   
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

app.use(methodOverride());



//Define the todo model
var TodoSchema = new mongoose.Schema({
	taskMessage : String,
	status : Boolean
});


var todos = mongoose.model('todos',TodoSchema);


	//Get all the todos when the page is loading
	app.get('/mytodos',function(req,res){
		todos.find({"status" : false} , function(err,tasks){
			if(err)
				res.send(err)
			else
				res.json(tasks);
		});
	});




	app.get('/mycompletedtodos', function(req,res){
		todos.find({"status" : true} , function(err,tasks){
			if (err)
				res.send(err)
			else
				res.json(tasks);
		});
	});




	//Add new todos
	app.post('/mytodos',function(req,res){
		
		if(req.body.taskMessage != null)
			todos.create({
				taskMessage : req.body.taskMessage,
				status : false,
			}, function(err,tasks){

				if(err) 
					res.send(err);

				todos.find({"status" : false} , function(err,task){
					if(err)
						res.send(err)
					res.json(task);
				});

		});

	});



	//Delete todos
	app.delete('/mytodos/:id/:status', function(req, res) {
        todos.remove({

            _id : req.params.id

        }, function(err, tasks) {
            if (err)
                res.send(err);

            else if (req.params.status == "false") {
	            todos.find({"status" : false} , function(err, task) {
	                if (err)
	                    res.send(err)
	                res.json(task);
	            });
	        }

	        else{

	        	todos.find({"status" : true} , function(err, task) {
	                if (err)
	                    res.send(err)
	                res.json(task);
	            });
	        }

        });
    });



	//Update todos when it is completed
    app.put('/mytodos/:id',function(req,res) {
    	todos.update({
    		_id : req.params.id

    	},{
	    		$set : {
	    			status : true
	    		}
    		
    	}, function(err,tasks){
    		if (err)
    			res.send(err);


    		todos.find({"status" : false} , function(err,task) {
    			if (err)
    				res.send(err)
    			res.json(task);
    		});
    	});
    });



	//Creating the server where browsers can connect to...
	app.listen(3000, function() {
		console.log('listening on 3000')
	})

