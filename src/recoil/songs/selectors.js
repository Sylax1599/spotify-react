import {selector} from 'recoil'
import {album,artist,playlist,episodio} from './atoms'

export const filterType= selector({
    key: "filterType",
    get: ({get})=>{
        const atoms=[get(album), get(artist), get(playlist), get(episodio), "track"]

        const notNullAtoms= atoms.filter((item)=> !!item)

        return notNullAtoms.length ? notNullAtoms.join(","): null
    },
    set: ({set})=>{
        set(album,null)
        set(artist,null)
        set(playlist,null)
        set(episodio,null)
    }
})