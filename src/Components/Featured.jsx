import axios from 'axios'
import '../Styles/Featured.css'
import { useState, useEffect } from 'react'
import ThreeFeatured from './ThreeFeatured'

export default function Featured(props) {
    console.log(import.meta.env.VITE_SECRET)
    const [featuredGames, setFeaturedGames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const options = {
              method: 'GET',
              url: props.apiUrl,
              headers: {
                'X-RapidAPI-Key': "443e1f58a0msh868d544b31010f3p1dd3d2jsn7fab86d81b7e",
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
              }
            };
            try {
                const response = await axios.request(options);
                setFeaturedGames(response.data);
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [props.apiUrl])

    const getRandomElements = (arr, count) => {
        const shuffled = arr.slice(); // Create a copy of the array
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        return shuffled.slice(0, count);
    };
    
    const randomGames = getRandomElements(featuredGames, 3);
    
    return (
        <div className='feature-container'>
            <h3>
                Featured {props.genre} games
            </h3>
            <div className='games-container'>
                {randomGames.map((game) => (
                    <ThreeFeatured key={game.id} game={game} />
                ))}
            </div>
            <h3 className='all-section'>
                All {props.genre} games
            </h3>
        </div>
    )
}