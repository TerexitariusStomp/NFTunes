import React from 'react'
import "./recordItem.css"

function RecordItem(props) {
    return (

            <div className = "market">
                <div className = "recordContainer">

                <div className = "record" style={{backgroundImage: `url(${props.image})`}}>
                <div className="gold">
                    <video  onMouseOver={event => event.target.play()}  onMouseLeave={event => event.target.pause()} className = "recVideo" src={props.src} autoPlay loop muted></video>
                </div>
                </div>
                    <div className="info">
                    <h2>{props.artist}</h2>
                    <p>Album: {props.album}</p>
                    <p>Song: {props.song}</p>
                    <p>Lyric: "{props.lyric}"</p>
                </div>

                </div>

            </div>

    )
}

export default RecordItem
