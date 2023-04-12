
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';
import jwtDecode from 'jwt-decode';

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

app.use('/todoItem', (req, res, next) => {
  if(req.method === "POST" ){
    req.body.user = req.user_token.sub
  }
  else if (req.method === "GET") {
    req.query.user = req.user_token.sub;
    console.log(req.query);
  }
  next();
})

app.use('/todoItem/:id', async (req, res, next) => {
  const id = req.params.ID;
  const userId = req.user_token.sub;

  const conn = await Datastore.open();
  try {
    const doc = await conn.getOne("todoItem", id);
    console.log(doc);
    console.log(userId);
    // Check if user owns requested document
    if(doc.user != userId){
      res.status(403).end();
      return;
    }
  }
  catch (e) {
    res.status(404).end(e);
    return;
  }

  next();
})

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready');
});

// Use Crudlify to create a REST API for any collection
// crudlify(app)
crudlify(app, {todoItem: todoItemYup})

// bind to serverless runtime
export default app.init();
