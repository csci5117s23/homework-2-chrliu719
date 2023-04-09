
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

app.get("/getItems", async (req, res) => {
  // console.log(req);
  // var completed = false;
  // if(req.query["completed"]){
  //   completed = req.query["completed"]
  // }
  // const response = await fetch(API_ENDPOINT + "/todoItem" + "?completed=" + completed, {
  //   'method':'GET',
  //   'headers': {'x-apikey': API_KEY}
  // })
  // const data = await response.json()
  // // update state with data
  // console.log(data)
  // setItems(data);
  // setLoaded(true);
  // fetchData();  
  // res.send('got request')
});

// Use Crudlify to create a REST API for any collection
// crudlify(app)
crudlify(app, {todoItem: todoItemYup})

// bind to serverless runtime
export default app.init();
