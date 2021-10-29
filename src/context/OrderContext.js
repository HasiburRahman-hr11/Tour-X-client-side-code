import { createContext } from 'react'
import useOrders from '../hooks/useOrders';

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
    const allContext = useOrders();
    return (
        <OrderContext.Provider value={allContext}>
            {children}
        </OrderContext.Provider>
    )
}
export default OrderContextProvider;