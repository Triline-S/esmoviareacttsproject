//import { CCard } from "../../common/CCard/CCard";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useContext } from "react";
import { myContext } from "../../app/context";
//import { bringMovies, fetchMoviesById } from "../../services/api-calls";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FavMovie } from "../../interfaces";
//import { Movie } from "../../interfaces";


function Profile () {

    const [decodedName, setDecodedName] = useState("");
    const [favorites, setFavorites] = useState([]);
    const { state, SetAuth } = useContext(myContext);
    const navigate = useNavigate();





    useEffect(() => {
        //This follows the value of state
        if(state.global.token !== ""){
          //I will decipher the token....
          let decoded = jwtDecode(state.global.token)
          console.log(decoded);
          console.log(state.global.favorites);
    
          setDecodedName(decoded?.firstName);
          setFavorites(state.global.favorites);
        }
      }, [state]);


      //const selectMovie = (movie: Movie) => {
      //  SetAuth("movie", movie);
      //  navigate("/moviedetail");
      //};


    return (
        <>
        <h1 className="text-3xl pt-8 pb-8 mb-4 md:pl-80 md:bg-slate-300 rounded-br-lg rounded-bl-lg w-fit pr-2 shadow-md">
            {decodedName}'s favorites
        </h1>
        {favorites.length > 0 ? (
            <div className="md:ml-72">
                {favorites.map((fav: FavMovie, index: number) => {
                  return (
                    <Row key={index}>
                      <div className={` ml-2 w-fit bg-slate-${index%2 + 3}00`}>
                        {fav.addedBy === decodedName ? (fav.movie):("")}
                      </div>
                    </Row>
                  );
                })}
            </div>
          ) : (
            <div>No favorites yet!</div>
          )}
        </>
    )
}

export default Profile;