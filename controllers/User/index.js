import User from '../../model/User/User';

const UserController = {}

//FindAll
UserController.findAll = async function(req, res){
    const users = await User.find({});

    users.forEach( u => u.export());

    res.json({success: true, users});
}


//FindOne
UserController.findOne = async function(req, res){
    const user = await User.findOne({_id: req.params.id});

    res.json({success: true, user: user.export()});
}


//Create
UserController.create = async function(req, res){
    let messages = [];
    try{
        const user = new User(req.body);
        
        await user.save();
        messages.push('Usuário criado com sucesso!')

        res.json({success: true, user: user.export(), messages});
    }catch(e){
        res.json({success: false, status: false, messages: [e.message]})
    }
}


//Update user
UserController.update = async function(req, res){
    let messages = []
    try{
        if(!req.params.id) throw new Error(`Requisição inválida. O ID precisa estar presente nos parâmetros.`)
        const user = await User.findById(req.params.id);
        if(!user) throw new Error(`Usuário não encontrado!`)

        //WhiteList de atributos editáveis do Usuário.
        let wasModified = false;
        ['name', 'password', 'tags', 'active', 'confirmed', 'profile']
        .map( atributo => {
            if(req.body[atributo] && user[atributo] !== req.body[atributo]){
                wasModified = true;
                user[atributo] = req.body[atributo];
            }
        }) 

        if(wasModified){ 
            await user.save() 
            messages.push("As alterações foram realizadas com sucesso.")
        }else{
            messages.push("Nenhuma modificação foi realizada.")
        }
        
        res.json({success: true, user: user.export(), messages: [...messages]})
    }catch(e){
        res.json({success: false, status: false, messages: [e.message]})
    }
}


//Remove user
UserController.remove = async function(req, res){
    let messages = []
    try{
        if(!req.params.id) throw new Error(`Requisição inválida. O ID precisa estar presente nos parâmetros.`)
        const user = await User.findById(req.params.id);
        if(!user) throw new Error(`Usuário não encontrado!`)

        await user.remove();
        messages.push('Usuário removido com sucesso!');
        
        res.json({success: true, user: user.export(), messages: [...messages]})
    }catch(e){
        res.json({success: false, status: false, messages: [e.message]})
    }
}

export default UserController