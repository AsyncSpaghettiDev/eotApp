// Styles
import './styles/Creators.css';

// Resources
import NotFoundImage from '../Images/userNF.png';

// Components
import NavBar from '../Components/NavBar.jsx';

const Creators = () => {
    return (
        <main className="about__section">
            <NavBar showUser={false} />
            <h2 className="about__section-title">
                EatOnTime development team
            </h2>
            <div className="about__section__members">
                <div className="development__member">
                    <img className='development__member-image' src={NotFoundImage} alt="Abigail capaceta profile image" />
                    <h3  className="development__member-name">Abigail Capaceta</h3>
                    <p   className="development__member-functions">Programador, diseñador, analista.</p>
                </div>
                <div className="development__member">
                    <img className='development__member-image' src={NotFoundImage} alt="Luis Cruz profile image" />
                    <h3 className="development__member-name">Luis Cruz</h3>
                    <p className="development__member-functions">Programador, diseñador, administrador, QA.</p>
                </div>
                <div className="development__member">
                    <img className='development__member-image' src={NotFoundImage} alt="Jonathan Mojica profile image" />
                    <h3 className="development__member-name">Jonathan Mojica</h3>
                    <p className="development__member-functions">Programador, diseñador, administrador, QA.</p>
                </div>
                <div className="development__member">
                    <img className='development__member-image' src={NotFoundImage} alt="Said Diaz profile image" />
                    <h3 className="development__member-name">Said Diaz</h3>
                    <p className="development__member-functions">Programador, diseñador, administrador, QA.</p>
                </div>
                <div className="development__member">
                    <img className='development__member-image' src={NotFoundImage} alt="Susan Ponce profile image" />
                    <h3 className="development__member-name">Susan Ponce</h3>
                    <p className="development__member-functions">Programador, analista, diseñador.</p>
                </div>
            </div>
        </main>
    )
}

export default Creators;