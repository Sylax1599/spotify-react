import React,{useEffect, useCallback} from 'react'
import "./style.css"
import {useRecoilState} from 'recoil'
import {isAuthenticated as isAuthenticatedAtom, 
    spotifyRefreshToken as spotifyRefreshTokenAtom
    , spotifyTokenResponse as spotifyTokenResponseAtom
} from '../../recoil/auth/atoms'
import { spotifyAuthCall } from '../../utils'
import HomeImage from '../../assets/images/fondo.jpg'
import {useHistory, useLocation} from 'react-router-dom'
const spotifyUrl=`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private`


export default function Login() {
    //con esto obtengo lo que se mando por la Url, que es el id de spotify
    const location=useLocation()
    //aqui lo veo
    //console.log(location)
    const history= useHistory()

    const [isAuthenticated, setIsAuthenticated]=useRecoilState(isAuthenticatedAtom)
    const [spotifyRefreshToken, setSpotifyRefreshToken]= useRecoilState(spotifyRefreshTokenAtom)
    const [spotifyTokenResponse, setSpotifyTokenResponse]= useRecoilState(spotifyTokenResponseAtom)


    
    const authenticateUser= useCallback(async (code)=>{
      
       // si el refresh token existe, entonces haz una llamda al refreshtoken
       // de lo contrario, solicita un token nuevo
       try{
       let response
       if(spotifyRefreshToken){
           // haz la llamada TODO
           response= await spotifyAuthCall({refresh_token: spotifyRefreshToken, grant_type: "refresh_token"})
       }
       else{
           response=await spotifyAuthCall({code, grant_type: "authorization_code"})
       }

       if(response.access_token){

       
       setSpotifyRefreshToken(response?.refresh_token)
       setSpotifyTokenResponse(response)
       setIsAuthenticated(true)
       history.replace("/home")
       }
       else{
           throw new Error ("Usuario no fue logueado")
       }


       }catch(error){
           alert ("Usuario no logueado")
           setSpotifyTokenResponse(null)
           setSpotifyRefreshToken(null)
           setIsAuthenticated(false)
       }

       //TODO redirgir a pantalla de buscador
       // si estos parametros de abajo cambian, que la funcion vuelva a recrearse
       // pero que no se recreen en cada renderizado, porque podría haber problemas de optimizacion

    }, [setSpotifyRefreshToken, setSpotifyTokenResponse, setIsAuthenticated, spotifyRefreshToken])


    useEffect(() => {
        //esto es para obtener los parametros de la url
        const urlParams= new URLSearchParams(location.search)
        // aqui vemos el objeto console.log(urlParams)
        // y aqui especificamos cual variable es la que queremos, en el caso de spotify devuelve el code
        const spotifyCode=urlParams.get("code")
        

        if(spotifyCode || isAuthenticated) authenticateUser(spotifyCode)
        //Esto es para que lo que está dentro del Hook, solo se 
        //llame cuando location.search cambie
    }, [location.search])

    const handleLoginClick=()=>{
        window.location.replace(spotifyUrl)
    }


    return (
        <div className="home-container">
            <div className="home-left-child">
                <h5 className="learn">Spotify - REACT JS</h5>
                <h3>Bienvenido de nuevo</h3>
                <h5>Identificate para escuchar tu música favorita</h5>
                <button onClick={handleLoginClick}>Iniciar sesión</button>
            </div>
            <div className="home-right-child" 
            style={{backgroundImage: `url(${HomeImage})`}}
            />
                
            
        </div>
    )
}
