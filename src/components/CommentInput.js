import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/CommentInput.css';

function CommentInput({ onAddComment }) {
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (content.trim()) {
      onAddComment(content);
      setContent('');
    }
  }

  return (
    <form className='comment-input' onSubmit={handleSubmit} id='comment-form'>
      <h3 className='comment-input__title'>Beri Komentar</h3>
      <textarea
        className='comment-input__textarea'
        placeholder='Tulis komentar Anda...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows='4'
        id='comment-textarea'
      />
      <button
        type='submit'
        className='comment-input__submit'
        disabled={!content.trim()}
        id='btn-submit-comment'
      >
        Kirim Komentar
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
