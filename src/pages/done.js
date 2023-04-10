import { useState, useEffect } from 'react';
import Header from '../components/header';
import ToDoList from '../components/todolist';
import { useAuth } from '@clerk/nextjs';

const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";

export default function Done() {
  const [items, setItems] = useState([]);
  const { isLoaded, userId, sessionId, getToken} = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      if(userId){
        const token = await getToken({ template: "codehooks" });
        //TODO, query only the user's items, should just need to add ?user=<username>
        const response = await fetch(API_ENDPOINT + "/todoItem" + "?completed=true" + "&user=" + userId, {
          'method':'GET',
          'headers': {'Authorization': 'Bearer ' + token}
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
        setItems(data);
      }
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
