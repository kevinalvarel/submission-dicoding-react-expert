import PropTypes from 'prop-types';
import './styles/VoteButton.css';

function VoteButton({ type, count, isActive, onClick }) {
  const icon = type === 'up' ? '▲' : '▼';
  const activeClass = isActive ? `vote-button--${type}-active` : '';

  return (
    <button
      type='button'
      className={`vote-button vote-button--${type} ${activeClass}`}
      onClick={onClick}
      aria-label={`${type}-vote`}
    >
      <span className='vote-button__icon'>{icon}</span>
      <span className='vote-button__count'>{count}</span>
    </button>
  );
}

VoteButton.propTypes = {
  type: PropTypes.oneOf(['up', 'down']).isRequired,
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default VoteButton;
