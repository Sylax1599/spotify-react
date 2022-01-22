
import './style.css'

import {album as albumAtom, 
    artist as artistAtom, 
    playlist as playlistAtom,
     episodio as episodioAtom} from '../../recoil/songs/atoms'

     import { useRecoilState } from 'recoil'

export default function HomeFilters() {

    const [album, setAlbum]= useRecoilState(albumAtom)
    const [artist, setArtist]= useRecoilState(artistAtom)
    const [playlist,setPLayList]= useRecoilState(playlistAtom)
    const [episodio, setEpisodio]= useRecoilState(episodioAtom)

    return(
        <div className="home-filters">
            <label >
                Album
                <input type="checkbox" name="album" 
                checked={!!album}
                onChange={({target})=> setAlbum(target.checked ? "album": null)}
                />
            </label>

            <label >
                Artista
                <input type="checkbox" name="artist"
                checked={!!artist}
                onChange={({target})=> setArtist(target.checked ? "artist": null)}
               
                />
            </label>

            <label >
                PlayList
                <input type="checkbox" name="playlist"
                 checked={!!playlist}
                onChange={({target})=> setPLayList(target.checked ? "playlist": null)}

                />
            </label>

           

            <label >
                Episodio
                <input type="checkbox" name="episodio"
                checked={!!episodio}
                onChange={({target})=> setEpisodio(target.checked ? "episode": null)}

                />
            </label>
        </div>
    )
}