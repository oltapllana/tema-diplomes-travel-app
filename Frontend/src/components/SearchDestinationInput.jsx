import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";

export default function SearchDestinationInput() {
  const [query, setQuery] = useState("");
  const { setResults } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/search?q=${encodeURIComponent(query)}`
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
        placeholder="Search your next destination..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
