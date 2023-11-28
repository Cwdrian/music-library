import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import AlbumView from "./components/Views/AlbumView";
import ArtistView from "./components/Views/ArtistView";

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
      
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <>
            <SearchBar handleSearch={handleSearch} />
            <Gallery data={data} />
            </>
           } />
           <Route path='/album/:id' element={<AlbumView />} />
           <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
