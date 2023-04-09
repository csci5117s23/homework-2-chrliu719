import Link from 'next/link';
import {React, useState} from 'react'
// require('purecss')
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";

export default function ToDoItem({info, onRemove}) {
    const [selected, setSelected] = useState(false);

    const removeItem = async () => {
        var data = JSON.parse(JSON.stringify(info)); //copy data
        data["completed"] = true
        const response = await fetch(API_ENDPOINT + "/todoItem/" + info["_id"], {
            'method':'PATCH',
            'headers': {
                'x-apikey': API_KEY,
                "Content-Type": "application/json"
            },
            'body': JSON.stringify(data)
        })
        onRemove(); 
    }

    function handleRemove(e){
        setSelected(true);
        setTimeout(() => setSelected(false), 200);
        setTimeout(() => {
            e.target.checked = false;
        }, 400);

        removeItem() 
    }

    const completeButton = (
        <>
            {/* Methods used to create color transition on button click found at https://blog.openreplay.com/mastering-css-transitions-with-react-18/ */}
            <div className='item-check' onClick={handleRemove} style={{
                height:"3px", width:"3px", borderRadius:"50%", border:"0.1em double red", aspectRatio:"1/1", 
                background:((!selected && "white") || (selected && "#f06565"))
            }}></div>
        </>
    );
    
    if(info["completed"]){
        return (
            <div className="completed_item" style={{backgroundColor:"#ebe6e6"}}>
                {info["name"]}
            </div>
        )
    }
    else { 
        return (
            <>
                {completeButton}
                <Link href={"/todo/" + info["_id"]} className="link" style={{width:"100%"}}>
                    <div style={{backgroundColor:"#ebe6e6"}} className='link'>
                        {info["name"]}
                    </div>
                </Link>
                
            </>
        )
    }
    
}
