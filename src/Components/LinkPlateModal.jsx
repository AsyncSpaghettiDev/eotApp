// Styles
import { useEffect, useState } from 'react';
import './styles/LinkPlateModal.css';

const LinkPlateModal = ({ onDismiss, data }) => {
    const [menuNames, setMenuNames] = useState([]);
    // useEffect
    useEffect(() => {
        fetchMenusNames();
    }, []);

    // Handlers
    const dismissHandler = () => {
        onDismiss();
    }

    const responseHandler = e => {
        e.preventDefault();
        onDismiss();
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        // Change to update action
        fetch(`/api/menu/updateLinkedMenu/${data.plate__id}`, {
            method: 'PUT',
            body: JSON.stringify({
                plate__menu__id: e.target[0].value
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json()).then(data => {
                console.log(data);
                onDismiss();
            });
    }

    const propagationHandler = e => e.stopPropagation();

    // Functions
    const fetchMenusNames = () => {
        fetch('/api/menu/getMenus').then(res => res.json()).then(data => setMenuNames(data));
    }

    // Render section
    return (
        <div className="dialog__container" onClick={dismissHandler}>
            <div onClick={propagationHandler} className='dialog' role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogDesc">
                <form onSubmit={onSubmitHandler}>

                    <h2 className='dialog-title' id="dialogTitle"> Asignar platillo a un menú </h2>
                    <p
                        className='dialog-desc'
                        id="dialogDesc">
                        Seleccione un menú al que desea vincular el platillo <br /> {data.plate__name}
                    </p>
                    <select name="dialog-menu-options" id="dialog-menu-options" className="dialog-select">
                        {
                            menuNames.length > 0 && menuNames.map(mn => <option key={mn.menu__id} value={mn.menu__id}>{mn.menu__name}</option>)
                        }
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