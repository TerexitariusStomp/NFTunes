import React from 'react'
import "./recordItem.css"

function RecordItem(props) {
    return (

            <div className = "market">
                <div className = "recordContainer">
                <div className="gold" >
                    <video className = "recVideo" autoplay src={props.src} autoPlay loop muted></video>
                    <div className = "recCenter"></div>
                </div>
                <div className = "record" style={{backgroundImage: `url(${props.image})`}}>
      
                </div>
                
                    <div className="info">
                    <h2>{props.artist}</h2>
                    <p>Album: {props.album}</p>
                    <p>Song: {props.song}</p>
                    <p>Lyric: "{props.lyric}"</p>
                </div>

                <div className="shelf"></div>

                </div>

            </div>

    )
}

export default RecordItem
