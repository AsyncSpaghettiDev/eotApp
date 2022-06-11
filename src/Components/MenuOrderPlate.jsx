// Styles
import './styles/MenuOrderPlate.css';

const MenuOrderPlate = ({ id, img, name, price, description, onAsk }) => {
    // Handlers
    // Fake delay to make it more realistic
    const handlerAsk = () => {
        setTimeout(() => {
            onAsk(id);
        }, 250)
    }

    // Render Section
    return (
        <div className="menu__order__plate__detail" onClick={handlerAsk}>
            <img className='plate-image' src={img} alt="plate" />
            <h3 className="plate-name"> {name} </h3>
            <p className="plate-price"> {`Ordenar $${price} MXN`} </p>
            <p className="plate-desc"> {description} </p>
        </div>
    );
}

export default MenuOrderPlate;