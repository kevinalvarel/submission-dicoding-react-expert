import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import './styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onLogin(e) {
    e.preventDefault();
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    if (result !== undefined) {
      return;
    }
    navigate('/');
  }

  return (
    <div className='login-page' id='login-page'>
      <div className='login-page__card'>
        <div className='login-page__header'>
          <span className='login-page__icon'>🔐</span>
          <h1 className='login-page__title'>Selamat Datang</h1>
          <p className='login-page__subtitle'>Masuk ke akun ForumKita Anda</p>
        </div>
        <form className='login-page__form' onSubmit={onLogin}>
          <div className='login-page__field'>
            <label htmlFor='input-email' className='login-page__label'>
              Email
            </label>
            <input
              type='email'
              id='input-email'
              className='login-page__input'
              placeholder='email@contoh.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='login-page__field'>
            <label htmlFor='input-password' className='login-page__label'>
              Password
            </label>
            <input
              type='password'
              id='input-password'
              className='login-page__input'
              placeholder='Masukkan password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='login-page__submit'
            id='btn-login-submit'
          >
            Masuk
          </button>
        </form>
        <p className='login-page__register-link'>
          Belum punya akun? <Link to='/register'>Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
