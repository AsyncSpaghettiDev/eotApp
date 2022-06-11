// Resources
import logo from '../Images/logo.png';

// Styles
import './styles/Transition.css';

const Transition = ({ duration = '3.5s' }) => {
  // Render Section
  return (
    <div style={{ '--transition-duration': duration }} className="transition">
      <img className="transition-logo" src={logo} alt="EatOnTime logo" />
      <div className="transition__progress"></div>
      <div className="transition__footer">
        <div className="transition__footer-balls-1"></div>
        <div className="transition__footer-balls-2"></div>
      </div>
    </div>
  );
};

export default Transition;
