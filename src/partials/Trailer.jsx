import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom';

function Trailer() {
    const {key} = useParams();
    const navigate = useNavigate();
    return (
        <section 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] backdrop-blur rounded-xl overflow-auto flex items-center justify-center"
        >
            <i onClick={()=>(navigate(-1))} className="ri-close-fill text-3xl cursor-pointer absolute right-5 top-5"></i>
            <div className='w-5/6 h-5/6'>

            <ReactPlayer width="100%" height="100%" controls  url={`https://www.youtube.com/watch?v=${key}`} />
            </div>
        </section>
    );
}

export default Trailer;
