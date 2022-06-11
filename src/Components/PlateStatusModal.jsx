// Style
import './styles/PlateStatusModal.css';

const PlateStatusModal = ({ origin, data, time, status, onDismiss }) => {
    // Handlers
    const dismissHandler = () => {
        onDismiss();
    }
    const propagationHandler = e => e.stopPropagation();

    // Render section
    return (
        <div className="dialog__container" onClick={dismissHandler}>
            <div onClick={propagationHandler} className='dialog' role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">
                <h2 className="dialog-title"> {`Orden de la mesa #${origin}`} </h2>
                <p className='dialog-desc' id="dialogTitle"> {`Nombre del platillo: ${data.name}`} </p>
                <p className='dialog-desc' id="dialogDesc"> {`Costo: $${data.price} MXN`} </p>
                <p className='dialog-desc' id="dialogDesc"> {`Cantidad: ${data.quantity} pzs`} </p>
                <p className='dialog-desc' id="dialogDesc"> {`Hora de la orden: ${time}`} </p>
                <p className='dialog-desc' id="dialogDesc"> {`Estado actual: ${status}`} </p>
            </div>
        </div>
    )
}

export default PlateStatusModal;