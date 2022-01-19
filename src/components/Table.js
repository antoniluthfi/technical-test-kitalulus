import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Table = () => {
  const [filterText, setFilterText] = useState({
    title: "",
    genre: "",
  });

  const {
    data,
    setData,
    loading,
    openFilter,
    dataBackup,
    setSelectedData,
    setTitle,
  } = useContext(AppContext);

  const withCommas = (x) => {
    if (x || x === 0) {
      let num = Math.round(x).toString();
      let result = "";
      let cons = 0;
      for (let i = num.length - 1; i >= 0; i--) {
        cons += 1;
        result = num[i] + result;
        if (cons % 3 === 0 && cons < num.length) {
          result = "," + result;
        }
      }
      return result;
    }

    return 0;
  };

  const filterChange = (e) => {
    setFilterText({ [e.target.name]: e.target.value });

    if (e.target.value) {
      const val = data.filter((item) =>
        item[e.target.name].toLowerCase().match(e.target.value.toLowerCase())
      );
      setData(val);
    } else {
      setData(dataBackup);
    }
  };

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col" className="text-center">
            No
          </th>
          <th scope="col" className="text-center">
            Title
          </th>
          <th scope="col" className="text-center">
            View
          </th>
          <th scope="col" className="text-center">
            Genre
          </th>
          <th scope="col" className="text-center">
            Descriptions
          </th>
          <th scope="col" className="text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {openFilter && (
          <tr>
            <th className="text-center">#</th>
            <td>
              <input
                type="text"
                name="title"
                value={filterText.title}
                onChange={filterChange}
                style={{ width: "100%" }}
              />
            </td>
            <td></td>
            <td>
              <input
                type="text"
                name="genre"
                value={filterText.genre}
                onChange={filterChange}
                style={{ width: "100%" }}
              />
            </td>
            <td></td>
            <td></td>
          </tr>
        )}

        {!loading &&
          data.map((item, i) => (
            <tr key={i}>
              <th scope="row" className="text-center">
                {i + 1}
              </th>
              <td>{item.title}</td>
              <td>{withCommas(item.views)}</td>
              <td>{item.genre}</td>
              <td>
                {item.descriptions.length > 100
                  ? `${item.descriptions.substr(0, 100)}...`
                  : item.descriptions}
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#modalView"
                  onClick={() => {
                    setSelectedData(item);
                    setTitle(item.title);
                  }}
                  style={{ marginLeft: 10 }}
                >
                  <ion-icon
                    name="information-circle-outline"
                    style={{ fontSize: 20 }}
                  ></ion-icon>
                </button>
              </td>
              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    setSelectedData(item);
                    setTitle(item.title);
                  }}
                >
                  <ion-icon name="pencil-outline"></ion-icon>
                </button>
              </td>
            </tr>
          ))}

        {!loading && !data.length && (
          <tr>
            <td colSpan={6} className="text-center">
              No Data Found
            </td>
          </tr>
        )}

        {loading && (
          <tr>
            <td colSpan={6} className="text-center">
              Loading Data ...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
