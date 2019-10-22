const User = require('../models/User');

module.exports = {
    async store(req, res) {    
        const { email } = req.body;
        
        // let user = await User.findOne({ email : email });
        let user = await User.findOne({ email });
        
        if(!user && !isEmpty(email)) {
            user = await User.create({ email });
        }
        
        return res.json(user);
    }
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

//index, show, store, update, destroy
//index -> lista de sessao
//show -> lista uma unica sessao
//store -> criar uma sessao
//update -> atualizar sessao
//destroy -> deletar sessao
