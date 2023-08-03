import { useState, useContext, useEffect } from "react";
import { MenuContext } from "./App";

const Menu = ({ list, setSelectedIndex, setSelectedLevel, setMaxLevel, setListLength, setSelectedIndexes, level=0 }) => {
  const selectedLevel = useContext(MenuContext).selectedLevel
  const selectedIndex = useContext(MenuContext).selectedIndex
  const selectedIndexes = useContext(MenuContext).selectedIndexes
  const [subList, setSubList] = useState(null);
  
  const handleHover = (currentLevel, index) => {
    setSelectedIndex(index);
    setSelectedLevel(currentLevel);
  }
  useEffect(() => {
    if (selectedLevel === level) {
      const newSelectedIndexes = selectedIndexes.slice(0, selectedLevel)
      newSelectedIndexes.push(selectedIndex)
      setSelectedIndexes(newSelectedIndexes)
      setSubList(null)
      setMaxLevel(selectedLevel)
      setListLength(list.length)
      if (list[selectedIndex].subMenu) {
        setSubList(list[selectedIndex].subMenu)
        setMaxLevel(selectedLevel + 1)
      } ;
    }
  }, [selectedLevel, selectedIndex])

  return (
    <div style={{display:"flex"}}>
      <ul>
        {list.map((item, index) => {
          return (
            <>
              <li
                key={index}
                onMouseEnter={() => handleHover(level, index)}  
                className={`${index === selectedIndexes[level] ? "selected" : ""} ${index === selectedIndex && selectedLevel === level ? "currentSelected" : ""}`}
              >
                {item.name}
              </li>
            </>

          )
        })}
      </ul>
      {subList && selectedLevel >= level &&
        <Menu
          list={subList}
          level={level + 1}
          setSelectedIndex={setSelectedIndex}
          setSelectedLevel={setSelectedLevel}
          setMaxLevel={setMaxLevel}
          setListLength={setListLength}
          setSelectedIndexes={setSelectedIndexes}
        />}
    </div>
  )
}

export default Menu;