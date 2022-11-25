const BackButton = (props) =>{
    return(
        <button onClick={()=>{props.SetPage("Home")}} id="BackButton">Go Back</button>
    )
}

export default BackButton