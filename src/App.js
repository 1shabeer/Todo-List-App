import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import { useState, useEffect } from "react";
import Additem from './Components/Additem';
import Search from './Components/Search';
import apiMethod from './Components/apiMethod';


function App() {


  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState("")
  const [items, setItems] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = 'http://localhost:3500/items'

  useEffect(() => {



    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Data not Received");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null)  
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);

   JSON.parse(localStorage.getItem("todo"))

  }, [])

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!newItem) return
    addItem(newItem)
    setNewItem("")
  }

  // addItem store the items in newItem 

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1  : 1;
    const addNewItem = { id, checked: false, item }
    const listItems = [...items, addNewItem]
    setItems(listItems)

   localStorage.setItem("todo",JSON.stringify(listItems))
    const postOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiMethod(API_URL, postOptions)
    if (result) setFetchError(result)
  }


  // checked method for checked box

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
    localStorage.setItem("todo",JSON.stringify(listItems))

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqURL = `${API_URL}/${id}`;
    const result = await apiMethod(reqURL, updateOptions);
    if (result) setFetchError(result);
  }


  //  Delete method from list items

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem("todo",JSON.stringify(listItems))


    const deleteOptions = { method: 'DELETE' };
    const reqURL = `${API_URL}/${id}`;
    const result = await apiMethod(reqURL, deleteOptions);
    if (result) setFetchError(result);
  }





  return (
    <div className="App">
      <Header titel="" />
      <Additem
        newItem={newItem}
        setNewItem={setNewItem}
        handlesubmit={handlesubmit}
      />
      <Search
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items..</p>}
        {fetchError && <p> {`Error: ${fetchError}`} </p>}
        {!isLoading && !fetchError && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        /> 
        }
      </main>
      <Footer
        length={items.length}
      />

    </div>
  );
}

export default App;
