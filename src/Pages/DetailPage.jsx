import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../utlies/Axios";
import Horizontalcard from "../partials/Horizontalcard";
import { Outlet } from "react-router-dom";
import Loader from '../partials/Loader';

function DetailPage() {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const [theultimatedetails, setTheUltimateDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarLoading, setSimilarLoading] = useState(false);
    const [recommendationsLoading, setRecommendationsLoading] = useState(false);

    // Function to fetch details
    const fetchdetails = async (id) => {
        try {
            setLoading(true);
            const detail = await axios.get(`/${type}/${id}`);
            const externalid = await axios.get(`/${type}/${id}/external_ids`);
            const recommendations = await axios.get(`/${type}/${id}/recommendations`);
            const similar = await axios.get(`/${type}/${id}/similar`);
            const translations = await axios.get(`/${type}/${id}/translations`);
            const videos = await axios.get(`/${type}/${id}/videos`);
            const watchproviders = await axios.get(`/${type}/${id}/watch/providers`);

            const fetchedData = {
                detail: detail.data,
                externalid: externalid.data,
                recommendations: recommendations.data.results,
                similar: similar.data.results,
                translations: translations.data.translations.map(
                    (t) => t.english_name
                ),
                videos: videos.data.results.find((m) => m.type === "Trailer"),
                watchproviders: watchproviders.data.results.IN,
            };
            setTheUltimateDetails(fetchedData);
            setLoading(false);
        } catch (err) {
            console.log(`Error found while fetching detail page ${err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchdetails(id);
    }, [id, type]);

    // Fetch similar or recommendations when needed
    const fetchSimilarOrRecommendations = async (type) => {
        if (type === "similar") {
            setSimilarLoading(true);
            const similar = await axios.get(`/${type}/${id}/similar`);
            setTheUltimateDetails(prevDetails => ({
                ...prevDetails,
                similar: similar.data.results
            }));
            setSimilarLoading(false);
        } else if (type === "recommendations") {
            setRecommendationsLoading(true);
            const recommendations = await axios.get(`/${type}/${id}/recommendations`);
            setTheUltimateDetails(prevDetails => ({
                ...prevDetails,
                recommendations: recommendations.data.results
            }));
            setRecommendationsLoading(false);
        }
    };

    // Show loading state
    if (loading) {
        return <Loader />;
    }

    // Destructure fetched details for easy access
    const { detail, recommendations, externalid, watchproviders, similar, videos } = theultimatedetails;

    return (
        <section
            style={{
                backgroundImage: detail.backdrop_path
                    ? `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`
                    : undefined,
            }}
            className="w-full relative overflow-auto bg-center bg-cover bg-no-repeat text-white px-6 sm:px-10 lg:px-20 xl:px-40 py-4"
        >
            <nav className="flex items-center gap-10 max-md: mt-4">
                <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-2xl cursor-pointer"></i>
                <a target="_blank" href={detail.homepage}>
                    <i className="ri-external-link-fill text-2xl"></i>
                </a>
                <a target="_blank" href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}>
                    <i className="ri-earth-fill text-2xl"></i>
                </a>
                <a target="_blank" href={`https://www.imdb.com/title/${externalid.imdb_id}/`}>
                    imdb
                </a>
            </nav>

            <main className="my-10 flex gap-10 flex-wrap">
                <div>
                    <img
                        className="w-72 object-contain shadow-xl"
                        src={detail.poster_path ? `https://image.tmdb.org/t/p/original/${detail.poster_path}` : undefined}
                        alt="movie_poster"
                    />
                </div>
                <div className="space-y-4 flex-1">
                    <h1 className="text-4xl font-bold">{detail.title || detail.name}</h1>
                    <div className="text-xs space-x-5 flex-wrap flex items-center ">
                        <span className="bg-[#CA8A04]  rounded-full w-10 h-10 font-bold flex items-center justify-center">
                            {Math.floor(detail.vote_average * 10)}%
                        </span>
                        <span className="text-xl my-2">User Score</span>
                        <span>{detail.release_date || detail.first_air_date}</span>
                        <span>{detail.genres.map((elem, index) => (<span key={index} className="mr-1">{elem.name}</span>))}</span>
                        <span>{detail.runtime}  </span>
                    </div>
                    <p className="text-zinc-300 italic font-semibold">{detail.tagline}</p>
                    <h2 className="text-lg font-semibold">Overview</h2>
                    <p className="text-sm">{detail.overview}</p>
                    <h2 className="text-lg font-semibold">Movie Translated</h2>
                    <p className="text-sm mb-4">{theultimatedetails.translations.join(", ")}</p>

                    {videos?.key ? (
                        <Link to={`${currentPath}/trailer/${videos.key}`} className="bg-[#6556CD] inline-block p-4 w-fit rounded-lg text-sm">
                            <i className="ri-play-fill"></i> Play Trailer
                        </Link>
                    ) : (
                        <p className="text-gray-500">No trailer available</p>
                    )}
                </div>
            </main>
            <aside>
                {watchproviders && watchproviders.flatrate && (
                    <div className=" text-white py-6">
                        <h1>Available on Platfotms</h1>
                        <div className="flex items-center mt-3 flex-wrap gap-x-6">
                            {watchproviders.flatrate.map((w, i) => (
                                <img
                                    key={i}
                                    title={w.provider_name}
                                    className="w-[5vh] m-2 h-[5vh] object-cover rounded-md"
                                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>
                    </div>
                )}

                {watchproviders && watchproviders.rent && (
                    <div className=" text-white py-4">
                        <h1>Available on Rent</h1>
                        <div className="flex items-center mt-3 flex-wrap gap-x-6">

                            {watchproviders.rent.map((w, i) => (
                                <img
                                    key={i}
                                    title={w.provider_name}
                                    className="w-[5vh] h-[5vh] m-1 object-cover rounded-md"
                                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>

                    </div>
                )}

                {watchproviders && watchproviders.buy && (
                    <div className="text-white py-4">
                        <h1>Available to Buy</h1>
                        <div className="flex items-center mt-3 flex-wrap gap-x-6">
                            {watchproviders.buy.map((w, i) => (
                                <img
                                    key={i}
                                    title={w.provider_name}
                                    className="w-[5vh] m-1 h-[5vh] object-cover rounded-md"
                                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {detail.seasons ? (
                <>
                    <hr />
                    <section className="w-full py-6">
                        <h3 className={`font-bold text-zinc-400 text-3xl`}>Seasons</h3>
                        <div className="flex flex-nowrap items-start overflow-x-auto space-x-5 my-8">
                            {detail.seasons.map((element, index) => (
                                <div className="w-36 sm:w-48 flex-none mb-6" key={index}>
                                    <img className="w-full object-contain" src={element.poster_path ? `https://image.tmdb.org/t/p/original/${element.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500`} alt="movie/tv-poster" />
                                    <div className="py-2 px-4">
                                        <h4 className="sm:text-xl my-3">{element.original_title || element.name}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section></>) : null}




            {/* Loader for recommendations or similar */}
            {recommendationsLoading || similarLoading ? <Loader /> : null}



            <hr />

            <Horizontalcard data={recommendations.length > 0 ? recommendations : similar} description={"Recommendations & Similar stuff"} type={type} />


            <Outlet />
        </section>
    );
}

export default DetailPage;
