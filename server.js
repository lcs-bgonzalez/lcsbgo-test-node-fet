var rest = require('express')();
var httpServer = require('http').Server(rest);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, function(){
	console.log(`Listening on ${ PORT }`);
});

rest.get('/:variable', function (req, res) {
	res.send('despedido ' + req.params.variable)
});