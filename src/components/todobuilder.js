import {React, useState} from 'react'

export default function ToDoBuilder({onAdd}) {
    const [frontInput, setFrontInput] = useState("");
    const [backInput, setBackInput] = useState("");

    function createFlashcard(){
        onAdd(frontInput, backInput);
        setFrontInput("");
        setBackInput("");
    }

    return (
        <div style={{width:"75%", textAlign:"center"}}>
            <input name="frontInput" placeholder="Front" value={frontInput} onChange={e => setFrontInput(e.target.value)}/><br></br>
            <input name="frontInput" placeholder="Back" value={backInput} onChange={e => setBackInput(e.target.value)}/><br></br>
            <button type="submit" onClick={createFlashcard}>Create Flashcard</button>
        </div>
    );
}
