import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate() 


  const goHome = () =>{
    navigate("/home")
  }


  return (
    <div className="p-4 text-center">
      <h1 className="font-extrabold">SubastaPro</h1>
      <button
      onClick={goHome}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >Haz click aca para ir a Home</button>
    </div>
  );
}

export default App;
