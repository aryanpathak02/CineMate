import image from '../../public/404image.gif';

function Notfound(){
    return(
           <div className='relative w-full h-dvh md:h-full bg-black flex items-center justify-start flex-col text-zinc-300'>
            <h1 className='text-[8rem] mt-32'>404</h1>
            <h2 className='text-3xl mb-4 text-center'>Page not found</h2>
            <p className='text-sm w-2/3 sm:w-1/3 text-center'>Oops... The link you clicked may be broken or the page may have been removed.We're sorry </p>
            <img className='w-full object-contain absolute bottom-0' src={image} alt="image_404" />
           </div>
    )
}


export default Notfound;