import './Styles/App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

import Nav from './Components/Nav'
import Featured from './Components/Featured'
import GameComponent from './Components/GameComponent'

//MUI Components 
import TuneIcon from '@mui/icons-material/Tune';

export default function App() {

  const [url, setUrl] = useState('https://free-to-play-games-database.p.rapidapi.com/api/games');
  const [gameData, setGameData] = useState([])
  const [platform, setPlatform] = useState("")
  const [genre, setGenre] = useState("")

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: url,
      headers: { 
        'X-RapidAPI-Key': "443e1f58a0msh868d544b31010f3p1dd3d2jsn7fab86d81b7e",
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    try {
        const response = await axios.request(options);
        setGameData(response.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    console.log("Effect Used")
  }, [url])
  
  function handlePlatChange(event){
    setPlatform(event.target.value)
    let newUrl = '';

    if(event.target.value === "" && genre === ""){
      console.log("All plat All genre")
      newUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games'
    }
    else if (event.target.value != "" && genre === "") {
      console.log("Spec plat All genre")
      newUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${event.target.value}`
    }
    else if (event.target.value === "" && genre != "") { 
      console.log("All plat Spec genre")
      newUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genre}`
    }
    else if (event.target.value != "" && genre != "") {
      console.log("Spec plat Spec genre")
      newUrl = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${genre}&platform=${event.target.value}`
    }
    setUrl(newUrl)
  }

  function handleGenreChange(event){
    let newUrl = '';
    setGenre(event.target.value)
    if(event.target.value === "" && platform === ""){
      console.log("All genre All plat")
      newUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games'
    }
    else if (event.target.value != "" && platform === "") {
      console.log("Spec genre All plat") 
      newUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${event.target.value}`
    }
    else if (event.target.value === "" && platform != "") {
      console.log("All genre Spec plat")
      newUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`
    }
    else if (event.target.value != "" && platform != "") {
      console.log("Spec genre Spec plat")
      newUrl = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${event.target.value}&platform=${platform}`
    }
    setUrl(newUrl)
  }

  return (
    <div>
      <Nav />

      <div className='main-container'>
        
        <div className='hero-container'>
          <h3 className='hero-text'>Browse Free-To-Play PC and Browser Games</h3>
        </div>
        
        <div className='filters-container'>
          <h1 className='filter-title'>Browse games by Platform or Genre</h1>
          <div className='select-container'>

            <select 
              name="platform" 
              className='select-box'
              onChange={handlePlatChange}
            >
              <option value={""}>All Platforms</option>
              <option value={"pc"}>PC</option>
              <option value={"browser"}>Browser</option>
            </select>

            <select 
              name="genre" 
              className='select-box'
              onChange={handleGenreChange}
            >
              <option value={""}>All Genre</option>
              <option value={"action"}>Action</option>
              {/* <option value={"card.game"}>Card Game</option> */}
              <option value={"fighting"}>Fighting</option>
              <option value={"mmorpg"}>MMORPG</option>
              <option value={"moba"}>MOBA</option>
              <option value={"racing"}>Racing</option>
              <option value={"social"}>Social</option>
              <option value={"shooter"}>Shooter</option>
              <option value={"sports"}>Sports</option>
              <option value={"strategy"}>Strategy</option>
            </select>

            <a href='#' className='advanced-link'>
              <span>Advanced Filters </span><TuneIcon />
            </a>
          </div>
          {
            genre === "" ? null : 
            <Featured 
              genre={genre} 
              games={gameData}
              apiUrl={url}
            />
          }
          <div className='games-section'>
            {gameData.slice(0, 18).map((game) => (
              <GameComponent key={game.id} game={game} />
            ))}
          </div>
          

        </div>
      </div>
    </div>
  )
}