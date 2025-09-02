import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-blue-600">React + Tailwind + Express</h1>
      <p>{data ? data.message : "Cargando..."}</p>
    </div>
  );
}

export default App;
