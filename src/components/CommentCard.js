import PropTypes from 'prop-types';
import VoteButton from './VoteButton';
import './styles/CommentCard.css';

function CommentCard({
  comment,
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
}) {
  const isUpVoted = comment.upVotesBy.includes(authUserId);
  const isDownVoted = comment.downVotesBy.includes(authUserId);

  function handleUpVote() {
    if (isUpVoted) {
      onNeutralizeVote(comment.id);
    } else {
      onUpVote(comment.id);
    }
  }

  function handleDownVote() {
    if (isDownVoted) {
      onNeutralizeVote(comment.id);
    } else {
      onDownVote(comment.id);
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

  return (
    <div className='comment-card' id={`comment-${comment.id}`}>
      <div className='comment-card__header'>
        <div className='comment-card__owner'>
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className='comment-card__avatar'
          />
          <span className='comment-card__owner-name'>{comment.owner.name}</span>
        </div>
        <span className='comment-card__time'>
          {postedAt(comment.createdAt)}
        </span>
      </div>
      <div
        className='comment-card__content'
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <div className='comment-card__actions'>
        <VoteButton
          type='up'
          count={comment.upVotesBy.length}
          isActive={isUpVoted}
          onClick={handleUpVote}
        />
        <VoteButton
          type='down'
          count={comment.downVotesBy.length}
          isActive={isDownVoted}
          onClick={handleDownVote}
        />
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

CommentCard.defaultProps = {
  authUserId: '',
};

export default CommentCard;
