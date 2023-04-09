import {React, useEffect, useState} from 'react'
const API_ENDPOINT = "https://homework2chrliu719-mlo5.api.codehooks.io/dev";
const API_KEY = "5fc0982e-400c-49c0-86c2-baf213de4dd0";
import { useRouter } from 'next/router'
import TextareaAutosize from 'react-textarea-autosize';

export default function EditableToDoItem({id}) {
    const [info, setInfo] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [selected, setSelected] = useState(false);
    const [dataLoaded, setLoaded] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const fetchData = async () => {
        console.log(router.query)
        //TODO, query only the user's items, should just need to add ?user=<username>
        const response = await fetch(API_ENDPOINT + "/todoItem/" + router.query["id"], {
          'method':'GET',
          'headers': {'x-apikey': API_KEY}
        })
        const data = await response.json()

        // update state with data
        console.log(data)
        setInfo(data);
        setName(data["name"]);
        setDescription(data["description"]);
        setSelected(data["completed"]);
        setLoaded(true);
      }

      if(router.isReady){
        fetchData();
      }
    }, [router.isReady]);

    const changeCompletion = async () => {
        var data = JSON.parse(JSON.stringify(info)); //copy data
        data["completed"] = !selected;
        const response = await fetch(API_ENDPOINT + "/todoItem/" + info["_id"], {
            'method':'PATCH',
            'headers': {
                'x-apikey': API_KEY,
                "Content-Type": "application/json"
            },
            'body': JSON.stringify(data)
        })
    }

    const saveTaskText = async () => {
      var data = JSON.parse(JSON.stringify(info)); //copy data
      data["name"] = name;
      data["description"] = description;
      const response = await fetch(API_ENDPOINT + "/todoItem/" + info["_id"], {
          'method':'PATCH',
          'headers': {
              'x-apikey': API_KEY,
              "Content-Type": "application/json"
          },
          'body': JSON.stringify(data)
      })

      console.log(response);
      setCanSave(false);
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
                background:((!selected && "white") || (selected && "#f06565"))
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
