import User from '../../model/User/User';
import UserController from '../User';
import jwt from 'jsonwebtoken';
import defaultError from '../defaultError';

const Controller = {}


Controller.register = async function(req, res){
    let resposta;
    const _res = {
        json: function(res){
            resposta = res;
        }
    }
    await UserController.create(req, _res);
    

    res.json({...resposta, messages: [...resposta.messages, 'This is from Auth Controller.']});
}


Controller.login = async function(req, res){
    let messages = [];
    try{
        if(!req.body || !req.body.username || !req.body.password) throw new Error(`Parâmetros inválidos. É necessário informar Usuário e Senha!`)

        let user;
        switch(req.body.method){
            default:
            user = await User.findOne({cpf: req.body.username});
        }

        if(!user) throw new Error(`Dados inválidos`);
        if(!user.verifyPassword || !user.verifyPassword(req.body.password)) throw new Error("Dados inválidos");

        const token = jwt.sign({_id: user._id, name: user.name}, process.env['SECRET'], {
            expiresIn: '15m'
        })

        res.json({success: true, status: true, token, user: user.export()})
    }catch(e){
        res.json({success: false, status: false, messages: [e.message], error: e.stack ? e.stack : ''})
    }
}

Controller.refreshToken = async function(req, res){
    let messages = [];
    try{
        if(!res.locals.user) throw new Error(`res.locals.user não definido: usuário autenticado incorretamente.`);

        const newToken = jwt.sign(res.locals.user, process.env.SECRET, { expiresIn: '15m' });
        
        res.json({success: true, status: true, token: newToken, messages: messages})
    }catch(e){
       defaultError({e, messages, res})
    }
}

export default Controller;