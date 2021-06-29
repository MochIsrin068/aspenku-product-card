import {useContext, useState} from 'react'
import {ProductContext} from '../../context/ProductContext'
import ProductCard from '../../components/ProductCard'
import EmptyState from './components/EmptyState'
import ProductLoader from './components/ProductLoader'

import LogoAspenku from '../../assets/images/logo-aspenku.png'

const ListProduct = () => {
    const productContext = useContext(ProductContext)
    const [filter, setfilter] = useState({
        key : "",
        sort : "asc"
    })

    const sortPriceAsc = (a, b) => a.sell_price - b.sell_price
    const sortPriceDesc = (a, b) => b.sell_price - a.sell_price
    const currentSort = filter.sort === "asc" ?  sortPriceAsc : sortPriceDesc

    return (
        <main className="product">
            <section className="product__header">
                <div className="product__header__banner">
                    <div>
                        <h3>Order import goods here</h3>
                        <p>You can order the imported goods you want from various countries on this platform</p>
                    </div>
                    <img src={LogoAspenku} alt="" />
                </div>
                <div className="product__header__search">
                    <div>
                        <input type="text" placeholder="Search..." onChange={({target : {value}}) => 
                            setfilter(prevState => ({...prevState, key : value.toUpperCase()}))
                        }/>
                        <button onClick={() => setfilter(prevState => ({...prevState, sort : prevState.sort === 'asc' ? 'desc' : 'asc'}))}>Sort By Price : {filter.sort}</button>
                    </div>
                </div>
            </section>  
            <section className="product__body">
                    {productContext.product.isLoading ? 
                            <ProductLoader />
                    : 
                        filter.key === "" ? productContext.product.items.length === 0 ? 
                            <EmptyState />
                        :  <div className="product__body__itemWrapper">
                            { productContext.product.items.sort(currentSort).map(item => {
                            return (
                                <ProductCard item={item}/>
                            )
                        })}
                        </div>  : productContext.product.items.filter(data => data.name.toUpperCase() === filter.key).length === 0 ? <EmptyState />  :   <div className="product__body__itemWrapper">
                            {
                                productContext.product.items.sort(currentSort).filter(data => data.name.toUpperCase() === filter.key).map(item => {
                                    return (
                                        <ProductCard item={item}/>
                                    )
                                }) 
                            }
                        </div>
                    }
            </section>
        </main>
    )
}

export default ListProduct