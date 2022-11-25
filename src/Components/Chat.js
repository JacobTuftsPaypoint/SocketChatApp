import { useState } from "react"
import BackButton from "./BackButton"
import ChatHome from "./ChatHome"
import ChatRoom from "./ChatRoom"
import User from "./User"

import "../Styles/Global.css"

import { getFirestore, collection, orderBy,query,limit} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

const Chat = () =>{
    const [Page,SetPage] = useState("Home")

    const [Value,Loading,Error] = useCollection(query(collection(getFirestore(),"/Messages"),orderBy("Time", "desc"),limit(100)))

    return(
        <div id="myroot">
            <header id="ChatHeader">
                {Page!=="Home"?<BackButton SetPage={SetPage}/>:<p></p>}
                <h1>{Page}</h1>
                <User/>
            </header>
            
            {Page === "Home" ? <ChatHome SetPage={SetPage}/> : <ChatRoom Room={Page} Value={Value} Loading={Loading} Error={Error}/>}
            
        </div>
    )
    
}

export default Chat