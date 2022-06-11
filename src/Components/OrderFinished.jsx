// Styles
import './styles/OrderFinished.css';

// Resources
import CheckImg from '../Images/check.svg';

const OrderFinished = ({
    name,
    price,
    quantity,
    onTriggerStep,
    reset
}) => {
    // Fake info, backend must provide it
    const currentTime = new Date();
    const randomnumber = Math.ceil(Math.random() * 100);

    // Functions
    const formatMoney = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    // Event Handlers
    const returnTrigger = () => {
        onTriggerStep({ one: 1, two: 0, three: 0, four: -1 });
        reset();
    }

    // Render Section
    return (
        <div className="order-finished">
            <img className='order-img' src={CheckImg} alt="order completed successfully" />
            <p className="order-title">Orden completada con éxito, a continuación se muestran los detalles de la orden</p>
            <p className="order-number"> {`Orden No.${randomnumber}`} </p>
            <p className="order-plate-name"> {`Nombre del platillo: ${name}`} </p>
            <p className="order-plate-price"> {`Subtotal: $${formatMoney(price * quantity)} MXN`} </p>
            <p className="order-plate-quantity"> {`Cantidad ordenada: ${quantity}`} </p>
            <p className="order-time">
                {`Hora de la orden: ${
                    currentTime.getHours().toString().padStart(2, '0') +
                    ":" +
                    currentTime.getMinutes().toString().padStart(2, '0')
                }`}
            </p>
            <button className='reload-menu' onClick={returnTrigger}>Volver al menú</button>
        </div>
    )
}

export default OrderFinished;