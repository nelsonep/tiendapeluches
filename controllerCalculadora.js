var Item = require('./persona');

var listadepersonas = [];

function buildUI() {

    return "<html><head></head><body onload = 'cargar()'><div><h2 id='espacioparausuario'></h2><input type='text' id='pantalla' /> <hr/> <table><tr><td><input type= 'button' id = '1' onclick= 'clickalnumero(this)' value='1' /> </td><td><input type= 'button' id = '2' onclick= 'clickalnumero(this)' value='2' /> </td><td><input type= 'button' id = '3' onclick= 'clickalnumero(this)' value='3' /> </td></tr><tr><td><input type= 'button' id = '4' onclick= 'clickalnumero(this)' value='4' /> </td><td><input type= 'button' id = '5' onclick= 'clickalnumero(this)' value='5' /> </td><td><input type= 'button' id = '6' onclick= 'clickalnumero(this)' value='6' /> </td></tr><tr><td><input type= 'button' id = '7' onclick= 'clickalnumero(this)' value='7' /> </td><td><input type= 'button' id = '8' onclick= 'clickalnumero(this)' value='8' /> </td><td><input type= 'button' id = '9' onclick= 'clickalnumero(this)' value='9' /> </td></tr><tr><td><input type= 'button' id = '+' onclick= 'clickaop(this)' value='+' /> </td><td><input type= 'button' id = '-' onclick= 'clickaop(this)' value='-' /> </td><td><input type= 'button' id = 'divi' onclick= 'clickaop(this)' value='/' /> </td></tr> <tr><td colspan='3'><input type= 'button' id = 'multi' onclick= 'clickaop(this)' value='*' /> </td></tr>  <tr><td colspan='3'><input type= 'button' id = 'igual' onclick= 'clickaigual(this)' value='=' /> </td></tr>  </table> </div><table><thead><td>Operando 1</td><td>Operando 2</td><td>Operacion</td><td>Resultado</td><td>Eliminar</td></thead><tbody id= 'cuerpolistadeop'></tbody></table><script src='https://code.jquery.com/jquery-3.5.1.js' integrity='sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=' crossorigin='anonymous'></script><script> " + imprimirenpantalla() + alpresionarop() + alpresionarigual() + cargardatosdelusuario() + cargarlistadeop() + "</script></body></html>"

}
function cargardatosdelusuario() {

    return "function cargar(){document.getElementById('espacioparausuario').innerHTML = JSON.parse(localStorage.getItem('Usuariolog')).nombre + ' ' + JSON.parse(localStorage.getItem('Usuariolog')).apellidos}"

}
function imprimirenpantalla() {
    return "function clickalnumero(boton){ var pantalla = document.getElementById('pantalla'); var persona = new Object(); persona.teclaid=boton.id;var tabla;$.ajax({url: 'api/leertecla',type: 'POST',dataType: 'json',data: persona,success: function (data, textStatus, xhr) { pantalla.value = pantalla.value + data;},error: function (xhr, textStatus, errorThrown) {alert(xhr);}});  }";
}

exports.registrapersona = function (req, res) {

    
    Item.create({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        imagen: req.body.imagen,
        direccion: req.body.direccion,
        celular: req.body.celular,
        edad: req.body.edad,
        alergias: req.body.alergias,
        tamanno: req.body.tamanno,
        peluches: req.body.peluches


    }, function (err, persona) {
        if (err) {
            res.send(err);
        }
        else {
            // Obtine y devuelve todas las personas tras crear una de ellas
            Item.find(function (err, persona) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(persona);

                }
            });



        }
    });

}

exports.login = function (req, res) {

    var nombredelapeticion = req.body.nombre;
    var personaencontrada = new Object();
    personaencontrada.nombre = "Error";
    var bandera = false;
    for (var ele in listadepersonas) {
        if (listadepersonas[ele].nombre == nombredelapeticion) {
            bandera = true;
            personaencontrada = listadepersonas[ele];
            break;

        }
    }
    if (bandera) {
        res.json(personaencontrada);
    }
    else {
        res.json(personaencontrada);
    }


}

exports.getUI = function (req, res) {

    res.send(buildUI());

}

exports.reemplazapersonas = function (req, res) {

    Item.update({ _id: req.body.id }, {
        $set: {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            imagen: req.body.imagen,
            direccion: req.body.direccion,
            celular: req.body.celular,
            edad: req.body.edad,
            alergias: req.body.alergias,
            tamanno: req.body.tamanno,
            peluches: req.body.peluches
        }
    }, function (err, persona) {
        if (err) {
            res.send(err);
        }
        else {
            // Obtine y devuelve todas las personas tras crear una de ellas
            Item.find(function (err, persona) {
                if (err)
                    res.send(err)
                res.json(persona);
            });
        }
    });

}


exports.modificarpersona = function (req, res) {
    Item.update({ _id: req.body.id }, {
        $set: {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            imagen: req.body.imagen,
            direccion: req.body.direccion,
            celular: req.body.celular,
            edad: req.body.edad,
            alergias: req.body.alergias,
            tamanno: req.body.tamanno
        }
    }, function (err, persona) {
        if (err) {
            res.send(err);
        }
        else {
            // Obtine y devuelve todas las personas tras crear una de ellas
            Item.find(function (err, persona) {
                if (err)
                    res.send(err)
                res.json(persona);
            });s
        }
    });
}


exports.eliminarpersona = function (req, res) {
    Item.remove({ _id: req.body.id }
        , function (err, persona) {
            if (err) {
                res.send(err);
            }
            else {
                // Obtine y devuelve todas las personas tras crear una de ellas
                Item.find(function (err, persona) {
                    if (err)
                        res.send(err)
                    res.json(persona);
                });



            }
        });
}

exports.todaslaspersonas = function (req, res) {

    Item.find(function (err, persona) {
        if (err)
            res.send(err)
        res.json(persona);
    });
}