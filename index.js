import {app, io} from './server';
import api from './api/api';

//Routes
app.use('/api', api);