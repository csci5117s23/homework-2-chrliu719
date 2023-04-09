import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import Header from '../components/header';
import ToDoList from '../components/todolist';

const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";

export default function Done() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      //TODO, query only the user's items, should just need to add ?user=<username>
      const response = await fetch(API_ENDPOINT + "/todoItem" + "?completed=true", {
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
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <Header title={"Completed Tasks"} redirect={"/todos"} redirectText={"Back To Todos"}></Header>
        <ToDoList todoItems={items}></ToDoList>
      </div>
    </>
  )
}
