import Searchbar from "../partials/SearchBar";
import VerticleCard from "../partials/VerticleCard";
import { useEffect, useState } from "react";
import axios from "../utlies/Axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from '../partials/ScrollToTop';
import Loader from '../partials/Loader';



function Trending() {
    const navigate = useNavigate();
    const [trending, setTrending] = useState([]); // Stores fetched movies
    const [page, setPage] = useState(1); // Tracks the current page
    const [hasMore, setHasMore] = useState(true); // Indicates if more pages are available

    const getTrending = async () => {
        try {
            let { data } = await axios.get(`/trending/all/day?page=${page}`);
            if (data.results && data.results.length > 0) {
                setTrending((prev) => [...prev, ...data.results]); // Append new results
                setHasMore(data.page < data.total_pages); // Check if more pages are available
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching movies:", err.message);
        }
    };

    useEffect(() => {
        getTrending(); // Fetch movies on component mount
    }, [page]); // Fetch more movies when the page changes

    const loadMore = () => {
        setPage((prev) => prev + 1); // Increment page to load more data
    };

    return trending ? (
        <section className="h-full bg-[#1F1E24]">
            <nav className="py-6 w-5/6 mx-auto flex items-start justify-between">
                <div className="flex items-center text-zinc-300">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line text-xl mr-2 cursor-pointer"
                    ></i>
                    <p className="text-lg font-semibold">Trending</p>
                </div>
                <Searchbar />
            </nav>
            <InfiniteScroll
                dataLength={trending.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more data to load</p>}
                className="flex flex-wrap items-center w-5/6 justify-center gap-5 mx-auto bg-[#1F1E24]"
            >
                <VerticleCard data={trending} />
            </InfiniteScroll>
                        <ScrollToTop showAt={200} />
            
        </section>
    ): <h1><Loader/></h1>;
}

export default Trending;
