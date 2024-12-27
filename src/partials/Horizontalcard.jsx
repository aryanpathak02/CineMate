import { Link } from "react-router-dom";

function Horizontalcard({data,description,type=null,textSize='3xl'}){
    // console.log(data)
    return (
        <section className="w-full py-6">
              <h3 className={`font-bold text-zinc-400 text-${textSize}`}>{description}</h3>
                <div className="flex flex-nowrap items-start overflow-x-auto space-x-5 my-8">
                    {data.map((element, index) => (
                        <Link to={`/detail/${element.media_type || type}/${element.id}`} className="w-36 sm:w-48 bg-zinc-800 flex-none mb-6" key={index}>
                            <img className="w-full object-contain" src={element.poster_path ? `https://image.tmdb.org/t/p/original/${element.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500`} alt="movie/tv-poster" />
                            <div className="py-2 px-4">
                                <h4 className="sm:text-xl my-3">{element.original_title || element.name}</h4>
                                <p className="text-xs">{element.overview.slice(0,50)} ...<span className="text-blue-500">more</span></p>
                            </div>
                        </Link>
                    ))}
                </div>
        </section>
    )
}


export default Horizontalcard;