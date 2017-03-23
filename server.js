var rest = require('express')();
var httpServer = require('http').Server(rest);

var testVar = "anulación total";

const PORT = process.env.PORT || 3000;

// -- https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js --
var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL || "postgres://ub3sn6j7hnsapl:p6ac34ea3e5868be0f78e8b2341053f1b672694973ddfc4eaaed7966b56a82df4@ec2-54-247-107-132.eu-west-1.compute.amazonaws.com:5432/d9atqk42arg1jd?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory", function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
  testVar = "";
  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
	  testVar += JSON.stringify(row);
    });
});

// ----

httpServer.listen(PORT, function(){
	console.log(`Listening on ${ PORT }`);
});

rest.get('/:variable', function (req, res) {
	res.send('despedido ' + req.params.variable + ':\n\n' + testVar)
});