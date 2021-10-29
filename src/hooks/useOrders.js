import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useOrders = () => {

    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsersOrder = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/orders/${user._id}`);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        if (user._id) {
            getUsersOrder();
        }
    }, [user._id])

    return {
        orders,
        setOrders,
        loading,
        setLoading
    }
}

export default useOrders;