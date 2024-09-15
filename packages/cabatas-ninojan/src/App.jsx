import { useState } from "react";
import "./App.css";

function App() {
  const [wishList, setWishList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editing, setEditing] = useState(null);
  const [editedItem, setEditedItem] = useState("");
  const [inputError, setInputError] = useState(false);
  const [editInputError, setEditInputError] = useState(false);

  const addItem = () => {
    if (newItem.trim()) {
      setWishList([
        ...wishList,
        { id: Date.now(), name: newItem, purchased: false },
      ]);
      setNewItem("");
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const deleteItem = (id) => {
    setWishList(wishList.filter((item) => item.id !== id));
  };

  const togglePurchased = (id) => {
    setWishList(
      wishList.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const editItem = (id) => {
    const itemToEdit = wishList.find((item) => item.id === id);
    setEditing(id);
    setEditedItem(itemToEdit.name);
  };

  const saveEdit = (id) => {
    if (editedItem.trim()) {
      setWishList(
        wishList.map((item) =>
          item.id === id ? { ...item, name: editedItem } : item
        )
      );
      setEditing(null);
      setEditedItem("");
      setEditInputError(false);
    } else {
      setEditInputError(true);
    }
  };

  return (
    <div className="App">
      <h1>Wish List</h1>
      <div>
        <input
          type="text"
          className={inputError ? "input-error" : ""}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new wish..."
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {wishList.map((item) => (
          <li key={item.id} className={item.purchased ? "purchased" : ""}>
            {editing === item.id ? (
              <>
                <input
                  type="text"
                  className={editInputError ? "input-error" : ""}
                  value={editedItem}
                  onChange={(e) => setEditedItem(e.target.value)}
                />
                <button onClick={() => saveEdit(item.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{item.name}</span>
                <div>
                  <button onClick={() => togglePurchased(item.id)}>
                    {item.purchased ? "Purchased" : "Purchase"}
                  </button>
                  <button onClick={() => editItem(item.id)}>Edit</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
