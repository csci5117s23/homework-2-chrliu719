import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import Header from '@/components/header'
import EditableToDoItem from '@/components/editabletodoitem'
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";


export default function FullTodoItem() {
  const [info, setInfo] = useState({});

  return (
    <>
      <div className="App">
        <Header title="Task Details" redirect={"/todos"} redirectText={"Back To Todos"}></Header>
        <EditableToDoItem info={info}></EditableToDoItem>
      </div>
    </>
  )
}
