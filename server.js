const express = require('express');
let todo_arr = [];
let id = 0;
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/',function(req,res){
	let f = fs.readFile('/public/index.html',(err,data) => {
		if (err) throw err;
		console.log(data);
		res.send(data);
	});
});

app.post('/api/todo/',function(req,res){
	console.log(req.body);
	if(req.body.data){
		todo_arr.push({todo:req.body.data,id:id++});	
	}
	
	console.log(todo_arr);
	res.json({data:todo_arr});

});
app.delete('/api/todo/:id',function(req,res){
	console.log('params id',req.params.id);
		let el = todo_arr.find(function(todo_arr){
			return todo_arr.id == req.params.id;
	});
	console.log('a',el);
	 todo_arr.splice(todo_arr.indexOf(el),1);
	res.json({data:todo_arr});
	console.log('áaa',todo_arr);
	console.log('dcdc'+req.params.id);
});
app.put('/api/todo/:id',function(req,res){
	

	let el = todo_arr.find(function(todo_arr){
		return todo_arr.id == req.params.id;
	});
	console.log('dcdc'+req.params.id);
	el.todo = req.body.data;
	res.json({data:todo_arr});

});
app.get('/api/todos',function(req,res){
	res.json({data:todo_arr});
});
app.listen(3000);