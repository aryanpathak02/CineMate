import Searchbar from "../partials/SearchBar";
import VerticleCard from "../partials/VerticleCard";
import { useEffect, useState } from "react";
import axios from "../utlies/Axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from '../partials/ScrollToTop';
import Loader from '../partials/Loader';



function popular() {
    const navigate = useNavigate();
    const [popular, setpopular] = useState([]); 
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 
    const [category,setCategory] = useState('movie');

    const getpopular = async () => {
        try {
            let { data } = await axios.get(`/${category}/popular?page=${page}`);
            //  console.log(data.result);
            if (data.results && data.results.length > 0) {
                setpopular((prev) => [...prev, ...data.results]); 
                setHasMore(data.page < data.total_pages); 
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching movies:", err.message);
        }
    };

    useEffect(() => {
        getpopular();
    }, [page]); 

    const loadMore = () => {
        setPage((prev) => prev + 1); 
    };

    return popular.length ? (
        <section className="h-full bg-[#1F1E24]">
            <nav className="py-6 w-5/6 mx-auto flex items-start justify-between">
                <div className="flex items-center text-zinc-300">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line text-xl mr-2 cursor-pointer"
                    ></i>
                    <p className="text-lg font-semibold">popular</p>
                </div>
                <Searchbar />
            </nav>
            <InfiniteScroll
                dataLength={popular.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more data to load</p>}
                className="flex flex-wrap items-start w-5/6 justify-center gap-5 mx-auto bg-[#1F1E24]"
            >
                <VerticleCard data={popular} type={category} />
            </InfiniteScroll>
                        <ScrollToTop showAt={200} />
            
        </section>
    ) : <h1><Loader/></h1>;
}

export default popular;
