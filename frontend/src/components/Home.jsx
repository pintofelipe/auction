import { useState } from "react";

function Home() {
  const [result, setResult] = useState(null);


const showNumber = ()=>{

  setResult(77);

}

  return (
    <>
      <header className="flex justify-center underline hover:cursor-pointer mb-10">
        <p className="text-8xl">Auction</p>
      </header>
      <div className="grid-cols-2 grid container mx-auto">
        <h1 className="font-semibold bg-green-700 flex justify-center items-center text-9xl">
          {result}
        </h1>
        <h1 className="flex justify-center text-9xl font-medium bg-purple-700">
          {result}
        </h1>

        <button
        onClick={showNumber}
         className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600 hover:cursor-pointer mr-8"
        >⚠️ Si quieres ver un # maravilloso haz clik aqui. ⚠️</button>

        <button
          onClick={() => window.history.back()}
          className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600 hover:cursor-pointer"
        >
          Atrás
        </button>
      </div>
    </>
  );
}

export default Home;
