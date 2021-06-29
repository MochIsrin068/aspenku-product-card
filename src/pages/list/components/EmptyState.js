import {ReactComponent as ImageEmptyStateProduct} from '../../../assets/images/empty-product.svg'

const EmptyState = () => {
    return(
        <div className="emptyState">
            <ImageEmptyStateProduct />
            <p>Product Not Available</p>
        </div>
    )
}

export default EmptyState