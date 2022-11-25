import { useState } from "react"
import { collection, addDoc, getFirestore,serverTimestamp } from "firebase/firestore"; 

const ChatRoom = (props) =>{
    const [CurrentMessage,SetCurrentMessage] = useState("")

    const CurrentUser = null

    return(
        <>
            <section id="MessageHolder">
                {props.Error && <h1>Error</h1>}
                {props.Loading && <h1>Loading</h1>}
                {props.Value && (props.Value.docs.map((e)=>{
                    const data = e.data()
                        return(
                            <article key={data.id} className="Message">
                                <h4>{data.User}</h4>
                                <p>{data.Message}</p>
                            </article>   
                        )      
                }))}
            </section>
            <form id="MessageForm" onSubmit={(e)=>{
                e.preventDefault()
                if (CurrentMessage!="") {
                    addDoc(collection(getFirestore(),"Messages"),{
                        Message:CurrentMessage,
                        User:CurrentUser||"Guest",
                        Time:serverTimestamp()

                    })
                    console.log(CurrentMessage)
                    SetCurrentMessage("")
                }
            }}>
                <input type="text" onChange={(e)=>{SetCurrentMessage(e.target.value)}} value={CurrentMessage} placeholder="Enter Message"></input>
                <input type="submit"></input>
            </form>
        </>
    )
}

export default ChatRoom