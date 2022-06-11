import { useNavigate } from 'react-router-dom';
import './styles/TableResume.css';

const TableResume = ({ data, busy, onClick, editingMode }) => {
    // Hooks
    const navigate = useNavigate();

    // Handlers

    // Checks if editing mode is active, if it is deploys edit modal
    // if not and table is busy redirects to table detail
    const showHandler = () => {
        if (editingMode)
            onClick(data.tableNo);
        else
            if (busy)
                navigate(`details/${data.tableNo}`);
    }

    // Render Section
    return (
        <tr
            className={busy ? "dashboard__resume__table dashboard__resume__table--busy" : "dashboard__resume__table"}
            onClick={showHandler}
        >
            <td className='dashboard__resume__table-info' > {data.tableNo.toString().padStart(2, '0')} </td>
            <td> {data.freeSeat.toString().padStart(2, '0')} </td>
            <td> {data.status} </td>
            <td className='dashboard__resume__table-time'> {busy ? `${data.estTime} min` : '--'} </td>
        </tr>
    );
}

export default TableResume;