import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import './styles/CreateThreadPage.css';

function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onCreateThread(e) {
    e.preventDefault();
    await dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  }

  return (
    <div className='create-thread-page' id='create-thread-page'>
      <div className='create-thread-page__card'>
        <div className='create-thread-page__header'>
          <span className='create-thread-page__icon'>📝</span>
          <h1 className='create-thread-page__title'>Buat Thread Baru</h1>
          <p className='create-thread-page__subtitle'>
            Mulai diskusi baru dengan komunitas
          </p>
        </div>
        <form className='create-thread-page__form' onSubmit={onCreateThread}>
          <div className='create-thread-page__field'>
            <label htmlFor='input-title' className='create-thread-page__label'>
              Judul
            </label>
            <input
              type='text'
              id='input-title'
              className='create-thread-page__input'
              placeholder='Judul thread Anda'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='create-thread-page__field'>
            <label
              htmlFor='input-category'
              className='create-thread-page__label'
            >
              Kategori
              <span className='create-thread-page__optional'> (opsional)</span>
            </label>
            <input
              type='text'
              id='input-category'
              className='create-thread-page__input'
              placeholder='contoh: react, javascript, diskusi'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className='create-thread-page__field'>
            <label htmlFor='input-body' className='create-thread-page__label'>
              Isi Thread
            </label>
            <textarea
              id='input-body'
              className='create-thread-page__textarea'
              placeholder='Tulis isi thread Anda di sini...'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows='8'
              required
            />
          </div>
          <button
            type='submit'
            className='create-thread-page__submit'
            disabled={!title.trim() || !body.trim()}
            id='btn-create-submit'
          >
            Buat Thread
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;
