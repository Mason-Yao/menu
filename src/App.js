import './App.css';
import Menu from './Menu';
import { useState, createContext } from "react";
import {data} from "./data"

export const MenuContext = createContext();

function App() {
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [maxLevel, setMaxLevel] = useState(0);
  const [listLength, setListLength] = useState(0);
  const handleKeyPress = (event) => {
    switch (event.key) {
      case "ArrowRight":    
        setSelectedLevel(selectedLevel < maxLevel ?  selectedLevel + 1 : 0);
        setSelectedIndex(0)
        break;
      case "ArrowLeft": 
        if (selectedLevel > 0) {
          setSelectedLevel(selectedLevel - 1)
          setSelectedIndex(selectedIndexes[selectedLevel - 1])
        }
        break;
      case "ArrowDown":
        setSelectedIndex((selectedIndex + 1) % listLength);
        break;
      case "ArrowUp":
        setSelectedIndex((selectedIndex - 1 + listLength) % listLength);
        break;
      default:
        break;
    }
  }

  return (
    <div className="App"> 
      <MenuContext.Provider value={{ selectedIndex, selectedLevel, selectedIndexes }}>
          <div style={{display:"flex"}} tabIndex={0} onKeyDown={handleKeyPress}>
            <Menu
              list={data.menu}
              setSelectedIndex={setSelectedIndex}
              setSelectedLevel={setSelectedLevel}
              setMaxLevel={setMaxLevel}
              setListLength={setListLength}
              setSelectedIndexes={setSelectedIndexes}
            />
        </div>
      </MenuContext.Provider>
    </div>
  );
}


export default App;
