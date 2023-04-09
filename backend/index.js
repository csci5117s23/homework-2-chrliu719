
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
})

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

app.get("/test", (req, res) => {
  res.json({result: "you did it!"});
});

// Use Crudlify to create a REST API for any collection
// crudlify(app)
crudlify(app, {todoItem: todoItemYup})

// bind to serverless runtime
export default app.init();
