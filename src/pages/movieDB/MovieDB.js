import React, { useState, useEffect } from 'react';
import './MovieDB.css';
import * as api from '../../services/api';

function MovieDB() {

    const [movie, setMovie] = useState([{}]);

    const [movieList, setMovieList] = useState([{}]);

    const [movieQty, setMovieQty] = useState(0);

    const [firstLoad, setFirstLoad] = useState(true);

    const [movieCredits, setMovieCredits] = useState({});

    const [movieVideo, setMovieVideo] = useState({});

    const [movieHighlight, setMovieHighlight] = useState({});

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [SearchFind, setSearchFind] = useState({})

    async function getFind() {
        await api.request.get(api.search + api.apiText + api.key + "&query=" + search)
            .then(response => {
                setSearchFind(response.data.results)
                console.log(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            });
    }

    // if click enter key on search input field then call getFind function
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getFind()
        }
    }

    useEffect(() => {
        if (firstLoad === true) {
            getMoviesLocalStorage()
        }
    }, [])


    function getMoviesLocalStorage() {
        if (localStorage.getItem("Filmes Salvos") !== null) {
            var filmes = localStorage.getItem("Filmes Salvos");
            var filmesFormatados = JSON.parse(filmes);
            setMovieList(filmesFormatados);
            setMovieQty(filmesFormatados.length);
            setFirstLoad(false);
            console.log("aqui localstorage", filmesFormatados)
        }

    }

    async function getMovie(ID) {
        if (ID !== undefined) {
            if (VerifyExistingId(ID) === false) {

                await api.request.get(api.movie + ID + api.apiText + api.key)
                    .then(response => {
                        console.log("aqui", movieCredits)
                        var tempMovie =
                        {
                            movieTitle: response.data.title,
                            moviePoster: response.data.poster_path,
                            movieBackground: response.data.backdrop_path,
                            movieID: response.data.id,
                            movieRating: response.data.vote_average,
                            movieRelesed: response.data.release_date,
                            movieDuration: response.data.runtime,
                            movieOverview: response.data.overview,
                        }
                        getCredit(ID)
                        getVideo(ID)
                        console.log(movie.length)

                        var tempArray = movieList;
                        tempArray[movieList.length -1 ] = tempMovie;
                        setMovie([tempMovie]);
                        setMovieQty(movieQty + 1);
                        console.log("else", tempArray)
                        console.log("else", movieList)
                        setMovieList(tempArray);
                        localStorage.setItem("Filmes Salvos", JSON.stringify(tempArray))

                        console.log("else movielist", movieList)

                    })

                    .catch(error => {
                        console.log(error);
                    });

            }
            else {
                console.log("filme ja existe")
            }
        }
    }

    async function getCredit(ID) {
        await api.request.get(api.movie + ID + api.credits + api.apiText + api.key)
            .then(response => {
                var credito = {
                    creditos: response.data.cast,
                    id: ID,
                }
                var current = JSON.parse(localStorage.getItem("Creditos"))
                if (current === null) {
                    localStorage.setItem("Creditos", JSON.stringify([credito]))
                }
                else {
                    localStorage.setItem("Creditos", JSON.stringify([...current, credito]))
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    async function getVideo(ID) {
        await api.request.get(api.movie + ID + api.videos + api.apiText + api.key)
            .then(response => {
                var video = {
                    videos: response.data.results,
                    id: ID,
                }
                var current = JSON.parse(localStorage.getItem("Videos"))
                if (current === null) {
                    localStorage.setItem("Videos", JSON.stringify([video]))
                }
                else {
                    localStorage.setItem("Videos", JSON.stringify([...current, video]))
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    function VerifyExistingId(ID) {
        var existingId = false;

        var tempArray = movie

        tempArray.map((item) => {
            if (item.movieID === ID) {
                existingId = true
            }
        })

        return existingId;
    }

    function displayMovie(item) {
        setMovieHighlight(item)
    }



    return (
        <div className='containerMovieDB'>

            <div className='search'>

                <div className='inputDiv'>
                    <img src={api.lupa} onClick={() => {
                        getFind()
                    }} className="lupa" alt='search' style={{ width: "30px" }} />


                    <input
                        type="text"
                        placeholder="Buscar filme por nome"
                        className='searchInput'
                        value={search}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
                </div>

                {loading ? (
                    <div >
                    </div>
                ) : (
                    <div className='loaded-search'>
                        {SearchFind.map((item, index) => {
                            if (index > 5) {
                                return
                            }
                            return (
                                <div key={index}
                                    className='searchResult' onClick={() => {
                                        getMovie(item.id)
                                    }}>
                                    {item.title}
                                </div>
                            )

                        })}

                    </div>
                )}

            </div>

            <button onClick={() => {
                console.log(movieList)
            }}>log</button>

            {localStorage.getItem("Filmes Salvos") !== null ? (

                <div className='movieHighlightBackground'
                    style={{ backgroundImage: `url(${api.image + movieHighlight.movieBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                >
                    <div className='customBackground' >
                        <img src={api.image + movieHighlight.moviePoster} alt='movie' className='movieHighlightPoster' />
                        <div className='movieHighlightInfo'>
                            <h1>{movieHighlight.movieTitle}</h1>
                            <div className='MovieRating'>
                                <h2>{Math.round(movieHighlight.movieRating * 10)}% Avaliação dos usuários</h2>
                                <h2>{movieHighlight.movieDuration} Minutos</h2>
                                <h2>Lançado em: {movieHighlight.movieRelesed}</h2>
                            </div>
                            <div className='Sinopse'>
                                Sinopse:
                                <p>{movieHighlight.movieOverview}</p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div> </div>
            )}

            {
                movieHighlight.movieTitle !== undefined ? (

                    <div className='elenco'>
                        <h2>
                            Elenco Principal
                        </h2>
                        <div className='elencoShow'>
                            {movieHighlight.movieCast.length > 0 ? (

                                movieHighlight.movieCast.map((item, index) => {
                                    if (index > 5) {
                                        return
                                    }
                                    return (
                                        <div key={index} className='elencoItem'>
                                            <img src={api.image + item.profile_path} alt='movie' className='elencoItemPoster' />
                                            <h3>{item.name}</h3>
                                            <h4>{item.character}</h4>
                                        </div>
                                    )
                                })

                            ) : (
                                <div className='elencoShow'>
                                    Não há Dados</div>
                            )}
                        </div>

                    </div>

                ) : (
                    <div></div>
                )
            }


            {localStorage.getItem("Filmes Salvos") !== null ? (
                <div className='movieDiv'>

                    {movieList.movieTitle !== undefined ? (
                        <div className='movie' onClick={() => {
                            setMovieHighlight(movieList)
                        }}>
                            <img src={api.image + movieList.moviePoster} alt='movie' className='moviePoster' />
                            {movieList.movieTitle}
                            <br />
                            {Math.round(movieList.movieRating * 10)}%
                            <br />
                            Avaliação Dos usuários
                        </div>
                    ) : (
                        movieList.map((item, index) => {
                            return (
                                <div key={index} className='movie' onClick={() => {
                                    console.log(item)
                                    setMovieHighlight(item)
                                }}>
                                    <img src={api.image + item.moviePoster} alt='movie' className='moviePoster' />
                                    {item.movieTitle}
                                    <br />
                                    {Math.round(item.movieRating * 10)}%
                                    <br />
                                    Avaliação Dos usuários
                                    <br />
                                    {item.movieDuration} Minutos
                                    <br />
                                    Lançado em:     {item.movieRelesed}
                                </div>
                            )
                        })
                    )}


                </div>
            ) : (
                <div className='movieDiv'>
                    Não há filmes salvos
                </div>
            )}

        </div >
    )
}

export default MovieDB;
