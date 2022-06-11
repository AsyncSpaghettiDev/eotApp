// Styles
import './styles/ConfirmModal.css';

const ConfirmModal = ({title , description, onDismiss, onSelect}) => {
    // Handlers
    const dismissHandler = () => {
        onDismiss();
    }

    const responseHandler = e => {
        onSelect(e.target.value === 'true');
        onDismiss();
    }

    const propagationHandler = e => e.stopPropagation();

    return (
        <div className="dialog__container" onClick={dismissHandler}>
            <div onClick={propagationHandler} className='dialog' role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">
                <h2 className='dialog-title' id="dialogTitle"> {title} </h2>
                <p className='dialog-desc' id="dialogDesc"> {description} </p>
                <div className="dialog-buttons">
                    <button onClick={responseHandler} value={true} className='dialog-btn dialog-confirm'> Sí </button>
                    <button onClick={responseHandler} value={false} className='dialog-btn dialog-cancel'> Cancelar </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;