// Styles
import './styles/MenuPlate.css';

// Menu plate view for menu page
const MenuPlate = ({ id, img, name, description, onClick }) => {
    // Handlers
    const onClickHandler = () => {
        onClick(id);
    }

    // Render section
    return (
        <div className="menu__plate__detail"
            onClick={onClickHandler}
        >
            <img className='plate-image' src={img} alt="plate" />
            <h3 className="plate-name"> {name} </h3>
            <p className="plate-desc"> {description} </p>
        </div>
    );
}

export default MenuPlate;