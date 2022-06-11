// Imports
import { useEffect } from 'react';

// Styles
import './styles/CustomizePlate.css';

const CustomizePlate = (
    {
        img,
        name,
        price,
        description,
        onShow,
        confirmStatus,
        onTriggerStep,
        resetModal,
        onQuantity,
        counter,
        increase,
        decrease,
        reset,
        greaterOne
    }) => {

    // useEffects
    useEffect(() => {
        if (confirmStatus) {
            confirmTrigger();
            resetModal();
        }
    }, [confirmStatus]);

    useEffect(() => onQuantity(counter), [counter]);

    // Functions
    const formatMoney = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    // Event Handlers
    const showConfirmHandler = () => {
        onShow(true);
    }

    const confirmTrigger = () => {
        onTriggerStep({ one: 0, two: -1, three: 1, four: 0 });
    }

    const returnTrigger = () => {
        onTriggerStep({ one: 1, two: -1, three: 0, four: 0 });
        reset();
    }

    // Render Section
    return (
        <div className="customize__plate">
            <img className='plate-image' src={img} alt="plate" />
            <h3 className="plate-name"> {name} </h3>
            <p className="plate-price"> {`$${formatMoney(counter * price)} MXN`} </p>
            <p className="plate-desc"> {description} </p>
            <div className="plate__counter">
                <button onClick={decrease} className="plate__counter-btn" disabled={(!greaterOne())} >-</button>
                <output className="plate__counter-res">{counter.toString().padStart(2, 0)}</output>
                <button onClick={increase} className="plate__counter-btn">+</button>
            </div>
            <button className="plate-confirm" onClick={showConfirmHandler} >Ordenar</button>
            <button className='reload-menu' onClick={returnTrigger}>Volver al menú</button>
        </div>
    )
}

export default CustomizePlate;