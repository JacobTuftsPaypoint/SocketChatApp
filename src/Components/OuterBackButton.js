import { NavLink } from "react-router-dom"
import Main from "./MainPage/Main"

const OuterBackButton = (props) =>{
    return(
        <NavLink to="/" id="BackButton">Go Home</NavLink>
    )
}

export default OuterBackButton