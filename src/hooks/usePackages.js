import { useState, useEffect } from 'react';
import axios from 'axios';

const usePackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllPackages = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/api/packages');
                setPackages(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllPackages();
    },[]);

    return {
        packages,
        loading,
        setPackages,
        setLoading
    }
}

export default usePackages;