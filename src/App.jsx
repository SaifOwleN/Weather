import { useState, useEffect } from "react";
import Data from "./Services/Ahmed";
import Content from "./Components/Content";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);

  const [search, setSearch] = useState("");

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
    <div className='flex  w-screen h-screen justify-center items-center bg-gradient-to-r from-violet-500 to-fuchsia-500 selection:bg-pink-200'>
      <div className='w-1/4 h-3/5 rounded-lg border-2 border-black text-white bg-slate-400 overflow-scroll p-4 min-w-fit'>
        <div className='flex px-9 pb-5 justify-center'>
          <input
            className=' w-60 h-10 p-2 border-2 rounded-full focus:border-blue-400 border-rose-800 text-black'
            value={search}
            onChange={Filter}
            placeholder="Search"
          />
        </div>
        <Content country={country} setCountry={setCountry} />
      </div>
    </div>
  );
}

export default App;
