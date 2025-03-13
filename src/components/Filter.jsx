import { useState } from "react";

function Filter({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-6 text-center">
      <input
        type="text"
        placeholder="Qidirish..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-3 w-1/2 rounded-md border border-gray-700 bg-gray-800 text-white 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default Filter;
