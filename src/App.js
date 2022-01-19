import React from "react";
import Filter from "./components/Filter";
import ModalUpdate from "./components/ModalUpdate";
import ModalView from "./components/ModalView";
import Table from "./components/Table";
import { AppProvider } from "./context/AppContext";
// import "./App.css";

const App = () => {
  return (
    <AppProvider>
      <div className="App pl-4 pr-4 pt-4">
        <Filter />
        <Table />
        <ModalUpdate />
        <ModalView />
      </div>
    </AppProvider>
  );
};

export default App;
