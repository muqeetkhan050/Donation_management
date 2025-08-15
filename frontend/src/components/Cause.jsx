import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Cause = () => {

    const { user } = useAuth();
    const [FormData, setFormData] = useState({ title: '', description: '' });
    const navigate = useNavigate();
    return (
        <>


            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">Your Form Name: Donation cause</h1>
                <input
                    type='text'
                    placeholder='title'
                    value={FormData.value}
                    onChange={(e) => setFormData({ ...FormsData, title: e.targer.value })}>
                </input>

            </form>

        </>
    )
}

export default Cause;