import {React} from 'react'
import ToDoItem from './todoitem';

export default function ToDoList({todoItems, onRemove}) {
    
    return <ul className='card-list'>
        {todoItems.map(item => (
            <li className='card-li'> 
                <ToDoItem info={item} onRemove={onRemove}></ToDoItem>
            </li>
        ))}
    </ul>
    
}
