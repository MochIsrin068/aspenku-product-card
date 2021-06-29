import ReactStars from "react-rating-stars-component";
import {useHistory} from 'react-router-dom'

import ImageEmptyState from '../assets/images/empty.jpg'

const ProductCard = ({item}) => {
    const history  = useHistory()
    const BASE_URL = "https://apis-dev.aspenku.com"
    return(
        <div className="product__body__itemWrapper__card" onClick={() => history.push(`/detail/${item.permalink}`)}>
            <img src={`${BASE_URL}${item.SpreeProductImages[0].thumbnail_image}`} alt={item.SpreeProductImages[0].alternative_text}
                onError={(event) => {
                    event.target.onError = null
                    event.target.src = ImageEmptyState                                            
                }}
            />
            <ReactStars size={30} value={item.average_rating} edit={false}/>
            <h3 title={item.name}>{item.name}</h3>
            <div>
                <h4>$ {item.sell_price}</h4>
                <span>/ {item.unit_measure}</span>
            </div>
        </div>
    )
}

export default ProductCard