
var ControllerCalculadora = require('./controllerCalculadora');



module.exports = function (app) {

    app.get('/register', function (req, res) {

        res.sendfile('./register.html');

    });

    app.get('/login', function (req, res) {

        res.sendfile('./login.html');

    });

    app.get('/calc', function(req,res){
        
        res.sendfile('./indice.html');
        
    }); 
    //app.get('/calc', ControllerCalculadora.getUI); 

    app.post('/api/login', ControllerCalculadora.login);

    app.post('/api/registrarpersona', ControllerCalculadora.registrapersona);

    app.post('/api/modificarpersona', ControllerCalculadora.modificarpersona);

    app.post('/api/reemplazapersonas',ControllerCalculadora.reemplazapersonas);

    app.put('/api/registrarpersona', ControllerCalculadora.registrapersona);

    app.get('/api/todaslaspersonas', ControllerCalculadora.todaslaspersonas);

    app.delete('/api/eliminapersona', ControllerCalculadora.eliminarpersona);


};