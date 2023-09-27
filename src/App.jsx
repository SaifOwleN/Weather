import { useState, useEffect } from "react";
import Data from "./Services/Ahmed";
import Content from "./Components/Content";
import {BsSearch} from 'react-icons/bs'

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState("");
  const [Show, setShow] = useState(false)

  useEffect(() => {
    Data.getAll().then((R) => setCountries(R));
  }, []);

  const Filter = (e) => {
    setSearch(e.target.value);
    const filteredData = countries.filter((c) => {
      return c.name.common.toLowerCase().includes(search.toLowerCase());
    });
    setCountry(filteredData);
  };

  return (
    <div className='flex w-screen h-screen justify-center items-center  bg-blue-950 selection:bg-pink-200'>
      <div className='w-1/4 rounded-lg text-black bg-white overflow-scroll p-4 min-w-fit shadow-2xl'>
        {!Show && <span className="flex justify-end m-2 "><button onClick={()=>setShow(!Show)} className="border-2 rounded-full p-2"><BsSearch/></button></span>}
        <div className='flex px-9 justify-center'>
          {Show && <input
            className=' w-60 h-10 my-2 p-2 border-2 rounded-full focus:border-blue-400 border-rose-800 text-black'
            value={search}
            onChange={Filter}
            on={()=>setShow(!Show)}
            placeholder="Enter Your Location"
          />}
        </div>
        <Content country={country} setCountry={setCountry} />
      </div>
    </div>
  );
}

export default App;
