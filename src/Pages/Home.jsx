import { useEffect, useState } from 'react';
import axios from '../utlies/Axios'
import Horizontalcard from '../partials/Horizontalcard';
import Searchbar from '../partials/SearchBar';
import { Link } from 'react-router-dom'
import Loader from '../partials/Loader';
import Footer from '../partials/Footer';

function Home() {
    const [treading, setTreading] = useState([]);
    const [show, setShow] = useState(false);
    const [theultimatedetails, setTheUltimateDetails] = useState(null);


    useEffect(() => {
        const getTreading = async () => {
            try {
                let { data } = await axios.get('/trending/all/day');
                let upcomingMovie = await axios.get(`movie/popular?language=en-IN`);
                let tvList = await axios.get(`/tv/popular?language=en-In&page=1`);
                // console.log(tvList.data.results)
                const fetchData = {
                    upcomingMovie: upcomingMovie.data.results,
                    tvList: tvList.data.results
                }
                setTheUltimateDetails(fetchData);
                // console.log(fetchData);
                setTreading(data.results);
            } catch (err) {
                console.log('Error occurred during fetching movies:', err.message);
            }
        };

        getTreading();
    }, []);

    const randomMovie = treading.length > 0 ? treading[Math.floor(Math.random() * treading.length)] : 'null';


    return treading.length ? (
        <section className='flex relative'>
            <aside className="w-1/5 border-r px-2 lg:px-10 py-6 hidden md:block">
                <h1 className="text-xl font-bold mb-6"><i className="ri-tv-fill mr-2 text-[#6556CD]"></i>CineMate</h1>
                <h2 className="mt-4 ">New Feeds</h2>
                <div className="flex items-start w-full justify-start flex-col py-3 space-y-3 text-zinc-400">
                    <Link to='/trending' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40'><i className="ri-fire-fill mr-2"></i>Treading</Link>
                    <Link to='/popular' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40'><i className="ri-bard-fill mr-2"></i>Popular</Link>
                    <Link to='/movies' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40'><i className="ri-movie-2-fill mr-2"></i>Movies</Link>
                    <Link to='/tvshow' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40' ><i className="ri-tv-fill mr-2"></i>Tv Shows</Link>
                    <Link to='/people' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40' ><i className="ri-team-fill mr-2"></i>People</Link>

                </div>
                <hr className="my-4" /> <h2 className="my-4 ">Website Information</h2>
                <div className="flex items-start justify-center flex-col py-4 space-y-3 w-full text-zinc-400">
                    <Link to='/about' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40'><i className="ri-information-fill mr-2"></i>About SCSDB</Link>
                    <Link to='/contact' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40'><i className="ri-phone-fill mr-2"></i>Contact Us</Link>
                </div>
            </aside>
            {/* window visible in mobile section only  */}
            <aside className={`w-3/4 sm:w-1/3 h-dvh z-10 bg-[#1F1E24] border-r absolute left-0 pl-5  py-6 ${show ? 'block' : 'hidden'}`}>
                <h1 className="text-xl font-bold mb-6"><i className="ri-tv-fill mr-2 text-[#6556CD]"></i>CineMate</h1>
                <h2 className="mt-4">New Feeds</h2>
                <div className="flex items-start w-full justify-start flex-col py-3 space-y-3 text-zinc-400">
                    <Link to='/trending' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40'><i className="ri-fire-fill mr-2"></i>Treading</Link>
                    <Link to='/popular' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40'><i className="ri-bard-fill mr-2"></i>Popular</Link>
                    <Link to='/movies' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40'><i className="ri-movie-2-fill mr-2"></i>Movies</Link>
                    <Link to='/tvshow' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40' ><i className="ri-tv-fill mr-2"></i>Tv Shows</Link>
                    <Link to='/people' className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40' ><i className="ri-team-fill mr-2"></i>People</Link>
                </div>
                <hr className="my-4" /> <h2 className="my-4 ">Website Information</h2>
                <div className="flex items-start justify-center flex-col py-4 space-y-3 w-full text-zinc-400">
                    <p className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40 '><i className="ri-information-fill mr-2"></i>About SCSDB</p>
                    <p className='hover:bg-[#6556CD] hover:text-white p-3 rounded-lg cursor-pointer w-40 '><i className="ri-phone-fill mr-2"></i>Contact Us</p>
                </div>
            </aside>
            <main className="w-full md:w-4/5 h-screen overflow-auto">
                <section className="sm:h-[10vh] w-full  max-sm:p-4 sm:flex items-center justify-center sm:gap-x-32 relative">
                    <h1 className="text-xl font-bold  md:hidden"><i className="ri-tv-fill mr-2 "></i>CineMate</h1>
                    <i onClick={() => (setShow(!show))} className={`${show ? 'ri-close-line' : 'ri-menu-line'} cursor-pointer text-xl absolute right-7 top-4 md:hidden`}></i>
                    <Searchbar />
                </section>
                <section className="h-[48vh] w-full  ">
                    {randomMovie && (
                        <section
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url('https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}')`
                            }}
                            className='h-[60vh] sm:h-[80vh] relative bg-cover bg-no-repeat bg-center'
                        >
                            <div className='absolute bottom-10 sm:left-10 left-4 w-5/6 sm:w-3/4 text-xs'>
                                <h1 className='text-3xl font-semibold'>{randomMovie.original_title || randomMovie.name}</h1>
                                <p className='my-2 '>{randomMovie.overview}</p>
                                <Link to={`/detail/${randomMovie.media_type}/${randomMovie.id}`} className='bg-[#6556CD] p-3 w-fit block rounded-md mt-4'>Know More</Link>
                            </div>
                        </section>
                    )}

                    <section className='w-full px-4 sm:px-10'>
                        <Horizontalcard description="Treading" data={treading} />
                        <Horizontalcard description="Upcoming" type={"movie"} data={theultimatedetails.upcomingMovie} />
                        <Horizontalcard description="Popular Tv show" type={"tv"} data={theultimatedetails.tvList} />
                    </section>
            <Footer/>

                </section>
            </main>

        </section>
    
    ) : <h1><Loader /></h1>
}

export default Home;