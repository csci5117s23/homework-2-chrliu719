import Link from 'next/link';
import {React, useState} from 'react'
import { useAuth } from '@clerk/nextjs';

const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";

export default function ToDoItem({info, onRemove}) {
    const [selected, setSelected] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { isLoaded, userId, sessionId, getToken} = useAuth();

    const removeItem = async () => {
        if(userId){
            const token = await getToken({ template: "codehooks" });
            var data = JSON.parse(JSON.stringify(info)); //copy data
            data["completed"] = true
            const response = await fetch(API_ENDPOINT + "/todoItem/" + info["_id"], {
                'method':'PATCH',
                'headers': {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json"
                },
                'body': JSON.stringify(data)
            })
            onRemove(info["_id"]); 
        }
    }

    function handleRemove(e){
        if(disabled){
            return;
        }
        setSelected(true);
        setDisabled(true);
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
