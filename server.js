import express from 'express';
import socket  from 'socket.io';
import {Server} from 'http';
import mongoose from 'mongoose';

//Mongoose plugins
import autoPopulate from 'mongoose-autopopulate';
import uniqueValidator from 'mongoose-unique-validator';
require('dotenv').config();

try{
    mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}catch(e){
    console.error("Falha ao conectar ao banco de dados.")
    throw(e);
}

//Inicializa a aplicação:
export const app = express();

//Configurações da aplicação:
app.use(require('morgan')('dev'));

//Configurações do mongoose:
mongoose.plugin(autoPopulate);
mongoose.plugin(uniqueValidator)

export const server = Server(app);
export const io  = socket(server);

app.sayHello = function(cb, ms = 1000){
    return new Promise(res => setTimeout(() => { cb(); res() }, ms))
}

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on ${process.env.PORT || 3000}.`)
})

export default {app, server, io};