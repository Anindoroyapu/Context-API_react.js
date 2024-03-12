import axios from "axios";
import React, { useEffect, useState } from "react";

function HomePage() {
  // eslint-disable-next-line no-unused-vars
  const [imagesList, setImagesList] = useState([]);
  const [seachText, setSearchText] = useState("");
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
    <div className="container bg-body-secondary vh-100 m-2rem">
      <form className="form-inline ">
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="inputText" className="sr-only">
            Search
          </label>
          <div className="inputText d-flex">
            <input
              type="text"
              className="form-control"
              id="inputText"
              placeholder="Search images"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={() => handleSearch()}
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div>
        <h1>Images:</h1>
        <div className="d-flex w-100 flex-wrap">
          {imagesList?.map((item) => {
            return (
              <div key={item?.id} className="" style={{ width: "200px" }}>
                <img
                  src={item?.urls?.full}
                  alt="..."
                  className="img-thumbnail"
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
