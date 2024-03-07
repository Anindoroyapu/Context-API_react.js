import React, {createContext, useState} from 'react';
import './App.css';
import Images from './Compotent/Images';
import Jumbutron from './Compotent/Jumbutron';
import SearchField from './Compotent/SearchField';




function App() {
  const [searchImage, setSearchImage] = useState('');
  const { response, isLoading, error, fetchData } = useAxios(`search/photos?page=1&query=cats&client_id=${process.env.REACT_APP_ACCESS_KEY}`);

  const value = {
    response,
    isLoading,
    error,
    fetchData,
    searchImage,
    setSearchImage
  }

  return (
    <ImageContext.Provider value={value}>
      <Jumbutron>
        <SearchField />
      </Jumbutron>
      <Images />
    </ImageContext.Provider>
  );
}
export default App;
