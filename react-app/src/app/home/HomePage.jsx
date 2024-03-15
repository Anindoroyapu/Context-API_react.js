import axios from "axios";
import React, { useEffect, useState } from "react";
import iopt from "./iopt";

function HomePage() {
  // eslint-disable-next-line no-unused-vars
  const [imagesList, setImagesList] = useState({});
  const [seachText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const Access_Key = process.env.REACT_APP_ACCESS_KEY;

  const pageNumberArr = [...Array(imagesList?.total_pages).keys()];
  useEffect(() => {
    if (seachText.trim().length) {
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${currentPage}&query=${seachText}&client_id=${Access_Key}`
        )
        .then(({ data }) => {
          setImagesList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [Access_Key, currentPage, seachText]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSearchText(ev?.target[0].value);
  };

  return (
    <div className="container bg-body-secondary vh-100">
      <form className="form-inline bg-info text-center" onSubmit={handleSubmit}>
        <div className="form-group mx-sm-3 mb-3">
          <label htmlFor="inputText" className="sr-only">
            <div className="p-3 mb-2 fs-2 fw-bold ">Find Your Images</div>
          </label>
          <div className="inputText d-flex w-100 ">
            <input
              type="text"
              className="form-control mb-4 me-3"
              id="inputText"
              placeholder="Search images"
            />
            <button
              type="submit"
              className="btn btn-primary mb-4"
              onClick={() => null}
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button
                onClick={() =>
                  setCurrentPage((cuData) => {
                    if (cuData >= 1) {
                      return cuData - 1;
                    }
                    return cuData;
                  })
                }
                className="page-link"
                disabled={imagesList?.results === 0}
              >
                Previous
              </button>
            </li>
            {pageNumberArr?.length === 1
              ? null
              : pageNumberArr?.slice(0, 20)?.map((item) => {
                  return (
                    <li
                      className={`page-link ${
                        currentPage === item + 1 ? "active" : ""
                      }`}
                      key={item}
                      onClick={() => setCurrentPage(item + 1)}
                    >
                      {item + 1}
                    </li>
                  );
                })}

            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage((cuData) => cuData + 1)}
                disabled={imagesList?.results === 0}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <h3>Images:{seachText || ""}</h3>
        <div className="d-flex w-100 flex-wrap">
          {imagesList?.results?.map((item) => {
            return (
              <div key={item?.id} className="">
                <img
                  src={iopt(item?.urls?.full, 300)}
                  alt="..."
                  className="img-thumbnail"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
