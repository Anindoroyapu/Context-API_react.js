import axios from "axios";
import React, { useEffect, useState } from "react";
import iopt from "./iopt";

function HomePage() {
  // eslint-disable-next-line no-unused-vars
  const [imagesList, setImagesList] = useState([]);
  const [seachText, setSearchText] = useState("");
  const [currentPage] = useState(1);
  const imgsPerPage = 10;
  const lastIndex = currentPage * imgsPerPage;
  const firstIndex = lastIndex - imgsPerPage;
  //const imgs = imagesList.slice(firstIndex, lastIndex);
  const npage = Math.ceil(imagesList.length / imgsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const Access_Key = process.env.REACT_APP_ACCESS_KEY;

  useEffect(() => {
    if (seachText.trim().length) {
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=1&query=${seachText}&client_id=${Access_Key}`
        )
        .then(({ data }) => {
          setImagesList(data?.results || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [Access_Key, seachText]);
  console.log(imagesList);

  const handleSearch = (e) => {};

  return (
    <div className="container bg-body-secondary vh-100">
      <form className="form-inline bg-info text-center">
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
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary mb-4"
              onClick={() => handleSearch()}
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
              <a href=" " className="page-link" onClick={prePage}>
                Previous
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  className="page-link"
                  href=" "
                  onClick={() => changeCpage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href=" " onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
        <h3>Images:{seachText || ""}</h3>
        <div className="d-flex w-100 flex-wrap">
          {imagesList?.map((item) => {
            return (
              <div
                key={item?.id}
                className=""
              >
                <img
                  src={iopt(item?.urls?.full, 200)}
                  alt="..."
                  className="img-thumbnail flex-wrap"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  function prePage() {
    if (currentPage !== firstIndex) {
      setImagesList(currentPage - 1);
    }
  }
  function changeCpage(id) {}
  function nextPage() {}
}

export default HomePage;
