import React from 'react'

const SearchBar = ({ searchTerm, setSearchTerm, suggestions, onSearchClick, onResetClick }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-7 gap-3 relative">
            <div className="flex gap-2">
                <input
                    type="search"
                    className="input placeholder:text-gray-400 border border-gray-300 outline-none focus:outline-none
                            shadow-blue-400 hover:shadow-md transition-all duration-300 w-64 p-2 rounded text-center"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={onSearchClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Search
                </button>
                <button
                    onClick={onResetClick}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
                    Clear
                </button>
            </div>
            {/* Suggestions dropdown */}
            {suggestions && suggestions.length  > 0 && (
                <ul className="absolute top-16 bg-white border border-gray-200 rounded shadow-md w-64 max-h-48 overflow-y-auto z-10">
                    {suggestions.map((s, index) => (
                        <li
                            key={index}
                            onClick={() => setSearchTerm(s.schemeName)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {s.schemeName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default SearchBar
