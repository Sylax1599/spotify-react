import {memo} from 'react'
import ListItem from './ListItem'

export default memo(function Playlist(images, id, external_urls, description, name) {
    return (
        <ListItem 
        imageUrl={images.lenght? images[0]?.url: null} 
        id={id} 
        external_url={external_urls?.spotify}
        release_date=""
        name={description}
        artist={name}
        
        />
    )
})