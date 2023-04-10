
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';

const todoItemYup = object({
  name: string().required(),
  description: string(),
  category: string(),
  user: string().required(),
  completed: boolean().default(false),
  createdOn: date().default(() => new Date()),
});

// Taken from Kluver's exmaple repo
const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready');
});

// Use Crudlify to create a REST API for any collection
// crudlify(app)
crudlify(app, {todoItem: todoItemYup})

// bind to serverless runtime
export default app.init();
