const ChatHome = (props) =>{
    return(
        <nav id="RoomList">
            <button onClick={()=>{props.SetPage("Room1")}}>Room1</button>
            <button onClick={()=>{props.SetPage("Room2")}}>Room2</button>
            <button onClick={()=>{props.SetPage("Room3")}}>Room3</button>
        </nav>
    )
}

export default ChatHome