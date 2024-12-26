import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import TrendingPage from '../Pages/Trending'
import PopularPage from '../Pages/Popular'
import MoviePage from '../Pages/MoviePage'
import TvshowPage from '../Pages/TvshowPage'
import PeoplePage from '../Pages/PeoplePage'
import DetailPage from '../Pages/DetailPage'
import PeopleDetail from '../Pages/PeopleDetail'
import Trailer from '../partials/Trailer'
import About from '../Pages/About'
import ContactPage from '../Pages/ContactPage'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/popular" element={<PopularPage />} />
      <Route path="/movies" element={<MoviePage />} />
      <Route path="/tvshow" element={<TvshowPage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/detail/people/:id" element={<PeopleDetail />} />
      <Route path="/detail/:type/:id" element={<DetailPage />} >
        <Route path='/detail/:type/:id/trailer/:key' element={<Trailer />} />
      </Route>
    </Routes>
  )
}

export default Routing;