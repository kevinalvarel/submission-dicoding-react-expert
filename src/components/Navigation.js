import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import './styles/Navigation.css';

function Navigation() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  }

  return (
    <nav className='navigation' id='navigation'>
      <div className='navigation__inner'>
        <Link to='/' className='navigation__logo' id='nav-logo'>
          <span className='navigation__logo-icon'>💬</span>
          <span className='navigation__logo-text'>ForumKita</span>
        </Link>
        <div className='navigation__links'>
          <Link to='/' className='navigation__link' id='nav-home'>
            Threads
          </Link>
          <Link
            to='/leaderboards'
            className='navigation__link'
            id='nav-leaderboards'
          >
            Leaderboard
          </Link>
        </div>
        <div className='navigation__auth'>
          {authUser ? (
            <div className='navigation__user'>
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className='navigation__avatar'
              />
              <span className='navigation__username'>{authUser.name}</span>
              <button
                type='button'
                className='navigation__logout-btn'
                onClick={onLogout}
                id='btn-logout'
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='navigation__guest'>
              <Link
                to='/login'
                className='navigation__btn navigation__btn--login'
                id='btn-login'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='navigation__btn navigation__btn--register'
                id='btn-register'
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
