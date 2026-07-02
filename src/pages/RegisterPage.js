import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/api';
import './styles/RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function onRegister(e) {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className='register-page' id='register-page'>
      <div className='register-page__card'>
        <div className='register-page__header'>
          <span className='register-page__icon'>✨</span>
          <h1 className='register-page__title'>Buat Akun Baru</h1>
          <p className='register-page__subtitle'>
            Bergabung dengan komunitas ForumKita
          </p>
        </div>
        <form className='register-page__form' onSubmit={onRegister}>
          <div className='register-page__field'>
            <label htmlFor='input-name' className='register-page__label'>
              Nama
            </label>
            <input
              type='text'
              id='input-name'
              className='register-page__input'
              placeholder='Nama lengkap Anda'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='register-page__field'>
            <label htmlFor='input-email' className='register-page__label'>
              Email
            </label>
            <input
              type='email'
              id='input-email'
              className='register-page__input'
              placeholder='email@contoh.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='register-page__field'>
            <label htmlFor='input-password' className='register-page__label'>
              Password
            </label>
            <input
              type='password'
              id='input-password'
              className='register-page__input'
              placeholder='Minimal 6 karakter'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength='6'
            />
          </div>
          <button
            type='submit'
            className='register-page__submit'
            id='btn-register-submit'
          >
            Daftar
          </button>
        </form>
        <p className='register-page__login-link'>
          Sudah punya akun? <Link to='/login'>Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
