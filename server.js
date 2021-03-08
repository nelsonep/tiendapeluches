let express  = require('express');
let app      = express(); 					// Utilizamos express
let mongoose = require('mongoose'); 				// mongoose para mongodb
let port  	 = process.env.PORT || 8080; 			// Cogemos el puerto 8080


app.configure(function() {
	//app.use(express.static(__dirname + '/')); 		
	app.use(express.logger('dev')); 			// activamos el log en modo 'dev'
	app.use(express.methodOverride());
});


const mongoAtlasUri = 'mongodb+srv://nelsonep:NJEP2005@cluster0.ihrv8.mongodb.net/TiendaPeluches?retryWrites=true&w=majority'

try {
mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
console.log("connected"));    
}catch (error) { 
console.log("could not connect");    
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var bodyParser= require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// Cargamos los endpoints
require('./routes.js')(app);

// Cogemos el puerto para escuchar
app.listen(port);
console.log("APP por el puerto " + port);