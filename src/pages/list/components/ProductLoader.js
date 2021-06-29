import Skeleton from 'react-loading-skeleton'

const ProductLoader = () => {
    return (
        <div className="product__body__itemWrapper">
            {Array.apply(null, Array(6)).map(item => {
                return <div className="skeletonWrapper"><Skeleton/></div>
            })}
        </div>
    )
}

export default ProductLoader