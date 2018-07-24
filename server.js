const express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
let catalog = [];

const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 5000;


app.get('/products', (req, res) => {
	res.send(catalog);
})

app.get('/products/:id', (req, res) => {
	var neededProduct = catalog.products.find(p => p.id === Number(req.params.id));
	var responseData = buildResponseData(req.get('accept'), neededProduct);

	res.set({'content-type': responseData.contentType})	
	res.send(responseData.body);
})

app.post('/products', (req, res) => {
	console.log(req.body)

	var maxId = catalog.products.reduce(
		(max, p) => max < p.id ? p.id : max,
		-Infinity
	);
	catalog.products.push(Object.assign(req.body, {id: maxId + 1}));
	fs.writeFile(
		'./catalog.json',
		JSON.stringify(catalog),
		(err) => {
			res.status(201).send('Created');
		}
	);
})

app.put('/products/:id', (req, res) => {
	console.log(req.body);
	var elementPos = catalog.products.map(function(item) {return item.id; }).indexOf(Number(req.params.id));
	catalog.products.splice(elementPos, 1);
	catalog.products.push({...req.body});
	fs.writeFile(
		'./catalog.json',
		JSON.stringify(catalog),
		(err) => {
			res.status(202).send('Updated');
		}
	);
})

app.delete('/products/:id', (req, res) => {
	var elementPos = catalog.products.map(function(item) {return item.id; }).indexOf(Number(req.params.id));
	catalog.products.splice(elementPos, 1);
	fs.writeFile(
		'./catalog.json',
		JSON.stringify(catalog),
		(err) => {
			res.status(200).send('Deleted');
		}
	);
})

fs.readFile('./catalog.json', {encoding: "utf-8"}, (err, json) => {
	if (!err) {
		catalog = JSON.parse(json);
		app.listen(port, () => console.log(`Listening on port ${port}`));
	} else {console.log(err);}
})