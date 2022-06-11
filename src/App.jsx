import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Components
import RequireAuth from './Components/RequireAuth.jsx';

// Pages
import Menu from './Pages/Menu.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Orders from './Pages/Orders.jsx';
import Creators from './Pages/Creators.jsx';
import NotFound from './Pages/NotFound.jsx';
import AddPlate from './Pages/AddPlate.jsx';
import Employees from './Pages/Employees.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import TableDetail from './Pages/TableDetail.jsx';
import TableDashboard from './Pages/TableDashboard.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} >
                    <Route index element={
                        <RequireAuth requiredRole={['ADMIN', 'EMPLOYEE']}>
                            <TableDashboard />
                        </RequireAuth>
                    } />
                    <Route path='details/:tableID' element={<TableDetail />} />
                    <Route path='addPlate' element={<AddPlate />} />
                </Route>
                <Route path='/menu' element={<Menu />} />
                <Route path='/login' element={<Login />} />
                <Route path='/employees' element={
                    <RequireAuth requiredRole={['ADMIN']}>
                        <Employees />
                    </RequireAuth>}
                />
                <Route path='/orders' element={
                    <RequireAuth requiredRole={['ADMIN','CHEF']}>
                        <Orders />
                    </RequireAuth>}
                />
                <Route path='/about' element={<Creators />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter >
    )
}

export default App;