import React from "react";
import SideMenu from "./components/sideMenu";
import { Main } from "./components/Main";
import { useColorContext } from "./ColorContext";

function App() {
  const { setShowColorButtons, setSelectedColor } = useColorContext();

  return (
    <div
      onClick={() => {
        setSelectedColor()
        setShowColorButtons(false)
      }}
      className="flex "
    >
      <SideMenu />
      <Main />
    </div>
  );
}

export default App;
