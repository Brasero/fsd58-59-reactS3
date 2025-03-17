import { useCreatePastrieMutation, useGetPastriesQuery } from "../features/api/apiSlice";
import { Link, Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useState } from "react";

export default function AdminAddPastriePage () {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [image, setImage] = useState('');

    const [createPastrie, mutationRequest] = useCreatePastrieMutation();

    function handleSubmitForm (e) {
        e.preventDefault();

        if (!name || !quantity || !image) {
            return;
        }

        createPastrie({name, quantity, image})
    }

    if (mutationRequest.isSuccess) {
        return <Navigate to="/admin" />;
    }

    return (
        <main>
            <h1>Administration</h1>
            <section className="crud-pastries">

                <h2>Ajouter une patisserie</h2>
                <form method="POST" action="" onSubmit={handleSubmitForm}>
                    { mutationRequest.isError && <p className='error'>Impossible de créer la patisserie.</p> }

                    <label htmlFor='name'>Nom</label>
                    <input required id="name" name="name" type="text" disabled={mutationRequest.isLoading} onChange={(e) => setName(e.target.value)} value={name} />

                    <label htmlFor='quantity'>Quantité</label>
                    <input required id="quantity" name="quantity" type="number" disabled={mutationRequest.isLoading} onChange={(e) => setQuantity(e.target.value)} value={quantity} />

                    <label htmlFor='image'>Image</label>
                    <input required id="image" name="image" type="text" disabled={mutationRequest.isLoading} onChange={(e) => setImage(e.target.value)} value={image} />

                    <Link to="/admin" className="btn">Annuler</Link>&nbsp;
                    <button disabled={mutationRequest.isLoading}>Créer la patisserie</button>
                </form>
            </section>
        </main>
    )
}