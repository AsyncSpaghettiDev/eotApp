// Styles
import './styles/AddPlate.css';

// Components
import Transition from '../Components/Transition.jsx';
import MenuPreview from '../Components/MenuPreview.jsx';
import OrderLoader from '../Components/OrderLoader.jsx';
import OrderFinished from '../Components/OrderFinished.jsx';
import CustomizePlate from '../Components/CustomizePlate.jsx';

// Imports
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Custom Hooks
import useCounter from '../CustomHooks/useCounter';
import useConfirmModal from '../CustomHooks/useConfirmModal';

const AddPlate = () => {
    // Hooks
    let navigate = useNavigate();
    let { state } = useLocation();
    const [table, setTable] = useState();
    const [step, setStep] = useState({});
    const [currentPlate, setCurrentPlate] = useState(undefined);
    const { counter, increase, decrease, reset, greaterOne } = useCounter();
    const { showModal, setShowConfirm, confirmResponse, resetResponse } = useConfirmModal();

    // Redirect on null table
    useEffect(() => {
        state === null ? navigate('/') : setTable(state.tableID);
        setStep({ one: 1, two: 0, three: 0, four: 0 });
    }, [state, navigate]);

    // Scroll to top when step one is going to disappear
    useEffect(() => {
        if (step.one === -1) window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }, [step]);

    // Functions
    const setQuantity = (value) => {
        setCurrentPlate({ ...currentPlate, quantity: value });
    }

    // Render section
    return (
        <section className="add_plate">
            <h2 className="order-title">{`Orden de la mesa #${table}`}</h2>
            <form onSubmit={(e) => e.preventDefault()} className="order">
                {
                    /**
                     * --------
                     * Step One
                     * --------
                     * 
                     * Show Menu
                     */
                }
                <article className={step.one ? step.one === -1 ? 'step fade' : 'step active' : 'step'} >
                    <MenuPreview
                        onTriggerStep={setStep}
                        onSelectedPlate={setCurrentPlate}
                    />
                </article>
                {
                    /**
                     * --------
                     * Step Two
                     * --------
                     * 
                     * Customize selected plate from previous step
                     */
                }
                <article className={step.two ? step.two === -1 ? 'step fade' : 'step active' : 'step'}>
                    {currentPlate !== undefined ? <CustomizePlate
                        id={currentPlate.id}
                        img={currentPlate.img}
                        name={currentPlate.name}
                        price={currentPlate.price}
                        description={currentPlate.description}
                        onShow={setShowConfirm}
                        onTriggerStep={setStep}
                        resetModal={resetResponse}
                        confirmStatus={confirmResponse}
                        onQuantity={setQuantity}
                        counter={counter}
                        increase={increase}
                        decrease={decrease}
                        reset={reset}
                        greaterOne={greaterOne}
                    /> : null}
                </article>
                {
                    /**
                     * ----------
                     * Step Three
                     * ----------
                     * 
                     * Fake form request with delay
                     */
                }
                <article className={step.three ? step.three === -1 ? 'step fade' : 'step active' : 'step'}>
                    <OrderLoader
                        onFocus={step.three === 1}
                        onTriggerStep={setStep}
                    />
                </article>
                {
                    /**
                     * ---------
                     * Step Four
                     * ---------
                     * 
                     * Order completed details
                     */
                }
                <article className={step.four ? step.four === -1 ? 'step fade' : 'step active' : 'step'}>
                    {currentPlate !== undefined ? <OrderFinished
                        name={currentPlate.name}
                        price={currentPlate.price}
                        quantity={currentPlate.quantity}

                        onTriggerStep={setStep}
                        reset={reset}
                    /> : null}
                </article>

            </form>
            {showModal(currentPlate !== undefined ? `¿Desea ordenar ${currentPlate.name}?` : "Contact support for help")}
            <Transition duration='1s' />
        </section>
    )
}

export default AddPlate;