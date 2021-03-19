import defaultError from "../controllers/defaultError";
import jwt from 'jsonwebtoken';

let isActive = 1;

export default async function(req, res, next){
    let messages = []
    try{
        if(!req.headers.authorization) throw new Error(`Headers sem authorization!`)
        if(req.headers.authorization.split(" ").length !== 2) throw new Error(`Header authorization é inválido. O formato deve ser Bearer [token].`)

        const [bearer, token] = req.headers.authorization.split(" ");
        if(bearer !== "Bearer") throw new Error(`Header authorization é inválido. O formato deve ser Bearer [token].`);

        const decodedToken = (jwt.verify(token, process.env.SECRET));

        res.locals.user = {_id: decodedToken._id, name: decodedToken.name}
                
        next();
    }catch(e){
        defaultError({res, e, messages})
    }
}