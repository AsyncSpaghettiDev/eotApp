// Styles
import './styles/OrderDetail.css';

const OrderDetail = ({
    productid,
    productcode,
    orderid,
    served,
    onShow,
    onSelect,
}) => {
    // Event Handlers
    const showConfirmHandler = () => {
        onSelect(productid)
        onShow(true);
    }

    // Render section
    return (
        <div className="order__detail" onClick={showConfirmHandler}>
            <p className="order__detail-productID"> ProductID: {productid} </p>
            <p className="order__detail-productCode"> ProductCode: {productcode} </p>
            <p className="order__detail-orderID"> OrderId: {orderid} </p>
            <p className="order__detail-served"> Servida: {served === 'TRUE' ? 'Sí' : 'No'} </p>
        </div>
    )
}

export default OrderDetail;