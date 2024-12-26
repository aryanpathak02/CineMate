import Loade from '../../public/loader.gif';

function Loader(){
    return(
        <div className='w-screen h-screen flex items-center bg-black justify-center'>

   <img src={Loade} alt="loading Image" />
        </div>
    )
}


export default Loader;