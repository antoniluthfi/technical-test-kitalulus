import { createContext, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [dataBackup, setDataBackup] = useState([]);
  const [title, setTitle] = useState("");
  const [num, setNum] = useState(0);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://andywiranata-42555.firebaseio.com/test-frontend/items.json"
      );
      const json = await response.json();
      setData(json);
      setDataBackup(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async () => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedData),
      };

      await fetch(
        "https://andywiranata-42555.firebaseio.com/test-frontend/items/0.json",
        requestOptions
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data updated successfully",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error,
      });
    } finally {
      setNum(num + 1);
      const closeButton = document.getElementById('closeButton');
      closeButton.click();
    }
  };

  const memoizedValue = useMemo(getData, [num]);

  useEffect(() => {
    getData();

    return () => {
      setData([]);
      setLoading(true);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        updateData,
        data,
        setData,
        loading,
        openFilter,
        setOpenFilter,
        title,
        setTitle,
        dataBackup,
        selectedData,
        setSelectedData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
