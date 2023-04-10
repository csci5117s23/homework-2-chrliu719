import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import ToDoBuilder from '../components/todobuilder';
import ToDoList from '../components/todolist';
import Header from '@/components/header';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router'
import jwtDecode from "jwt-decode";
import jwtEncode from "jwt-encode";
const inter = Inter({ subsets: ['latin'] });
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";

export default function Home() {
  const [items, setItems] = useState([])
  const [listChanged, setListChanged] = useState(false); // toggled between to cause rerendering
  const [dataLoaded, setLoaded] = useState(false);
  const { isLoaded, userId, sessionId, getToken} = useAuth();
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      //TODO, query only the user's items, should just need to add ?user=<username>
      if (isLoaded && userId) { 
        const token = await getToken({ template: "codehooks" });
        const response = await fetch(API_ENDPOINT + "/todoItem" + "?completed=false" + "&user=" + userId, {
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
        setLoaded(true);
      }
    }
    fetchData();
  }, []);

  function addItem(newItem){
    console.log("Added");
    setItems([newItem].concat(items));
  }

  function removeItem(id){
    console.log("Removed");
    setItems(items.filter(item => item["_id"] != id));
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
          <ToDoList todoItems={items} onRemove={removeItem}></ToDoList>
          <ToDoBuilder onCreate={addItem}></ToDoBuilder>
        </div>
      </>
    )
  }
}
