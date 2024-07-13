import React from "react";
import { FaTrashAlt } from "react-icons/fa";


const Content = ({ items, handleCheck, handleDelete }) => {
    return (
        <>
            {(items.length) ? ( 
                <ul>
                    {items.map((item) => (
                        <li className="item" key={item.id}>
                            <input
                                type="checkbox"
                                name="checkbox"
                                onChange={() => handleCheck(item.id)}
                                checked={item.checked}
                            />
                            <label
                               htmlFor="checkbox" style={(item.checked) ? { textDecoration: 'line-through' } : null}
                            >{item.item}</label>
                            <FaTrashAlt
                                role="submit"
                                onClick={() => handleDelete(item.id)}
                                tapindex="0"
                                aria-label={`Delete ${item.item}`}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>your list is empyt</p>
            )}
            
        </>
    )
}

export default Content