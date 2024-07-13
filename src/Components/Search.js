import React from "react";

const Search = ({Search, setSearch}) => {
    return (
        <form className="Searchform" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">search</label>
            <input
                type="text"
                id="search"
                role="searchbox"
                placeholder="Search Items"
                value={Search}
                onChange={(e)=>setSearch(e.target.value)}
            />

        </form>
    )
}

export default Search