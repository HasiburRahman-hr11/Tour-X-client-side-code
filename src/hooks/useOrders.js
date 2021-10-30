import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useOrders = () => {

    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getAllOrders = async () => {
            try {
                const { data } = await axios.get(`https://tour-x-travel-package-api.herokuapp.com/api/orders`);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllOrders();

        const getUsersOrder = async () => {
            try {
                const { data } = await axios.get(`https://tour-x-travel-package-api.herokuapp.com/api/orders/user/${user._id}`);
                setUserOrders(data);
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
        userOrders,
        setUserOrders,
        loading,
        setLoading
    }
}

export default useOrders;