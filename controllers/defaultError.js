export default function defaultError(options = {}){
    const { res, messages, e } = options;
    
    res.json({success: false, status: false, messages: [e.message], error: e.stack ? e.stack : ''})
}