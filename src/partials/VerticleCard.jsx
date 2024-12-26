import { Link } from "react-router-dom";

function VerticleCard({ data , type }) {

    console.log(data)

    return (
        <>
            {data.map((elem, index) => (
                <Link to={`/detail/${type || elem.media_type || 'people'}/${elem.id}`} key={index} className="w-52 pb-4 cursor-pointer">
                    <img className="w-full object-contain" src={
                        elem.poster_path
                            ? `https://image.tmdb.org/t/p/original${elem.poster_path}`
                            : elem.profile_path
                                ? `https://image.tmdb.org/t/p/original${elem.profile_path}`
                                : `https://t4.ftcdn.net/jpg/07/95/29/45/360_F_795294547_gaBzWLhkAYBSz1ZUIZssHhvzGzstNmHK.jpg`
                    } alt="movie-poster" loading="lazy" />
                    <p className="text-xl my-4 text-zinc-300">{elem.title || elem.original_title || elem.original_name}</p>
                </Link>

            ))}

        </>
    )
}


export default VerticleCard;