import {React, useState} from 'react'

const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";

export default function ToDoBuilder({onAdd}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [opened, setOpened] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    const submitNewItem = async () => {
        //TODO: CHANGE USER TO RIGHT USER
        const data = {"name": name, "description": description, "user": "dev"};
        const response = await fetch(API_ENDPOINT + "/todoItem", {
            'method':'POST',
            'headers': {
                'x-apikey': API_KEY,
                "Content-Type": "application/json"
            },
            'body': JSON.stringify(data)
        })
        const resp = await response.json()
        console.log("Response is:");
        console.log(resp);
    }
    

    function createTodoItem(){
        submitNewItem();
        setName("");
        setDescription("");
        setOpened(false);
    }

    function changeOpened(){
        setOpened(!opened);
        setName("");
        setDescription("");
    }

    if(!opened){
        return (
            <button className='add_task_button' onClick={changeOpened}>
                <div>
                Add Task
                </div>
            </button>
        )
    }
    else{
        return (
            <div className='builder_box' style={{width:"100%", textAlign:"center"}}>
                <div>
                    <input name="frontInput" className='input_item' placeholder="Name" value={name} onChange={e => 
                        {
                            setName(e.target.value);
                            if(e.target.value != ""){
                                setCanSubmit(true);
                            }
                        }
                    }
                    /><br></br>
                    <input name="frontInput" className='input_item' placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/><br></br>
                </div>
                <button className='cancel_button' onClick={changeOpened}>
                    <div>
                        Cancel
                    </div>
                </button>
                <button className='create_button' onClick={createTodoItem} disabled={!canSubmit}>
                    <div>
                        Add Todo Item
                    </div>
                </button>
            </div>
        );
    }
}
