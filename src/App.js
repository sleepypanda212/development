import './App.css';
import { useState } from "react";
import clothingData from "./assets/clothing-data.json";
import ClothingItem from "./components/clothing-item.js";


function App() {

  const [item, setItem] = useState(clothingData);
  const catItems = [...new Set(clothingData.map((Val) => Val.category))];
  const colorItems = [...new Set(clothingData.map((Val) => Val.color))];
  const priceItems = [...new Set(clothingData.map((Val) => Val.price))];
  const [temp1, settemp1] = useState(new Array(colorItems.length).fill(0));
  const [temp2, settemp2] = useState(new Array(catItems.length).fill(0));

  const [checkedState, setCheckedState] = useState(
    new Array(colorItems.length).fill(false)
  );

  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])
  
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const colind = updatedCheckedState.reduce(
      (colind, currentState, index) => {
        if (currentState === true) {
          colind.push(colorItems[index]);
          return colind;
        }
        return colind;
      },
      new Array(colorItems.length).fill(0)
    );
    settemp1(colind);
    filterItem(temp2, colind);
  }

  const [checkedState1, setCheckedState1] = useState(
    new Array(catItems.length).fill(false)
  );
  const handleOnChange1 = (position) => {
    const updatedCheckedState1 = checkedState1.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState1(updatedCheckedState1);
    const catind = updatedCheckedState1.reduce(
      (catind, currentState1, index) => {
        if (currentState1 === true) {
          catind.push(catItems[index]);
          return catind;
        }
        return catind;
      },
      new Array(catItems.length).fill(0)
    );
    settemp2(catind)
    filterItem(catind, temp1);
  }

  function addItem(temp) {
    setCart([...cart, temp])
    setTotal(total + temp.price)
  }
  function removeItem(temp, ind) {
    setCart(current =>
      current.filter((i, tempind) => {
        return (tempind !== ind);
      }),
    );
    setTotal(total - temp.price)
  }

  function handleAscSort() {
    const sortedData = [...item]. sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    setItem(sortedData)
  }

  function handleDesSort() {
    const sortedData = [...item]. sort((a, b) => {
      return a.name < b.name ? 1 : -1
    })
    setItem(sortedData)
  }

  function handleDesPriceSort() {
    const sortedData = [...item]. sort((a, b) => {
      return a.price < b.price ? 1 : -1
    })
    setItem(sortedData)
  }

  function handleAscPriceSort() {
    const sortedData = [...item]. sort((a, b) => {
      return a.price > b.price ? 1 : -1
    })
    setItem(sortedData)
  }

  function handleClearFilter() {
    setCheckedState(new Array(colorItems.length).fill(false))
    setCheckedState1(new Array(catItems.length).fill(false))
    settemp1(new Array(colorItems.length).fill(0))
    settemp2(new Array(catItems.length).fill(0))
    setItem(clothingData)
  }

  const filterItem = (curcat, curcol) => {
    const newItem = clothingData.filter((newVal) => {
      if (!curcat.every(item => item === 0) && !curcol.every(item => item === 0)) {
        return curcat.includes(newVal.category) && curcol.includes(newVal.color);
      }
      return curcat.includes(newVal.category) || curcol.includes(newVal.color);
    });
    setItem(newItem);
  };



  return (
    <div className="App">
      <h1>BEARY CUTE SHOP</h1>
      <div class="app-container">
      <div class="app-13-container">
      <div class="app-item1">
      <ul>
      <h2>Filter by color</h2>
        {colorItems.map(( Val, index ) => {
          return (
              <div className="Filter">
                <div className="FilterCategory">
                  <input
                    type="checkbox"
                    name={Val}
                    value={Val}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{Val}</label>
                </div>
              </div>
          );
        })}
      </ul>

      <ul>
        <h2>Filter by item type</h2>
        {catItems.map(( Val, index ) => {
          return (
              <div className="Filter">
                <div className="FilterCategory">
                  <input
                    type="checkbox"
                    name={Val}
                    value={Val}
                    checked={checkedState1[index]}
                    onChange={() => handleOnChange1(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{Val}</label>
                </div>
              </div>
          );
        })}
      </ul>
      
      <ul>
      <h2>Sort by</h2>
      <button class="FilterButton" onClick={handleAscSort}>A-Z</button>
      <button class="FilterButton" onClick={handleDesSort}>Z-A</button>
      <button class="FilterButton" onClick={handleDesPriceSort}>Highest to lowest price</button>
      <button class="FilterButton" onClick={handleAscPriceSort}>Lowest to higest price</button>
      </ul>
      <br></br>
      <button class="ClearButton" onClick={handleClearFilter}>Clear all filters</button>
      </div>
      <div class="app-item3">
        <h2>Shopping Cart</h2>
        <h3>Items in cart:</h3>
        {cart.map((item, ind) => (
          <div>{item.name}: ${item.price}
          <button class="RemoveButton" onClick={() => removeItem(item, ind)}>Remove</button>
          </div>
        ))}
        <br></br>
        <h3>Total Price = ${total}</h3>
        </div>
      </div>
      <div class="app-item2">
      <ClothingItem item={item} addItem={addItem}/>
          </div>

    </div>
    </div>
  );
};



export default App;