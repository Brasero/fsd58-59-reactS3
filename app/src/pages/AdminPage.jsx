import { useDeletePastrieMutation, useGetPastriesQuery } from "../features/api/apiSlice";
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

export default function AdminPage () {
    const pastriesQuery = useGetPastriesQuery();
    const [deletePastrie, deletePastrieRequest] = useDeletePastrieMutation();

    function handleDeletePastrie (e, pastrieId) {
        e.preventDefault();
        if (deletePastrieRequest.isLoading) {
            return;
        }
        if(confirm("Etes-vous sûr de vouloir supprimer cette pâtisserie ? \n Cette action est irréversible")){
            deletePastrie(pastrieId);
        }
    }

    return (
        <main>
            <h1>Administration</h1>
            <section className="crud-pastries">

                <h2>Liste des patisseries</h2>
                <div className="center">
                    <Link to="/admin/pastrie/add" className="btn">Ajouter une pâtisserie</Link>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Quantités restantes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pastriesQuery.isLoading ? (
                                <tr>
                                    <td rowSpan="4"><Loader /></td>
                                </tr>
                            ) : (
                                pastriesQuery.data.map(pastrie => (
                                    <tr key={pastrie.id} >
                                        <td><img src={ `/public/img/${pastrie.image}` } /></td>
                                        <td>{pastrie.name}</td>
                                        <td>{pastrie.quantity}</td>
                                        <td>
                                            <a className={'btn ' + (deletePastrieRequest.isLoading && 'disable')} onClick={(e) => handleDeletePastrie(e, pastrie.id)}>Supprimer</a>
                                            <Link className="btn" to={ `/admin/pastrie/edit/${ pastrie.id }` }>Modifier</Link>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </section>
        </main>
    )
}