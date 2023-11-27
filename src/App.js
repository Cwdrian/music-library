import { useEffect, useState } from "react";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";

function App() {
  let [search, setSearch] = useState("");
  let [message, setMessage] = useState("search for music");
  let [data, setData] = useState([]);

  //const API_URL = "https://itunes.apple.com/search?term=";

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        const uri = encodeURI(`https://itunes.apple.com/search?term=${search}`);
        const response = await fetch(uri);
        const resData = await response.json();
        console.log(resData);
        if (resData.results.length > 0) {
          setData(resData.results);
        } else {
          setMessage("not Found");
        }
      };
      fetchData();
    }
  }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term);
  };

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      <Gallery data={data} />
    </div>
  );
}

export default App;
