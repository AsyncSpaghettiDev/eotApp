// Styles
import './styles/Dashboard.css';

// Components
import NavBar from '../Components/NavBar.jsx';

// Imports
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    // Render Section
    return (
        <main className="dashboard">
            <NavBar noBack />
            <Outlet />
        </main>
    )
}

export default Dashboard;