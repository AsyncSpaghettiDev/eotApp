// Imports
import { useContext, useEffect, useState } from "react";
import useFormModal from '../CustomHooks/useFormModal';
import AuthContext from '../Utils/AuthContext';

// Styles
import "./styles/Menu.css";

// Components
import NavBar from '../Components/NavBar.jsx';
import MenuPlate from '../Components/MenuPlate.jsx';
import Transition from '../Components/Transition.jsx';
import LinkPlateModal from '../Components/LinkPlateModal.jsx';

const Menu = () => {
    // Hooks
    const [rows, setRows] = useState([]);
    const [linkMode, setLinkMode] = useState(false);
    const [menuPlates, setMenuPlates] = useState([]);
    const [categories, setCategories] = useState([]);
    /*
        Actually unhandled 
        const [inactiveMenus, setInactiveMenus] = useState([]); 
    */
    const [selectedPlate, setSelectedPlate] = useState(null);
    const [showLinkPlates, setShowLinkPlates] = useState(false);
    const { showFormModal, setShowForm, formResponse, resetFormResponse } = useFormModal();
    const [modalConfiguration, setModalConfiguration] = useState(undefined);
    const { authContextApi } = useContext(AuthContext);

    // Inputs for modal configs
    const inputConfigAddMenu = [
        {
            "id": "menu__name",
            "label": "Título del menú",
            "input__type": "text"
        },
        {
            "id": "menu__description",
            "label": "Descripción del menú",
            "input__type": "textarea",
            "style": {
                "height": "4em",
                "resize": "none",
                "width": "clamp(100px, 60%, 250px)"
            }
        }
    ]

    const inputConfigAddCategory = [
        {
            "id": "category__name",
            "label": "Título de la categoria",
            "input__type": "text"
        },
        {
            "id": "category__description",
            "label": "Descripción de la categoria",
            "input__type": "textarea",
            "style": {
                "height": "4em",
                "resize": "none",
                "width": "clamp(100px, 60%, 250px)"
            }
        }
    ]

    // Configs
    const [configurationAddPlate, setConfigurationAddPlate] = useState(undefined);

    const configurationAddMenu = {
        title: 'Crear nuevo menú',
        inputs: inputConfigAddMenu,
        confirmButtonText: 'Crear',
        onSubmitAction: async ({ menu__name, menu__description }) => {
            const res = await fetch(`/api/menu/menu`, {
                method: 'POST',
                body: JSON.stringify({
                    menu__name,
                    menu__description
                }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            console.log(data);
        }
    }

    const configurationAddCategory = {
        title: 'Crear nueva categoria',
        inputs: inputConfigAddCategory,
        confirmButtonText: 'Crear',
        onSubmitAction: async ({ category__name, category__description }) => {
            const res = await fetch(`/api/menu/category`, {
                method: 'POST',
                body: JSON.stringify({
                    category__name,
                    category__description
                }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            console.log(data);
            fetchCategories();
        }
    }

    // UseEffect
    useEffect(() => {
        fetchMenuPlates();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (menuPlates.length <= 0)
            return;
        let lastCategory = undefined;
        let newRows = [];
        menuPlates.forEach(plt => {
            if (lastCategory === undefined || lastCategory !== plt.plate__category) {
                lastCategory = plt.plate__category;
                newRows.push(<p key={plt.plate__category} className="plates-title">{plt.plate__category}</p>)
            }

            newRows.push(<MenuPlate
                key={plt.plate__id}
                id={plt.plate__id}
                img={plt.plate__image}
                name={plt.plate__name}
                description={plt.plate__description}
                onClick={onUpdateHandler}
            />)
        })
        setRows(newRows);
    }, [menuPlates]);

    useEffect(() => {
        const inputConfigAddPlate = [
            {
                "id": "plate__name",
                "label": "Nombre del platillo",
                "input__type": "text"
            },
            {
                "id": "plate__description",
                "label": "Descripción del platillo",
                "input__type": "textarea",
                "style": {
                    "height": "4em",
                    "resize": "none",
                    "width": "clamp(100px, 60%, 250px)"
                }
            },
            {
                "id": "plate__price",
                "label": "Precio del platillo (en MXN)",
                "input__type": "number",
                "style": {
                    "width": "12ch"
                }
            },
            {
                "id": "plate__image",
                "label": "Imagen del platillo",
                "input__type": "text",
                "style": {
                    "width": "80%"
                }
            },
            {
                "id": "plate__category__id",
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
                    ...categories.map(ctg => ({
                        "name": ctg.category__name,
                        "value": ctg.category__id,
                    }))
                ]
            },
            {
                "id": "plate__quantity",
                "label": "Cantidad de platillos disponibles",
                "input__type": "number",
                "style": {
                    "width": "12ch"
                }
            },
            {
                "id": "plate__isVeg",
                "label": "¿Es un platillo vegano?",
                "input": true,
                "input__type": "radio",
                "radios__name": "plate-veg-opt",
                "radios__buttons": [
                    {
                        "id": "plate-isVeg-true",
                        "label": "Si",
                        "value": "1",
                    },
                    {
                        "id": "plate-isVeg-false",
                        "label": "No",
                        "value": "0"
                    }
                ]
            }
        ]
        setConfigurationAddPlate({
            title: 'Registar nuevo platillo',
            description: 'Agregar nuevo platillo al menú',
            inputs: inputConfigAddPlate,
            confirmButtonText: 'Añadir',
            onSubmitAction: async ({ plate__name, plate__quantity, plate__description, plate__image, plate__price, plate__type, plate__category__id, plate__isVeg }) => {
                const res = await fetch(`/api/menu/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        plate__name,
                        plate__price,
                        plate__description,
                        plate__image,
                        plate__type,
                        plate__quantity,
                        plate__isVeg,
                        plate__category__id
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                const data = await res.json();
                console.log(data);
                fetchMenuPlates();
            }
        });
    }, [categories]);

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
                    "id": "plate__id",
                    "input__type": "hidden",
                    "defaultValue": selectedPlate.plate__id
                },
                {
                    "id": "plate__name",
                    "label": "Nombre del platillo",
                    "input__type": "text",
                    "defaultValue": selectedPlate.plate__name
                },
                {
                    "id": "plate__description",
                    "label": "Descripción del platillo",
                    "input__type": "textarea",
                    "style": {
                        "height": "4em",
                        "resize": "none",
                        "width": "clamp(100px, 60%, 250px)"
                    },
                    "defaultValue": selectedPlate.plate__description
                },
                {
                    "id": "plate__price",
                    "label": "Precio del platillo (en MXN)",
                    "input__type": "number",
                    "style": {
                        "width": "12ch"
                    },
                    "defaultValue": selectedPlate.plate__price
                },
                {
                    "id": "plate__image",
                    "label": "Imagen del platillo",
                    "input__type": "text",
                    "style": {
                        "width": "80%"
                    },
                    "defaultValue": selectedPlate.plate__image
                },
                {
                    "id": "plate__category",
                    "label": "Tipo de platillo",
                    "input": true,
                    "input__type": "select",
                    "style": {
                        "width": "12ch"
                    },
                    "radios__name": "table-status-actual",
                    "defaultValue": selectedPlate.plate__category__id,
                    "options": [
                        {
                            "value": "Selecciona un tipo",
                            "hidden": true
                        },
                        ...categories.map(ctg => ({
                            "name": ctg.category__name,
                            "value": ctg.category__id,
                        }))
                    ]
                },
                {
                    "id": "plate__quantity",
                    "label": "Cantidad de platillos disponibles",
                    "input__type": "number",
                    "style": {
                        "width": "12ch"
                    },
                    "defaultValue": selectedPlate.plate__quantity
                },
            ];

            const configurationUpdate = {
                title: 'Actualizar platillo',
                description: null,
                inputs: inputConfigUpdate,
                confirmButtonText: 'Actualizar',
                onSubmitAction: async ({ plate__name, plate__id, plate__quantity, plate__description, plate__image, plate__price, plate__type, plate__category }) => {
                    const res = await fetch(`/api/menu/${plate__id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            plate__name,
                            plate__description,
                            plate__quantity,
                            plate__price,
                            plate__image,
                            plate__type,
                            plate__category__id: plate__category
                        }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const data = await res.json();
                    console.log(data);
                    fetchMenuPlates();
                }
            }
            setModalConfiguration(configurationUpdate);
            setShowForm(true);
            setSelectedPlate(null);
        }
        if (selectedPlate !== null && linkMode) {
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

    const onNewCategoryHandler = () => {
        setModalConfiguration(configurationAddCategory);
        setShowForm(true);
    }

    const onAddToMenuHandler = () => {
        setLinkMode(!linkMode);
    }

    const onUpdateHandler = (plateID) => {
        if (authContextApi.role === 'ADMIN') {
            const plateFinded = menuPlates.find(plt => plt.plate__id === plateID);
            setSelectedPlate(plateFinded);
        }
    }

    // Functions
    const toggleLinkModal = () => {
        setShowLinkPlates(false);
        setSelectedPlate(null);
    }

    const fetchMenuPlates = () => {
        fetch('/api/menu/').then(res => res.json()).then(data => {
            setMenuPlates(data.active);
            /* setInactiveMenus(data.inactive); */
        });
    }

    const fetchCategories = () => {
        fetch('/api/menu/getCategories').then(res => res.json()).then(data => setCategories(data));
    }

    // Render Section
    return (
        <main className="menu">
            <NavBar showUser={false} />
            <h1 className="menu__title">EatOnTime Menu {linkMode && '(Añadiendo a menú)'} </h1>
            <div className="plates">
                {
                    authContextApi.role === 'ADMIN' &&
                    <div className="menu__new">
                        <button className="menu__new-add" onClick={onNewPlateHandler}>Crear Platillo</button>
                        <button className="menu__new-add" onClick={onNewMenuHandler}>Crear Menú</button>
                        <button className="menu__new-add" onClick={onNewCategoryHandler}>Crear Categoria</button>
                        <button className="menu__new-add" onClick={onAddToMenuHandler}>Alternar Agregar Platillo al Menú</button>
                    </div>
                }
                {
                    rows
                }
            </div>

            {modalConfiguration && showFormModal(modalConfiguration)}
            {showLinkPlates && <LinkPlateModal onDismiss={toggleLinkModal} data={selectedPlate} />}
            <Transition duration='250ms' />
        </main>
    )
}

export default Menu;