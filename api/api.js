import Express, { Router } from 'express';
import cors from 'cors';

// Controllers
import UserController from '../controllers/User';
import AuthController from '../controllers/Auth';

// Policies
import policies from '../policies';



const App = Router();

// Global API Middlewares

App.use(Express.json())
App.use(Express.urlencoded({extended: true}))
App.use(cors()) //Modificar e permitir apenas as urls confiáveis.


// Routes

App.get('/users', UserController.findAll)
App.get('/users/:id', UserController.findOne)
App.post('/users', policies['isAuthenticated'] , UserController.create)
App.put('/users/:id', policies['isAuthenticated'] , UserController.update)
App.delete('/users/:id', policies['isAuthenticated'] , UserController.remove)


App.post('/register', AuthController.register)
App.post('/login', AuthController.login)
App.post('/refreshToken', policies['isAuthenticated'], AuthController.refreshToken)





export default App;