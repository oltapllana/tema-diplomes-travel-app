import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import Search from "../assets/Search";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default function SearchDestinationInput() {
  const [query, setQuery] = useState("");
  const { setResults } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("response was not ok");
      }
      const data = await response.json();
      setResults(data);
      navigate("/search-results");
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div className="travel-search-wrapper">
      <input
        type="text"
        className="travel-search"
        placeholder="Kërkoni destinacionin tuaj..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        <Search />
        Kërko
      </button>
    </div>
  );
}
