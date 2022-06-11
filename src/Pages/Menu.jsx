// Imports
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import useFormModal from '../CustomHooks/useFormModal';

// Data
import FullMenu from "../Data/menu.json";
import PizzasMenu from '../Data/pizzas.json';
import DessertsMenu from '../Data/desserts.json';

// Styles
import "./styles/Menu.css";

// Components
import NavBar from '../Components/NavBar.jsx';
import MenuPlate from '../Components/MenuPlate.jsx';
import Transition from '../Components/Transition.jsx';
import LinkPlateModal from '../Components/LinkPlateModal.jsx';

const Menu = () => {
    // Hooks
    const [pizzas, setPizzas] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [linkMode, setLinkMode] = useState(false);
    const [selectedPlate, setSelectedPlate] = useState(null);
    const [showLinkPlates, setShowLinkPlates] = useState(false);
    const { showFormModal, setShowForm, formResponse, resetFormResponse } = useFormModal();
    const [modalConfiguration, setModalConfiguration] = useState(undefined);
    const [cookies] = useCookies(['role']);

    // Inputs for modal configs
    const inputConfigAddPlate = [
        {
            "id": "plate-description",
            "label": "Descripción del platillo",
            "input__type": "textarea",
            "style": {
                "height": "4em",
                "resize": "none",
                "width": "clamp(100px, 60%, 250px)"
            }
        },
        {
            "id": "plate-price",
            "label": "Precio del platillo (en MXN)",
            "input__type": "number",
            "style": {
                "width": "12ch"
            }
        },
        {
            "id": "plate-type",
            "label": "Tipo de platillo",
            "input": true,
            "input__type": "select",
            "style": {
                "width": "12ch"
            },
            "radios__name": "table-status-actual",
            "options": [
                {
                    "value": "Pizzas",
                    "checked": true
                },
                {
                    "value": "Postres"
                }
            ]
        }
    ]
    const inputConfigAddMenu = [
        {
            "id": "menu-title",
            "label": "Título del menú",
            "input__type": "text"
        },
        {
            "id": "menu-description",
            "label": "Descripción del menú",
            "input__type": "textarea",
            "style": {
                "height": "4em",
                "resize": "none",
                "width": "clamp(100px, 60%, 250px)"
            }
        }
    ]

    // Configs
    const configurationAddPlate = {
        title: 'Registar nuevo platillo',
        description: 'Agregar nuevo platillo al menú',
        inputs: inputConfigAddPlate,
        confirmButtonText: 'Añadir',
        onSubmitAction: () => console.log('success')
    }

    const configurationAddMenu = {
        title: 'Crear nuevo menú',
        inputs: inputConfigAddMenu,
        confirmButtonText: 'Crear',
        onSubmitAction: () => console.log('success')
    }

    // UseEffect
    useEffect(() => {
        setPizzas(PizzasMenu);
        setDesserts(DessertsMenu);
    }, []);

    useEffect(() => {
        if (formResponse) {
            resetFormResponse();
            setTimeout((setShowForm(false), 500))
        }
    }, [formResponse, resetFormResponse, setShowForm]);

    // Validates if current mode is editing or linking
    useEffect(() => {
        if (selectedPlate !== null && !linkMode) {

            const inputConfigUpdate = [
                {
                    "id": "plate-description",
                    "label": "Descripción del platillo",
                    "input__type": "textarea",
                    "style": {
                        "height": "4em",
                        "resize": "none",
                        "width": "clamp(100px, 60%, 250px)"
                    },
                    "defaultValue": selectedPlate.description
                },
                {
                    "id": "plate-price",
                    "label": "Precio del platillo (en MXN)",
                    "input__type": "number",
                    "style": {
                        "width": "12ch"
                    },
                    "defaultValue": selectedPlate.price
                },
                {
                    "id": "plate-type",
                    "label": "Tipo de platillo",
                    "input": true,
                    "input__type": "select",
                    "style": {
                        "width": "12ch"
                    },
                    "radios__name": "table-status-actual",
                    "options": [
                        {
                            "value": "Selecciona un tipo",
                            "hidden": true
                        },
                        {
                            "value": "Pizzas",
                            "checked": true
                        },
                        {
                            "value": "Postres"
                        }
                    ]
                }
            ];

            const configurationUpdate = {
                title: 'Actualizar platillo',
                description: null,
                inputs: inputConfigUpdate,
                confirmButtonText: 'Actualizar',
                onSubmitAction: () => console.log('plate updated')
            }
            setModalConfiguration(configurationUpdate);
            setShowForm(true);
            setSelectedPlate(null);
        }
        if(selectedPlate !== null && linkMode){
            setShowLinkPlates(true);
        }
    }, [selectedPlate, linkMode, setShowForm]);

    // Handlers

    const onNewPlateHandler = () => {
        setModalConfiguration(configurationAddPlate);
        setShowForm(true);
    }

    const onNewMenuHandler = () => {
        setModalConfiguration(configurationAddMenu);
        setShowForm(true);
    }

    const onAddToMenuHandler = () => {
        setLinkMode(!linkMode);
    }

    const onUpdateHandler = (plateID) => {
        if (cookies.role === 'ADMIN')
            setSelectedPlate(FullMenu.find(plt => plt.id === plateID));
    }

    // Functions
    const toggleLinkModal = () => {
        setShowLinkPlates(false);
        setSelectedPlate(null);
    }

    // Render Section
    return (
        <main className="menu">
            <NavBar showUser={false} />
            <h1 className="menu__title">EatOnTime Menu {linkMode && '(Añadiendo a menú)'} </h1>
            <div className="plates">
                {
                    cookies.role === 'ADMIN' &&
                    <div className="menu__new">
                        <button className="menu__new-add" onClick={onNewPlateHandler}>Crear Platillo</button>
                        <button className="menu__new-add" onClick={onNewMenuHandler}>Crear Menú</button>
                        <button className="menu__new-add" onClick={onAddToMenuHandler}>Alternar Agregar Platillo al Menú</button>
                    </div>
                }
                <p className="plates-title">Pizzas</p>
                {pizzas.map(
                    pizza =>
                        <MenuPlate
                            key={pizza.id}
                            id={pizza.id}
                            img={pizza.img}
                            name={pizza.name}
                            description={pizza.description}
                            onClick={onUpdateHandler}
                        />)
                }
                <p className="plates-title">Postres</p>
                {desserts.map(
                    dessert =>
                        <MenuPlate
                            key={dessert.id}
                            id={dessert.id}
                            img={dessert.img}
                            name={dessert.name}
                            description={dessert.description}
                            onClick={onUpdateHandler}
                        />)
                }
            </div>

            {modalConfiguration && showFormModal(modalConfiguration)}
            {showLinkPlates && <LinkPlateModal onDismiss={toggleLinkModal} data={selectedPlate} />}
            <Transition duration='250ms' />
        </main>
    )
}

export default Menu;