import { useState } from 'react'
import './App.css'
import Gallery from './components/Gallery'
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

function App() {

  const [banList, setBanList] = useState([])
  const [currentArt, setCurrentArt] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);

  const discoverForm = () => {
    let discovered =  false;

    makeQuery();
    console.log("ran");
    console.log(currentImage);
  }

  const addBanItem = (art, key) => {
    setBanList([...banList, art[key]]);
    console.log(banList);
    makeQuery();
  }

  const makeQuery = () => {
    let query = `https://api.harvardartmuseums.org/object?apikey=${ACCESS_KEY}&size=1&sort=random&hasimage=1`;
    callAPI(query).catch(consol.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    setCurrentArt(json.records[0])
    imageQuery(json.records[0].id)
  }

  const imageQuery = (imageId) => {
    let query = `https://api.harvardartmuseums.org/image?apikey=${ACCESS_KEY}&id=${imageId}`;
    callImageAPI(query).catch(console.error);
  }

  const callImageAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json);
    if (json.records.length!=0)
    {
      setCurrentImage(json.records[0].baseimageurl);
      setPrevImages((images) => [...images, json.records[0].baseimageurl]);
      console.log("correct")
    }
    else{
      setCurrentImage();
    }
  }

  const removeFromBanList = (item) => {
    setBanList(banList.filter((d) => d !== item));
  };

  const buttons = banList.map((d) => {
    return (
      <button className='banned-buttons' key={d} onClick={() => removeFromBanList(d)}>
        {d}
      </button>
    );
  });

  return (
    <div className='App'>
      <h1>Discover New Art! 🎨</h1>
      <button onClick={discoverForm}>🔎 Discover</button>
      {currentArt ? (<div className='art-description'><h2>{currentArt.title}</h2>
      {currentArt.technique ? (<button className='attribute-buttons' onClick={() =>{addBanItem(currentArt,"technique")}}>{currentArt.technique}</button> ): (<div></div>)}
      {currentArt.century ? (<button className='attribute-buttons' onClick={() =>{addBanItem(currentArt,"century")}}>{currentArt.century}</button> ): (<div></div>)} 
      {currentArt.culture ? (<button className='attribute-buttons' onClick={() =>{addBanItem(currentArt,"culture")}}>{currentArt.culture}</button> ): (<div></div>)}
      {currentArt.classification ? (<button className='attribute-buttons' onClick={() =>{addBanItem(currentArt,"classification")}}>{currentArt.classification}</button> ): (<div></div>)} 
      </div>
      ) : (
        <div> </div>)}

        <br></br>
        <br></br>

        {currentImage ? (
           <img
           className="screenshot"
           src={currentImage}
           alt="Screenshot returned"
           height="500"
           width ="700"
         />
       ) : (
         <div> </div>
       )}

       <br></br>

       <div className='container'>
        <Gallery images={prevImages} />
       </div>

       <div className='ban-list'>
        <h3> Banned Attributes 🚫</h3>
        {buttons}
       </div>


    </div>
  )
}

export default App
