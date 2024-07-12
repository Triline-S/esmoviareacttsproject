
import { useContext, useEffect, useState } from "react"
import { myContext } from "../../app/context"
import { Badge, Chip, Container, Group, Stack } from "@mantine/core";
import { Movie } from "../../interfaces";
import calendar from "../../assets/calendar_month.svg";
import vote from "../../assets/how_to_vote.svg";

function MovieDetail () {

    const { state, SetAuth } = useContext(myContext)
    let localFavorites: Array<Movie> = Array.from(state.global.favorites)
    const [checked, setChecked] = useState(localFavorites.includes(state.global.movie.title));
    console.groupCollapsed("Is movie favorited");
    console.log(state.global.movie.title);
    console.log(localFavorites)
    console.log(localFavorites.includes(state.global.movie.title));
    console.groupEnd();

    function checkAndFavorite(){
        if(state.global.token === ""){
            alert("You must be logged in to add movies to favorites!")
        } else{
            if (!checked) {
            //if (state.global.favorites.indexOf(state.global.movie) < 0) {
                console.log("Favorited!");
                localFavorites.push(state.global.movie.title);
                SetAuth("favorites", localFavorites)
                console.log(localFavorites);
            //}
           setChecked(true);
        }
        else if (checked) {
            //if (state.global.favorites.indexOf(state.global.movie) >= 0) {
                console.log("Unfavorited...");
                localFavorites.splice(localFavorites.indexOf(state.global.movie.title),1);
                SetAuth("favorites", localFavorites)
                console.log(localFavorites);
            //}
            setChecked(false);
        }
    }
}

    useEffect(()=>{
        console.log(state);
    }, [state])

    return(
        <>
        <Group className="content-center">
        <img 
        className="w-80 lg:w-1/3 m-0"
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${state.global.movie?.poster_path}`}
        />
        <Stack className="max-w-xlp-1">
        <h1 className="text-3xl">{state.global.movie?.title}</h1>
        <Badge className=""><img src={calendar} alt="Release date:" className="inline"/> {state.global.movie?.release_date}</Badge>
        <Chip checked={checked} onChange={() => checkAndFavorite()}>Add to Favorites</Chip>
        <p>{state.global.movie?.overview}</p>
        <p><img src={vote} alt="votes:" className="inline"/> {state.global.movie?.vote_average} ({state.global.movie?.vote_count})</p>
        </Stack>
        </Group>
        </>
    )
}

export default MovieDetail