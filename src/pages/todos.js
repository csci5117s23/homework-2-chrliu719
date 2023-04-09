import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import ToDoBuilder from '../components/todobuilder';
import ToDoList from '../components/todolist';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";

export default function Home() {
  const [items, setItems] = useState([])
  const [listChanged, setListChanged] = useState(false); // toggled between to cause rerendering
  const [dataLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      //TODO, query only the user's items, should just need to add ?user=<username>
      const response = await fetch(API_ENDPOINT + "/todoItem" + "?completed=false", {
        'method':'GET',
        'headers': {'x-apikey': API_KEY}
      })
      const data = await response.json()
      data.sort((a, b) => {
        const d1 = Date.parse(a["createdOn"]);
        const d2 = Date.parse(b["createdOn"]);
        if(d1 <= d2) {
          return 1;
        }
        else {
          return -1;
        }
      })
      // update state with data
      console.log(data)
      setItems(data);
      setLoaded(true);
    }
    fetchData();
  }, [listChanged]);

  function toggleChange(){
    setListChanged(!listChanged);
  }

  if(!dataLoaded){
    return (
      <div className="App">
        <Header title={"My Tasks Todo"} redirect={"/done"} redirectText={"View Completed"}></Header>
      </div>
    )
  }
  else{
    return (
      <>
        <div className="App">
          <Header title={"My Tasks Todo"} redirect={"/done"} redirectText={"View Completed"}></Header>
          <ToDoList todoItems={items} onRemove={toggleChange}></ToDoList>
          <ToDoBuilder onCreate={toggleChange}></ToDoBuilder>
        </div>
      </>
    )
  }
}
