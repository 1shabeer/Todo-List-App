import React from "react";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";

const Additem = ({ newItem, setNewItem, handlesubmit }) => {

    const inputRef = useRef()
    return (
        <form className="addform" onSubmit={handlesubmit}>
            <label htmlFor="addItem" >Add Item</label>
            <input
                autoFocus
                name="addItem"
                ref={inputRef}
                id="addItem"
                type="text"
                placeholder="Add Item"
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button type="submit"
                    aria-label="Add Item"
                    onClick={()=>inputRef.current.focus()}

            >
                <FaPlus />
            </button>
        </form>
    )
}

export default Additem