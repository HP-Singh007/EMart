import React, { useEffect, useState } from "react";
import "../../styles/Search.css";
import { Search } from "lucide-react";

const Searchbox = ({ setKeyword, setPage, setCategory }) => {
  const [search, setSearch] = useState("");

  const searchHandler = () => {
    setKeyword(search);
    setPage(1);
    setCategory('All');
  };

  useEffect(()=>{
    if(search===''){
      setKeyword(search);
    }
  },[search])

  return (
    <div id="search">
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e)=>{if(e.key==='Enter'){searchHandler()}}}
        placeholder="Search"
      />
      <Search id="searchIcon" onClick={searchHandler} />
    </div>
  );
};

export default Searchbox;
