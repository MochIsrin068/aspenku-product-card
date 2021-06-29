import {useEffect, useState} from 'react'
import ReactStars from "react-rating-stars-component";
import {useParams} from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';
import Skeleton from 'react-loading-skeleton'

import API from '../../services/API'
import ImageEmptyState from '../../assets/images/empty.jpg'
import VerifiedImage from '../../assets/images/verified.png'


const DetailProduct = () => {
    const BASE_URL = "https://apis-dev.aspenku.com"
    const params = useParams()
    const permalink = params.permalink

    const [product, setProduct] = useState({
        isLoading : true,
        data : {}
    })

    const getDetailProduct = () => {
        API.detailProduct(permalink).then(response => {
            if(response.statusCode === 200){
                setProduct({
                    isLoading : false,
                    data : response.data
                })
            }
        })
    }

    useEffect(() => {
        getDetailProduct()
    },[])

    return(
        <div className="detail">
            <div className="detail__header">
                <h2>Detail Product</h2>
            </div>
            {product.isLoading ? 
                <div className="detail__body">
                    <div className="detail__body__product">
                        <section><Skeleton/></section>
                        <div><Skeleton/></div>
                    </div>
                    <div className="detail__body__info">
                        <Skeleton/>
                    </div>
                </div>
            : 
                <div className="detail__body">
                    <div className="detail__body__product">
                        <section>
                            <div>
                                <ReactImageZoom 
                                    width={200}
                                    height={200}
                                    zoomWidth={500}
                                    img={`${BASE_URL}${product.data.SpreeProductImages[0].main_image}`}
                                />
                                <ReactStars size={30} value={product.data.average_rating} edit={false}/>

                            </div>

                            <section>
                                <h2>{product.data.name}</h2>
                                <div>
                                    <h3>$ {product.data.sell_price}</h3>
                                    <span>/ {product.data.unit_measure}</span>
                                </div>
                                <section>
                                    <span>Minimum Order : {product.data.min_qty_order}</span>
                                    <span>Products in stock : {product.data.stock_on_hand} {product.data.unit_measure}</span>
                                    <span>Sold Product : {product.data.sold}</span>
                                    <span>Product Weight : {product.data.weight} Kg</span>
                                </section>
                            </section>
                        </section>
                        <div>
                            <img src={`${BASE_URL}${product.data.SpreeStore.image_banner_file_name}`} 
                            onError={(event) => {
                                event.target.onError = null
                                event.target.src = ImageEmptyState                                            
                            }}
                            />
                            <ReactStars size={30} value={product.data.SpreeStore.store_average_rating} edit={false}/>
                            <section>
                                <h3>{product.data.SpreeStore.store_name}</h3>
                                {product.data.SpreeStore.is_verified ?
                                    <img src={VerifiedImage} />
                                : null}
                            </section>
                            <div>
                                {product.data.SpreeStore.store_address}
                            </div>
                        </div>
                    </div>
                    <div className="detail__body__info">
                        <h3>Description</h3>
                        <div 
                            dangerouslySetInnerHTML={{__html : product.data.description}}
                        ></div>
                    </div>
                </div>            
            }   
        </div>
    )
} 

export default DetailProduct