import { useState } from "react";
import '../Styles/ThreeFeatured.css'

import LoadingSkeleton from "./LoadingSkeleton";

export default function ThreeFeatured({ game }){

    const [imageLoaded, setImageLoaded] = useState(false)
    console.log("3 Feature rendered")
    const handleImageLoad = () => {
        console.log('handling image load...')
        setImageLoaded(true)
    }

    return(
        <div className='game-card'>
            <a target='_blank' href={game.game_url}>
                {!imageLoaded && <div><LoadingSkeleton /></div>}
                <img 
                    src={game.thumbnail}
                    onLoad={handleImageLoad}
                    style={{ display: imageLoaded ? 'block' : 'none' }} 
                />
                <h2>{game.title}</h2>
            </a>
        </div>
    )
}