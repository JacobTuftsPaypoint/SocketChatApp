import React, {useState, useEffect} from "react";

const Card=(movie)=>{
   
    const [movieImg, setMovieImg] = useState()

    useEffect(() => {
        if (movie.info.poster_path) {
            const moviePoster = movie.info.poster_path
            setMovieImg("https://image.tmdb.org/t/p/w500" + moviePoster)
        } else if(!movie.info.poster_path){
            const moviePoster = "https://img.icons8.com/carbon-copy/100/null/no-image.png" 
            setMovieImg(moviePoster)
        }
    })

    let img_path="https://image.tmdb.org/t/p/w500";
    return(
        <>
            <div className="movie">
                <img src={movieImg} className="poster" alt="poster-img"></img>
                <div className="movie-details">
                    <div className="box">
                        <h4 className="title">{movie.info.title}</h4>
                        <p className="rating">{movie.info.vote_average}</p>
                    </div>
                    <div className="overview">
                        <h1>overview</h1>
                        {movie.info.overview}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card;