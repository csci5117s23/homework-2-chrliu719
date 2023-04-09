import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import Header from '@/components/header'
import EditableToDoItem from '@/components/editabletodoitem'

const inter = Inter({ subsets: ['latin'] });
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";

export default function FullTodoItem() {
  
  return (
    <>
      <div className="App">
        <Header title="Task Details" redirect={"/todos"} redirectText={"Back To Todos"}></Header>
        <EditableToDoItem></EditableToDoItem>
      </div>
    </>
  )
}
