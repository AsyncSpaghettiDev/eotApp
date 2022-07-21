import { useNavigate } from 'react-router-dom';
import './styles/TableResume.css';

const TableResume = ({ tableNo, freeSeat, busy, onClick, editingMode, updateTables }) => {
    // Hooks
    const navigate = useNavigate();

    // Handlers
    const onEnableHandler = async e => {
        e.stopPropagation();
        await fetch(`/api/dashboard/tables/${tableNo}`, {
            method: 'PUT',
            body: JSON.stringify({
                table__isFree: busy ? 1 : 0
            }),
            headers: { "Content-Type": "application/json" }
        })
        updateTables();
    }

    // Checks if editing mode is active, if it is deploys edit modal
    // if not and table is busy redirects to table detail
    const showHandler = () => {
        if (editingMode)
            onClick(tableNo);
        else
            if (busy)
                navigate(`details/${tableNo}`);
    }

    // Render Section
    return (
        <tr
            className={busy ? "dashboard__resume__table dashboard__resume__table--busy" : "dashboard__resume__table"}
            onClick={showHandler}
        >
            <td className='dashboard__resume__table-info' > {tableNo.toString().padStart(2, '0')} </td>
            <td> {freeSeat.toString().padStart(2, '0')} </td>
            <td> {busy ? "Ocupada" : "Disponible"} </td>
            <td> {
                !busy ?
                    <button className='dashboard__resume__table-update' onClick={onEnableHandler} >Habilitar</button> :
                    <button className='dashboard__resume__table-update inverted' onClick={onEnableHandler} >Liberar</button>
            }
            </td>
        </tr>
    );
}

export default TableResume;