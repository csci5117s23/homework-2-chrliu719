import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import Header from '@/components/header'
import EditableToDoItem from '@/components/editabletodoitem'

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
