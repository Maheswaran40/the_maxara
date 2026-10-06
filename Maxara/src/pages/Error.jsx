import { useNavigate } from "react-router-dom"

function Error() {
    let navigate = useNavigate()
  return (
    <div>
        <h1>page not found</h1>
        <button onClick={()=>navigate("/")}>Home</button>
    </div>
  )
}

export default Error