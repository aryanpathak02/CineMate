import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../utlies/Axios'
import Horizontalcard from "../partials/Horizontalcard";
import DetailSection from '../partials/DetailSection';
import Loader from '../partials/Loader';

function PeopleDetail() {
    const { id } = useParams();
    const [theultimatedetails, setTheUltimateDetails] = useState(null);
    const Navigate = useNavigate();

    const fetchPeople = async (id) => {
        try {
            const detail = await axios.get(`/person/${id}`);
            const externalid = await axios.get(`/person/${id}/external_ids`);
            const combinedCredits = await axios.get(
                `/person/${id}/combined_credits`
            );

            const tvCredits = await axios.get(`/person/${id}/tv_credits`);

            let fetchData = {
                detail: detail.data,
                externalid: externalid.data,
                combinedCredits: combinedCredits.data,
                tvCredits: tvCredits.data,
            };
            setTheUltimateDetails(fetchData);
            // console.log(fetchData);
        } catch (err) {
            console.log('Error while fetching person detail', err.message);
        }
    }

    useEffect(() => {
        fetchPeople(id);
    }, [id])


    if (!theultimatedetails) {
        return <Loader/>;
    }

    const { detail, externalid, combinedCredits, tvCredits } = theultimatedetails;
    return (
        <section className="mx-auto lg:w-5/6 p-4 text-zinc-400">
            <i onClick={() => Navigate(-1)} className="ri-arrow-left-line text-2xl cursor-pointer"></i>
            <section className="flex items-start flex-col sm:flex-row my-6">
                <div className="w-full sm:w-1/4 flex items-start justify-center flex-col space-y-4 px-4 text-sm  ">
                    <img className="w-48" src={`https://image.tmdb.org/t/p/original/${detail.profile_path}`} alt="{}" />
                    <hr className="w-full" />
                    <div className="space-x-2">
                        {externalid.wikidata_id && <a target="_blank" href={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`}>
                            <i className="cursor-pointer text-xl ri-earth-fill"></i>
                        </a>}

                        {externalid.facebook_id && <a href={`https://www.facebook.com/${externalid.facebook_id}`} target="_blank">
                            <i className="cursor-pointer text-xl ri-facebook-circle-fill"></i>
                        </a>}

                        {externalid.instagram_id &&
                            <a target="_blank" href={`https://www.instagram.com/${externalid.instagram_id}`}>
                                <i className="cursor-pointer text-xl ri-instagram-fill"></i>
                            </a>
                        }

                        {externalid.twitter_id && <a target="_blank" href={`https://twitter.com/${externalid.twitter_id}`}>
                            <i className="cursor-pointer text-xl ri-twitter-x-line"></i>
                        </a>}
                    </div>

                    <h2 className="text-2xl" >Person Info</h2>

                    <DetailSection title="Known For" content={detail.known_for_department} />
                    <DetailSection title="Gender" content={detail.gender === 1 ? "Female" : "Male"} />
                    <DetailSection title="Birthday" content={detail.birthday} />
                    <DetailSection title="DeathDay" content={detail.deathday || "Still Alive"} />
                    <DetailSection title="Place of Birth" content={detail.place_of_birth} />
                    <DetailSection title="Also Known As" content={detail.also_known_as} />

                </div>
                <div className="w-full sm:w-3/4 ">
                    <h1 className="text-4xl font-bold">{detail.name}</h1>
                    <p className="my-4 font-medium text-xl">Biography</p>
                    <p className="text-sm">{detail.biography}</p>

                    {combinedCredits.cast.length > 0 && (<Horizontalcard description='Cast in movie' type='movie' textSize="xl" data={combinedCredits.cast} />)}

                    {combinedCredits.crew.length > 0 && (<Horizontalcard description='Crew in Movie' type='movie' textSize="xl" data={combinedCredits.crew} />)}

                    {tvCredits.cast.length > 0 && (<Horizontalcard description='Cast in TV Series' textSize="xl" type='tv' data={tvCredits.cast} />)}

                    {tvCredits.crew.length > 0 && (<Horizontalcard description='Crew in TV Series' textSize="xl" type='tv' data={tvCredits.crew} />)}

                </div>
            </section>
        </section>
    )
}


export default PeopleDetail;