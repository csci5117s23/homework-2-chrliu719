import {React, useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";

export default function ToDoBuilder({onCreate}) {
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
        onCreate();
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
                    <TextareaAutosize name="nameInput" className='input_name' placeholder="Name" value={name} onChange={e => 
                        {
                            setName(e.target.value);

                            // check to make sure there is a non-whitespace character
                            // Regex from https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
                            if(/\S/.test(e.target.value)){
                                setCanSubmit(true);
                            }
                            else{
                                setCanSubmit(false);
                            }
                        }
                    }
                    />
                    <TextareaAutosize name="descriptionInput" className='input_desc' placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/><br></br>
                </div>
                <button className='default_button' onClick={changeOpened}>
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
