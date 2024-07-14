
import { useContext, useEffect, useState } from "react"
import { myContext } from "../../app/context"
import { Badge, Chip, Container, Group, Stack } from "@mantine/core";
import { FavMovie, Movie } from "../../interfaces";
import calendar from "../../assets/calendar_month.svg";
import vote from "../../assets/how_to_vote.svg";
import { jwtDecode } from "jwt-decode";

function MovieDetail () {

    const { state, SetAuth } = useContext(myContext);
    const [decodedName, setDecodedName] = useState("");
    const [genreArr, setGenreArr] = useState([]);//state.global.genre;
    const [movieGenres, setMovieGenres] = useState([]);//state.global.movie?.genre_ids;
    

    useEffect(() => {
        //This follows the value of state
        if(state.global.token !== ""){
          //I will decipher the token....
          let decoded = jwtDecode(state.global.token)
          console.log(decoded);
          console.log(state.global.favorites);
    
          setDecodedName(decoded?.firstName);
        }    
        setGenreArr(Array.from(state.global.genre));
        setMovieGenres(Array.from(state.global.movie?.genre_ids));
        console.groupCollapsed("Genres");
        console.log(genreArr);
        console.log(movieGenres);
        console.groupEnd();
        console.log(state);
        
      }, [state]);

    let localFavorites: Array<FavMovie> = Array.from(state.global.favorites);
    let fav: FavMovie = {addedBy: decodedName, movie: state.global.movie.title};
    const [checked, setChecked] = useState(localFavorites.includes(fav));




    function checkAndFavorite(){
        if(state.global.token === ""){
            alert("You must be logged in to add movies to favorites!")
        } else{
            if (!checked) {
            //if (state.global.favorites.indexOf(state.global.movie) < 0) {
                console.log("Favorited!");
                localFavorites.push(fav);
                SetAuth("favorites", localFavorites)
                console.log(localFavorites);
            //}
           setChecked(true);
        }
        else if (checked) {
            //if (state.global.favorites.indexOf(state.global.movie) >= 0) {
                console.log("Unfavorited...");
                localFavorites.splice(localFavorites.indexOf(fav),1);
                SetAuth("favorites", localFavorites)
                console.log(localFavorites);
            //}
            setChecked(false);
        }
    }
}



console.groupCollapsed("Is movie favorited");
console.log(fav);
console.log(localFavorites);
console.log(localFavorites.indexOf(fav));
console.groupEnd();






    return(
        <>
        <Group className="content-center">
        <img 
        className="w-80 lg:w-1/3 m-0"
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${state.global.movie?.poster_path}`}
        />
        <Stack className="max-w-xl p-1">
        <h1 className="text-3xl">{state.global.movie?.title}</h1>
        <Badge className=""><img src={calendar} alt="Release date:" className="inline"/> {state.global.movie?.release_date}</Badge>
        <Chip checked={checked} onChange={() => checkAndFavorite()}>Add to Favorites</Chip>
        <p>{state.global.movie?.overview}</p>
        {movieGenres.map((genre: number, index: number) => {
              return (
                <Badge key={index}>{genreArr.find(x => x.id === genre).name}</Badge>
              );
            })}
        <p><img src={vote} alt="votes:" className="inline"/> {state.global.movie?.vote_average} ({state.global.movie?.vote_count})</p>
        </Stack>
        </Group>
        </>
    )
}

export default MovieDetail