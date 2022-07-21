// Imports
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../Utils/AuthContext';

// Styles
import './styles/TableDashboard.css';

// Images
import HeroImage from '../Images/hero.svg';

// Components
import Transition from '../Components/Transition.jsx';
import TableResume from '../Components/TableResume.jsx';

// Custom Hooks
import useFormModal from '../CustomHooks/useFormModal';

const TableDashboard = () => {
    // Hooks
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const { showFormModal, setShowForm, formResponse, resetFormResponse } = useFormModal();
    const [modalConfiguration, setModalConfiguration] = useState(undefined);
    const { authContextApi } = useContext(AuthContext);

    // Inputs for modal configs
    const inputConfigAdd = [
        {
            "id": "table-number",
            "label": "Número de mesa",
            "input__type": "number",
            "style": {
                "width": "12ch"
            }
        },
        {
            "id": "table-capacity",
            "label": "Capacidad de la mesa",
            "input__type": "number",
            "style": {
                "width": "12ch"
            }
        },
        {
            "id": "table-status",
            "label": "Estado de la mesa",
            "input": true,
            "input__type": "radio",
            "radios__name": "table-status-actual",
            "radios__buttons": [
                {
                    "id": "table-status-free",
                    "label": "Disponible",
                    "checked": true
                },
                {
                    "id": "table-status-busy",
                    "label": "Ocupada"
                }
            ]
        }
    ]

    // Configs
    const configurationAdd = {
        title: 'Registar nueva mesa',
        description: 'Agregar mesa del restaurant',
        inputs: inputConfigAdd,
        confirmButtonText: 'Añadir',
        onSubmitAction: () => console.log('success')
    }

    // UseEffect
    useEffect(() => {
        fetchTables();
    }, []);

    useEffect(() => {
        if (formResponse) {
            resetFormResponse();
            setTimeout((setShowForm(false), 500))
        }
    }, [formResponse]);

    useEffect(() => {
        if (selectedTable !== null) {

            const inputConfigUpdate = [
                {
                    "id": "table__id",
                    "label": "Número de mesa",
                    "input__type": "number",
                    "style": {
                        "width": "12ch"
                    },
                    "readOnly": true,
                    "defaultValue": selectedTable.table__id
                },
                {
                    "id": "table__capacity",
                    "label": "Capacidad de la mesa",
                    "input__type": "number",
                    "style": {
                        "width": "12ch"
                    },
                    "defaultValue": selectedTable.table__capacity
                }
            ]

            const configurationUpdate = {
                title: 'Actualizar mesa',
                description: 'Actualizar mesa del restaurant',
                inputs: inputConfigUpdate,
                confirmButtonText: 'Actualizar',
                onSubmitAction: async ({ table__id, table__capacity }) => {
                    await fetch(`/api/dashboard/tables/${table__id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            table__capacity
                        }),
                        headers: { "Content-Type": "application/json" }
                    })
                    fetchTables();
                }
            }
            setModalConfiguration(configurationUpdate);
            setShowForm(true);
            setSelectedTable(null);
        }
    }, [selectedTable]);

    // Handlers
    const onNewHandler = () => {
        setModalConfiguration(configurationAdd);
        setShowForm(true);
    }

    const onToggleEditMode = () => {
        setEditMode(!editMode);
    }

    const onUpdateHandler = (tblNo) => {
        setSelectedTable(tables.find(tbl => tbl.table__id === tblNo));
    }

    // Functions
    const fetchTables = () =>
        fetch('/api/dashboard/tables')
            .then(res => res.json())
            .then(data => setTables(data));

    // Render Section
    return (
        <section className="table__dashboard">
            <Transition duration='2s' />

            <div className="dashboard__hero">
                <img className="dashboard__hero-img" src={HeroImage} alt="dashboard logo" />
                <h2 className="dashboard__hero-title">Mesas {editMode && "(Edit Mode)"} </h2>
            </div>
            {
                authContextApi.role === 'ADMIN' &&
                <div className="dashboard__new">
                    <button className="dashboard__new-add" onClick={onNewHandler}>Agregar Mesa</button>
                    <button className="dashboard__new-add" onClick={onToggleEditMode}>Alternar modo editar</button>
                </div>
            }
            <table className="dashboard__resume">
                <tbody>
                    <tr className="dashboard__resume__headers">
                        <th>No. de Mesa</th>
                        <th>Capacidad</th>
                        <th>Disponible</th>
                        <th>Habilitar mesa</th>
                    </tr>
                    {
                        tables.map(table =>
                            <TableResume
                                key={table.table__id}
                                tableNo={table.table__id}
                                freeSeat={table.table__capacity}
                                busy={!table.table__isFree}
                                editingMode={editMode}
                                onClick={onUpdateHandler}
                                updateTables={fetchTables}
                            />)
                    }
                </tbody>
            </table>
            {modalConfiguration && showFormModal(modalConfiguration)}
        </section>
    )
}

export default TableDashboard;