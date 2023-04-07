import {React} from 'react'
import ToDoItem from './todoitem';

export default function ToDoList({questions, onRemove}) {

    return <ul className='card-list'>
        {questions.map(question => (
            <li className='card-li'> 
                <ToDoItem front={question["front"]} back={question["back"]} id={question["id"]} onRemove={onRemove}></ToDoItem>
            </li>
        ))}
    </ul>
    
}
