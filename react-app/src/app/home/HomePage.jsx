import axios from "axios";
import React, { useEffect, useState } from "react";

function HomePage() {
  const [imagesList, setImagesList] = useState([]);
  const [seachText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?seach=${seachText}`)
      .then((data) => {
        setImagesList(data.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seachText]);

  const handleSearch = (e) => {};
  return (
    <div className="container bg-body-secondary vh-100">
      <form className="form-inline" >
        <div className="form-group mx-sm-3 mb-2">
          <label for="inputText" className="sr-only">
            Search
          </label>
          <input
            type="text"
            className="form-control"
            id="inputText"
            placeholder="Search images"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-2"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </form>
      <div>
        <h1>Images:</h1>
        <div className="d-flex w-100 flex-wrap">
          {imagesList?.slice(0, 10)?.map((item) => {
            return (
              <div key={item?.thumbnailUrl} className="">
                <img src={item?.url} alt="..." className="img-thumbnail" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
