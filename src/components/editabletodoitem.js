import {React, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth } from '@clerk/nextjs';

const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";

export default function EditableToDoItem({info}) {
    const [data, setData] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [selected, setSelected] = useState(false);
    const [dataLoaded, setLoaded] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const { isLoaded, userId, sessionId, getToken} = useAuth();
    const router = useRouter();

    useEffect(() => {
      router.events.on('routeChangeStart', changeCompletion);
      window.addEventListener("beforeunload", changeCompletion);
  
      const fetchData = async () => {
        if(userId){
          const token = await getToken({ template: "codehooks" });
          const response = await fetch(API_ENDPOINT + "/todoItem/" + router.query["id"] + "?user=" + userId, {
            'method':'GET',
            'headers': {'Authorization': 'Bearer ' + token}
          })
          const data = await response.json()
  
          // update state with data
          setData(data);
          setName(data["name"]);
          setDescription(data["description"]);
          setSelected(data["completed"]);
          setLoaded(true);
        } 
      }
  
      if(router.isReady){
        fetchData();
      }
  
      return () => {
        router.events.off('routeChangeStart', changeCompletion);
        window.removeEventListener("beforeunload", changeCompletion);
      }
    }, [router.isReady]);
  
    const changeCompletion = async () => {
      if(userId){
        const token = await getToken({ template: "codehooks" });
        var data = JSON.parse(JSON.stringify(info)); //copy data
        data["completed"] = !selected;
        const response = await fetch(API_ENDPOINT + "/todoItem/" + info["_id"] + "?user=" + userId, {
            'method':'PATCH',
            'headers': {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            'body': JSON.stringify(data)
        })
      }
    }

    const saveTaskText = async () => {
      if(userId){
        const token = await getToken({ template: "codehooks" }); 
        var data = JSON.parse(JSON.stringify(info)); //copy data
        data["name"] = name;
        data["description"] = description;
        const response = await fetch(API_ENDPOINT + "/todoItem/" + info["_id"] + "?user=" + userId, {
            'method':'PATCH',
            'headers': {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            'body': JSON.stringify(data)
        })
        console.log("saved");
        setCanSave(false);
      }
    }

    function handleCheck(e){
      changeCompletion();
      setSelected(!selected);
    }

    const completeButton = (
        <>
            {/* Methods used to create color transition on button click found at https://blog.openreplay.com/mastering-css-transitions-with-react-18/ */}
            <div className='item-check' onClick={handleCheck} style={{
                height:"0.3vh", width:"0.3vh", borderRadius:"50%", border:"0.1em double red", aspectRatio:"1/1", 
                background:((!selected && "white") || (selected && "#f06565")), marginRight:"0.7vh"
            }}></div>
        </>
    );

    if(!dataLoaded){
      return;
    }
    else {
      return (
        <>
            <div className='editable-item' style={{display:"flex", alignItems:"center"}}>
              {completeButton}
              <div className='edit_box' style={{width:"100%"}}>
                <div>
                  <TextareaAutosize name="nameInput" id="nameInput" className='name_edit' placeholder="Name" value={name} onChange={e => 
                          {
                              setName(e.target.value);
                              if(/\S/.test(e.target.value)){
                                setCanSave(true);
                              }
                              else{
                                setCanSave(false);
                              }
                          }
                      }
                    />
                </div>
                <div>
                  <TextareaAutosize textarea name="descriptionInput" id="descriptionInput" className='description_edit' placeholder="Description" value={description} 
                    onChange={e => 
                      {
                        setDescription(e.target.value);
                        if(/\S/.test(name)){
                          setCanSave(true);
                        }
                      }
                    }/>
                </div>
                <button className='create_button' onClick={saveTaskText} disabled={!canSave} >
                    <div>
                        Save Changes
                    </div>
                </button>
               </div>
            </div>
        </>
    )
    }
}
