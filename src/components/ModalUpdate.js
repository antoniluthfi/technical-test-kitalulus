import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../context/AppContext";

const ModalUpdate = () => {
  const { updateData, title, selectedData, setSelectedData } =
    useContext(AppContext);

  const onChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const inputValidation = (data) => {
    let message;

    if (!data.title) {
      message = "Title is required!";
    } else if (!data.views) {
      message = "Views is required!";
    } else if (!data.genre) {
      message = "Genre is required!";
    } else if (!data.descriptions) {
      message = "Descriptions is required!";
    }

    if (message) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: message,
      });

      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputValidation(selectedData)) {
      updateData();
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Insert Title"
                  name="title"
                  value={selectedData?.title || ''}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="views">View</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="views"
                  placeholder="Insert Views"
                  name="views"
                  value={selectedData?.views || ''}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  id="genre"
                  placeholder="Insert Genre"
                  name="genre"
                  value={selectedData?.genre || ''}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="descriptions">Descriptions</label>
                <textarea
                  className="form-control"
                  id="descriptions"
                  rows="3"
                  name="descriptions"
                  value={selectedData?.descriptions || ''}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="closeButton"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
