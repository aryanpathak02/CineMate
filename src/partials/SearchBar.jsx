import { useEffect } from "react";
import { useState } from "react";
import axios from '../utlies/Axios';
import {Link} from 'react-router-dom'

function Searchbar() {
  const [query, setQuery] = useState('');
  const [searches, setsearches] = useState([]);

  const searchKey = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      console.log(data.results);
      setsearches(data.results);
    } catch (err) {
      console.log(`Error while searching a move ${err.message}`);
    }
  }

  useEffect(() => {
    searchKey()
  }, [query])

  return (
    <section className="space-x-4 flex max-sm:mt-6 items-center sm:w-2/4 relative">
      <i className="ri-search-line"></i>
      <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className="bg-[#1F1E24] outline-none  w-full pl-3 py-2" placeholder="Search here" />
      {query.length > 0 && (

        <i onClick={() => setQuery('')} className="ri-close-line cursor-pointer"></i>
      )}
      {query.length > 0 && (
        <div className="bg-zinc-100 text-black max-h-[40vh] overflow-auto absolute top-[100%] left-4  w-[88%] z-20 rounded-lg p-4" >
          {searches.map((elem, index) => (
            <Link to={`/detail/${elem.media_type}/${elem.id}`} key={index} className="flex items-center justify-start gap-3 my-2 cursor-pointer hover:bg-zinc-300 p-4 rounded-lg">
              <img className="w-16 h-16 rounded-md object-contain" src={elem.poster_path ? `https://image.tmdb.org/t/p/original${elem.poster_path}` : `https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=612x612&w=0&k=20&c=4X-znbt02a8EIdxwDFaxfmKvUhTnLvLMv1i1f3bToog=`} alt="" />
              <p className="text-sm w-60">{elem.original_name || elem.title}</p>
            </Link>
          ))}
        </div>
      )}

    </section>
  )
}

export default Searchbar;