// Imports
import { useEffect, useState } from "react";

// Components
import NavBar from "../Components/NavBar.jsx";
import Transition from "../Components/Transition.jsx";
import OrderDetail from "../Components/OrderDetail.jsx";

// Data
import OrdersJson from '../Data/orders.json';

// Style
import './styles/Orders.css';
import useConfirmModal from "../CustomHooks/useConfirmModal.js";

// Component
const Orders = () => {
    // Hooks
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(undefined);
    const { showModal, setShowConfirm, confirmResponse, resetResponse } = useConfirmModal();

    // UseEffects
    useEffect(() => {
        setOrders(OrdersJson.filter(ord => ord.SERVED !== "TRUE"))
    }, []);

    useEffect(() => {
        if (confirmResponse) {
            confirmTrigger();
            resetResponse();
        }
    }, [confirmResponse]);

    // Handlers
    const onSelectedOrder = (ID) => {
        setSelectedOrder(OrdersJson.find(ord => ord.PRODUCT_ORDER_ID === ID && ord.SERVED === 'FALSE'));
    }

    // Functions
    const confirmTrigger = () => {
        console.log(selectedOrder)
    }

    // Render section
    return (
        <main className="orders">
            <NavBar />
            <h1 className="orders-title">Ordenes activas</h1>
            <div className="orders__list">
                {
                    orders.map(
                        ord =>
                            <OrderDetail
                                key={ord.PRODUCT_ORDER_ID}
                                productid={ord.PRODUCT_ORDER_ID}
                                productcode={ord.PRODUCT_CODE}
                                orderid={ord.ORDER_ID}
                                served={ord.SERVED}
                                onSelect={onSelectedOrder}
                                onShow={setShowConfirm}/>
                    )
                }
            </div>
            {showModal(
                selectedOrder !== undefined ?
                    `¿Desea actualizar la orden con id #${selectedOrder.ORDER_ID}?` :
                    "Contact support for help",
                    'Seleccione sí para cambiar el status de no servido a servido'
                    )
            }
            <Transition duration="500ms" />
        </main>
    );
}

export default Orders;