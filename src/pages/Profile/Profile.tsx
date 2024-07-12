//import { CCard } from "../../common/CCard/CCard";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useContext } from "react";
import { myContext } from "../../app/context";
//import { bringMovies, fetchMoviesById } from "../../services/api-calls";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
        <h1>
            {decodedName}'s favorites
        </h1>
        {favorites.length > 0 ? (
            <Container>
                {favorites.map((fav: string, index: number) => {
                    console.log("Movie where?");
                  return (
                    <Row key={index}>
                      <div /*onClick={() => selectMovie(fav)}*/>
                        {fav}
                      </div>
                    </Row>
                  );
                })}
            </Container>
          ) : (
            <div>No favorites yet!</div>
          )}
        </>
    )
}

export default Profile;