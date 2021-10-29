import { createContext } from 'react'
import usePackages from '../hooks/usePackages';

export const PackageContext = createContext();



const PackageContextProvider = ({ children }) => {
    const allContext = usePackages();
    return (
        <PackageContext.Provider value={allContext}>
            {children}
        </PackageContext.Provider>
    )
}
export default PackageContextProvider;