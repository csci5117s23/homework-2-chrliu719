import {React, useState} from 'react'
// require('purecss')

export default function ToDoItem({front, back, id, onRemove}) {
    const [cardFront, setCardFront] = useState(true);
    const [selected, setSelected] = useState(false);
    function changeSide(){
        setCardFront(!cardFront);
        console.log("id: " + id)
    }

    function handleRemove(e){
        setSelected(true);
        setTimeout(() => setSelected(false), 200);
        setTimeout(() => {
            onRemove(id);
            e.target.checked = false;
        }, 400);
    }

    var card;
    if(cardFront){
        card = (
        <div onClick={changeSide} style={{backgroundColor:"#ebe6e6"}}>
            {front}
        </div>
        );
    }
    else {
        card = (
        <div onClick={changeSide} style={{backgroundColor:"#c4bebe"}}>
            {back}
        </div>    
        );
    } 

    return (
        <>
            <div className='item-check' onClick={handleRemove} style={{
                height:"3px", width:"3px", borderRadius:"50%", border:"0.1em double red", aspectRatio:"1/1", 
                background:((!selected && "white") || (selected && "#f06565"))
            }}></div>
            {card}
        </> 
    );
}
