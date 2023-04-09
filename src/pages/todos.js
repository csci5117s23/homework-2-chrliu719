import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import ToDoBuilder from '../components/todobuilder';
import ToDoList from '../components/todolist';

const inter = Inter({ subsets: ['latin'] });
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";

export default function Home() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      //TODO, query only the user's items, should just need to add ?user=<username>
      const response = await fetch(API_ENDPOINT + "/todoItem", {
        'method':'GET',
        'headers': {'x-apikey': API_KEY}
      })
      const data = await response.json()
      // update state with data
      setItems(data);
    }
    fetchData();
  })


  return (
    <>
      <div className="App">
        <ToDoList questions={items}></ToDoList>
        <ToDoBuilder></ToDoBuilder>
      </div>
    </>
  )
}
