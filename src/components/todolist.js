import {React} from 'react'
import ToDoItem from './todoitem';

export default function ToDoList({questions}) {

    return <ul className='card-list'>
        {questions.map(question => (
            <li className='card-li'> 
                <ToDoItem info={question}></ToDoItem>
            </li>
        ))}
    </ul>
    
}
