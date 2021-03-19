import _ from 'lodash';
import mongoose, {Schema} from 'mongoose';

const modelName     = `User`,
      schemaOptions = {},
      schema        = new Schema({ 
        
        name:           {type: String, required: true}
      , email:          {type: String, required: true, unique: true}
      , cpf:            {type: String, required: true, unique: true}
      , password:       {type: String, required: true}
      , tags:           {type: [String], default: ['member']}
      , active:         {type: Boolean, default: true}
      , confirmed:      {type: Boolean, default: true}
      , profile:        {type: String, default: 'default.jpg'}
      , lastModified:   {type: mongoose.SchemaTypes.Date}
      , createdAt:      {type: mongoose.SchemaTypes.Date}
        
      }, schemaOptions);

schema.pre('save', function(){
  this.lastModified = new Date();
  if(!this.createdAt) this.createdAt = new Date();
})

schema.methods.export = function(){
  const user = this;
  ['__v'].forEach( att => { user[att] = undefined })
  user['password'] = 'secreto';
  return user;
}

schema.methods.verifyPassword = function(password){
  return this.password === password;
}
export default mongoose.model(modelName, schema);