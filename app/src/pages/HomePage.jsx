import { Link } from 'react-router-dom';
import { useGetPastriesQuery } from '../features/api/apiSlice';
import Pastrie from '../features/pastrie/Pastrie';
import Loader from '../components/Loader';

export default function HomePage () {
    const {
        data: pastries,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetPastriesQuery()
    
    if (isError) {
        return (
            <main>
                Error: { error.error }
            </main>
        )
    } 
    
    return (
        <main>
            <section className='section-play'>
                <h2>Jouez à notre jeu de Yam's pour tenter de remporter des lots !</h2>
                <Link to="/play" className='btn'>Jouer</Link>
            </section>
            <section className='section-lots'>
                <h2>Lots restants : </h2>
                { isFetching && <Loader /> }
                { isSuccess && (
                    <div className='lots-pastries'>
                        { 
                            pastries.map((pastrie) => (
                                pastrie.quantity > 0 && <Pastrie key={ pastrie.id } pastrie={ pastrie } />
                            )) 
                        }
                    </div>
                )}
            </section>
        </main>
    )
}