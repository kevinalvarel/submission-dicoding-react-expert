import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VoteButton from './VoteButton';
import './styles/ThreadCard.css';

function ThreadCard({
  thread,
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const isUpVoted = thread.upVotesBy.includes(authUserId);
  const isDownVoted = thread.downVotesBy.includes(authUserId);

  function handleUpVote(e) {
    e.preventDefault();
    if (isUpVoted) {
      onNeutralizeVote(thread.id);
    } else {
      onUpVote(thread.id);
    }
  }

  function handleDownVote(e) {
    e.preventDefault();
    if (isDownVoted) {
      onNeutralizeVote(thread.id);
    } else {
      onDownVote(thread.id);
    }
  }

  function postedAt(date) {
    const now = new Date();
    const posted = new Date(date);
    const diff = now - posted;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} hari lalu`;
    }
    if (diffHours > 0) {
      return `${diffHours} jam lalu`;
    }
    if (diffMinutes > 0) {
      return `${diffMinutes} menit lalu`;
    }
    return 'Baru saja';
  }

  function getBodySnippet(body) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = body;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > 120 ? `${text.substring(0, 120)}...` : text;
  }

  return (
    <div className='thread-card' id={`thread-${thread.id}`}>
      <div className='thread-card__votes'>
        <VoteButton
          type='up'
          count={thread.upVotesBy.length}
          isActive={isUpVoted}
          onClick={handleUpVote}
        />
        <VoteButton
          type='down'
          count={thread.downVotesBy.length}
          isActive={isDownVoted}
          onClick={handleDownVote}
        />
      </div>
      <div className='thread-card__content'>
        <div className='thread-card__header'>
          {thread.category && (
            <span className='thread-card__category'>#{thread.category}</span>
          )}
          <span className='thread-card__time'>
            {postedAt(thread.createdAt)}
          </span>
        </div>
        <Link to={`/threads/${thread.id}`} className='thread-card__title'>
          {thread.title}
        </Link>
        <p className='thread-card__body'>{getBodySnippet(thread.body)}</p>
        <div className='thread-card__footer'>
          <div className='thread-card__owner'>
            {thread.ownerAvatar && (
              <img
                src={thread.ownerAvatar}
                alt={thread.ownerName}
                className='thread-card__avatar'
              />
            )}
            <span className='thread-card__owner-name'>
              {thread.ownerName || 'Unknown'}
            </span>
          </div>
          <div className='thread-card__comments-count'>
            <span className='thread-card__comments-icon'>💬</span>
            <span>{thread.totalComments} komentar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    ownerName: PropTypes.string,
    ownerAvatar: PropTypes.string,
  }).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

ThreadCard.defaultProps = {
  authUserId: '',
};

export default ThreadCard;
