import {memo} from 'react'
import './style.css'


export default memo(function ListItem({imageUrl, id, external_url, onClick, release_date, name, artist}) {
    const handleListItemClick= ()=>{
        window.open(external_url,"_blank")
    }
    
    return (
        <div className="list-item" onClick={handleListItemClick}
        >
           <img src={imageUrl} alt={id} />
           <p className="list-item-title">{name}</p>
           <p className="list-item-artist">{artist}</p>
           <p className="list-item-release-date">{release_date}</p>
        </div>
    )
}
)