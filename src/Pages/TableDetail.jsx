// Styles
import './styles/TableDetail.css';

// Data
import Pizzas from "../Data/pizzas.json";
import Desserts from "../Data/desserts.json";
import FullMenu from "../Data/menu.json";

// Components
import Stopwatch from '../Components/Stopwatch.jsx';
import Transition from '../Components/Transition.jsx';
import PlateDetail from '../Components/PlateDetail.jsx';
import PlateStatusModal from '../Components/PlateStatusModal.jsx';

// Custom hooks
import useConfirmModal from '../CustomHooks/useConfirmModal';

// Images
import HeroImage from '../Images/hero.svg';
import AddFood from '../Images/addFood.svg';

// Imports
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const TableDetail = () => {
    // Hooks
    let { tableID } = useParams();
    const navigate = useNavigate();
    const [plates, setPlates] = useState([]);
    const [showStatus, setShowStatus] = useState(false);
    const [selectedPlate, setSelectedPlate] = useState({})
    const [detailedTable, setDetailedTable] = useState({});
    const { showModal, setShowConfirm, confirmResponse } = useConfirmModal();

    // useEffect
    useEffect(() => {
        if (confirmResponse) setDetailedTable({ ...detailedTable, status: 'pendiente' })
        else setDetailedTable({ ...detailedTable, status: 'ocupada' });
    }, [confirmResponse]);

    useEffect(() => {
        setPlates([
            { ...Pizzas[1], quantity: 2 },
            { ...Desserts[2], quantity: 5 },
            { ...Pizzas[15], quantity: 2 },
            { ...Pizzas[9], quantity: 1 },
            { ...Desserts[0], quantity: 1 },
            { ...Pizzas[5], quantity: 2 }
        ])
        // Fake Info
        const inTime = new Date();
        inTime.setMinutes(inTime.getMinutes() - 35);
        const outTime = new Date(inTime);
        outTime.setMinutes(inTime.getMinutes() + 65);

        setDetailedTable({
            status: 'ocupada',
            people: 7,
            in: inTime.getHours().toString().padStart(2, '0') + ":" + inTime.getMinutes().toString().padStart(2, '0'),
            out: outTime.getHours().toString().padStart(2, '0') + ":" + outTime.getMinutes().toString().padStart(2, '0')
        })
    }, [])

    // Handlers
    const showConfirmHandler = () => setShowConfirm(true);

    const showStatusHandler = (currentPlate) => {
        setSelectedPlate(currentPlate);
        setShowStatus(true);
    }

    const addHandler = () => {
        navigate('/dashboard/addPlate', {
            state: {
                tableID: tableID
            }
        });
    }
    // Render section
    return (
        <main className="table__detail">
            <Transition duration='1.5s' />
            <div className="table__hero">
                <img className="table__hero-img" src={HeroImage} alt="dashboard logo" />
                <h2 className="table__hero-title">{`Table No: ${tableID}`}</h2>
                {
                    detailedTable.status === 'ocupada' &&
                    <button className="table__hero-btn" onClick={addHandler}> <img src={AddFood} alt="add food icon eat on time" /> Ordenar</button>
                }
            </div>
            <div className="table__info">
                <span className="table__info-status">
                    {`Estado: ${detailedTable.status}`}
                    <span className={
                        detailedTable.status === 'ocupada'
                            ? 'table__info--active' :
                            detailedTable.status === 'pendiente' ? 'table__info--awaiting' :
                                'table__info--inactive'}
                    ></span>
                </span>
                <span className="table__info-people">{`Personas: ${detailedTable.people}`} </span>
                <span className="table__info-in">{`Hora de Entrada: ${detailedTable.in}`} </span>
                <Stopwatch
                    start={
                        {
                            hours: 0,
                            minutes: 58
                        }
                    }
                />
                <span className="table__info-out">{`Hora de Salida: ${detailedTable.out}`} </span>
            </div>
            <div className="table__plates">
                {
                    plates.map(plate =>
                        <PlateDetail
                            id={plate.id}
                            key={plate.id}
                            img={plate.img}
                            name={plate.name}
                            price={plate.price}
                            quantity={plate.quantity}
                            onClick={showStatusHandler}
                        />)
                }
            </div>
            <div className='table__form'>
                {detailedTable.status === 'ocupada' ?
                    <input onClick={showConfirmHandler} className='table__form-submit' type="button" value="Pedir Cuenta" />
                    : detailedTable.status === 'pendiente' ?
                        <output className='table__form-total'>{`Subtotal: $${plates.reduce((partialSum, a) => partialSum + (a.price * a.quantity), 0)} MXN`}</output>
                        : null}
            </div>
            {showStatus ?
                <PlateStatusModal
                    onDismiss={() => { setShowStatus(false) }}
                    // Cambiar por una consulta a la api para obtener toda la información junta
                    origin={tableID}
                    data={FullMenu.find(plate => plate.id === selectedPlate.id)}
                    time={"10:15am"}
                    status={"Servida"}
                /> : null}
            {showModal(`Pedir Cuenta Mesa #${tableID}`, '¿Desea solicitar la cuenta de la mesa?')}
        </main>
    )
}

export default TableDetail;