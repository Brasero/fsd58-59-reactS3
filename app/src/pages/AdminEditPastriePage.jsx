import { useGetPastrieByIdQuery, useUpdatePastrieMutation } from "../features/api/apiSlice";
import { Link, Navigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useEffect, useState } from "react";

export default function AdminEditPastriePage () {
    const { pastrieId } = useParams();
    const [updatePastrie, updatePastrieRequest] = useUpdatePastrieMutation();
    const getPastrieRequest = useGetPastrieByIdQuery(pastrieId);

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');

    // On utilises un effect pour mettre à jour les données du state une fois la requête chargée
    useEffect(() => {
        if (!getPastrieRequest.isSuccess) {
            return;
        }

        setName(getPastrieRequest.data.name);
        setQuantity(getPastrieRequest.data.quantity);
        setImage(getPastrieRequest.data.image);
    }, [getPastrieRequest.isSuccess])

    function handleSubmitForm (e) {
        e.preventDefault();
        if (!name || !image || quantity === '') {
            return;
        }

        const pastrie = {...getPastrieRequest.data, name, quantity, image}
        console.log(pastrie);
        updatePastrie(pastrie);
    }

    if (updatePastrieRequest.isSuccess) {
        return <Navigate to="/admin" />;
    }

    return (
        <main>
            <h1>Administration</h1>
            <section className="crud-pastries">

                <h2>Modifier une patisserie</h2>
                {   getPastrieRequest.isLoading ? (
                        <Loader />
                    ) : (
                        <form method="POST" action="" onSubmit={handleSubmitForm}>
                            { updatePastrieRequest.isError && <p className='error'>Impossible de modifier la patisserie.</p> }

                            <label htmlFor='name'>Nom</label>
                            <input required id="name" name="name" type="text" disabled={updatePastrieRequest.isLoading} onChange={(e) => setName(e.target.value)} value={name} />

                            <label htmlFor='quantity'>Quantité</label>
                            <input required id="quantity" name="quantity" type="number" disabled={updatePastrieRequest.isLoading} onChange={(e) => setQuantity(e.target.value)} value={quantity} />

                            <label htmlFor='image'>Image</label>
                            <input required id="image" name="image" type="text" disabled={updatePastrieRequest.isLoading} onChange={(e) => setImage(e.target.value)} value={image} />

                            <Link to="/admin" className="btn">Annuler</Link>&nbsp;
                            <button disabled={updatePastrieRequest.isLoading}>Modifier la patisserie</button>
                        </form>
                    )
                }
            </section>
        </main>
    )
}