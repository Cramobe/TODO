

const fs = require('fs');



let listadorPorHacer = [];

const guardarDB = ( ) => {

    let data = JSON.stringify(listadorPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {

        if (err) throw new Error("No se pudo guardar la tarea")
        else
            return console.log('Lista de Tareas actualizadas');
    });
}

const cargarDB = () => {

    try {        
        listadorPorHacer = require('../db/data.json');
        
    } catch (error) {
        listadorPorHacer = [];        
    }    
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadorPorHacer.push( porHacer );

    guardarDB();

    return porHacer;
}


const getListado = () => {
    cargarDB();
    return listadorPorHacer;
}

const actualizar = (descripcion, completado ) => {
    
    cargarDB();

    let index = listadorPorHacer.findIndex( tarea => {
        return tarea.descripcion === descripcion
    });

    if(index >= 0 ){
        listadorPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadorPorHacer.findIndex( tarea => {
        return tarea.descripcion === descripcion
    });

    if(index >= 0 ){
        listadoPorHacer = listadorPorHacer.splice(index,1);
        guardarDB();
        return true;
    }else{
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}