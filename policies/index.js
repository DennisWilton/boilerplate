import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const modulesToExport = {}

const normalizedPath = path.join(__dirname);
fs.readdirSync(normalizedPath)
  .forEach( function(file){
      if(file !== 'index.js'){
          const filename = file.split(".").slice(0,-1).join(".");

          modulesToExport[filename] = require('./'+file).default;
      }
  } )



export default modulesToExport;