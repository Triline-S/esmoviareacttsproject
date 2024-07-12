import { useState, useEffect, useContext } from "react";
import { bringMovies, searchMovieCriteria } from "../../services/api-calls";
import { myContext } from "../../app/context";
import { useNavigate } from "react-router-dom";

//React Bootstrap
import { Container, Row, Col } from "react-bootstrap";
import { CCard } from "../../common/CCard/CCard";
import { Movie } from "../../interfaces";

function Home() {
  const [movies, setMovies] = useState([]);
  const { state, SetAuth } = useContext(myContext);
  const navigate = useNavigate();

  const getMovies = async () => {
    bringMovies()
      .then((res) => {
        setMovies(res.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (movies.length === 0) {
      getMovies();
    }

    console.log(movies);
  }, [movies]);

  useEffect(() => {
    //The trick here consists in the fact that we are following the state with the useEffect,
    //so every time we change the state we alter the movies data hook, not the state hook.

    if (state.global.search !== "") {
      const bringSearchedMovies = async () => {
        searchMovieCriteria(state.global.search)
          .then((res) => {
            setMovies(res.results);
          })
          .catch((error) => console.log(error));
      };
      const bring = setTimeout(() => {
        bringSearchedMovies();
      }, 275);

      return () => clearTimeout(bring);
    } else if (state.global.search === "") {
      getMovies();
    }
  }, [state]);

  const selectMovie = (movie: Movie) => {
    SetAuth("movie", movie);
    navigate("/moviedetail");
  };

  return (
    <div>
      {movies.length > 0 ? (
        //I have got the movies
        <Container>
          <Row>
            {movies.map((movie) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={movie.id}>
                  <div onClick={() => selectMovie(movie)}>
                    <CCard movie={movie} />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <div>LOADING.......</div>
      )}
    </div>
  );
}

export default Home;