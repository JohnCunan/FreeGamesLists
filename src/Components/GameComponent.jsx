import '../Styles/GameComponent.css'
import { useState } from "react";

import LoadingSkeleton from "./LoadingSkeleton";

import MicrosoftIcon from '@mui/icons-material/Microsoft';
import WebIcon from '@mui/icons-material/Web';

export default function GameComponent({ game }){

    const [imageLoaded, setImageLoaded] = useState(false)

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    return(
        <div key={game.id} className='game-container'>
            <a target='_blank' href={game.game_url}>
                {!imageLoaded && <div><LoadingSkeleton /></div>}
                <img
                    src={game.thumbnail}
                    onLoad={handleImageLoad}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                
                <div className='game-info-container'>
                    <h4 title={game.title}>{game.title}</h4>
                    <p 
                        className='game-desc'
                        title={game.short_description}
                    >
                        {game.short_description}
                    </p>
                    <div className='game-plat-container'>
                        <h3 className='game-genre'>{game.genre}</h3>
                        <h3 className='game-plat'>
                        {
                        game.platform === "PC (Windows)" ? <MicrosoftIcon /> :
                        game.platform === "Web Browser" ? <WebIcon /> :
                        <>
                            <MicrosoftIcon />
                            <WebIcon />
                        </>
                        }
                        </h3>
                    </div>
                </div>
            </a>
        </div>
    )
}