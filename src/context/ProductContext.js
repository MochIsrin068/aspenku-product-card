import {createContext, useEffect, useState} from 'react'
import API from '../services/API'

export const ProductContext = createContext()

const ProductContextProvider = ({children}) => {
    const [product, setProduct] = useState({
        isLoading : true,
        items :[]
    })

    const getListProduct = () => {
        API.listProduct().then(response => {
            if(response.statusCode === 200){
                setProduct({
                    isLoading : false,
                    items : response.data.rows
                })
            }
        })
    }

    useEffect(() => {   
        getListProduct()
    }, [])

    return(
        <ProductContext.Provider
            value={{
                product
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider