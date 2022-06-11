// Styles
import './styles/LinkPlateModal.css';

const LinkPlateModal = ({ onDismiss, data }) => {

    // Handlers
    const dismissHandler = () => {
        onDismiss();
    }

    const responseHandler = () => {
        // Change to update action
        console.log('Form submited');
        onDismiss();
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        console.dir(e.target[0].value);
    }

    const propagationHandler = e => e.stopPropagation();

    // Render section
    return (
        <div className="dialog__container" onClick={dismissHandler}>
            <div onClick={propagationHandler} className='dialog' role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">
                <form onSubmit={onSubmitHandler}>

                    <h2 className='dialog-title' id="dialogTitle"> Asignar platillo a un menú </h2>
                    <p
                        className='dialog-desc'
                        id="dialogDesc">
                        Seleccione un menú al que desea vincular el platillo <br/> {`${data.name} (${data.description}) `}
                    </p>
                    <select name="dialog-menu-options" id="dialog-menu-options" className="dialog-select">
                        <option value="menu__1">Menú #1</option>
                        <option value="menu__2">Menú #2</option>
                        <option value="menu__3">Menú #3</option>
                    </select>
                    <div className="dialog-buttons">
                        <button type='submit' value={true} className='dialog-btn dialog-confirm'> Aplicar cambios </button>
                        <button onClick={responseHandler} value={false} className='dialog-btn dialog-cancel'> Cancelar </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LinkPlateModal;