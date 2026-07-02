import PropTypes from 'prop-types';
import './styles/LeaderboardItem.css';

function LeaderboardItem({ rank, user, score }) {
  const getRankClass = () => {
    if (rank === 1) return 'leaderboard-item--gold';
    if (rank === 2) return 'leaderboard-item--silver';
    if (rank === 3) return 'leaderboard-item--bronze';
    return '';
  };

  const getRankEmoji = () => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div
      className={`leaderboard-item ${getRankClass()}`}
      id={`leaderboard-${rank}`}
    >
      <div className='leaderboard-item__rank'>
        <span className='leaderboard-item__rank-text'>{getRankEmoji()}</span>
      </div>
      <div className='leaderboard-item__user'>
        <img
          src={user.avatar}
          alt={user.name}
          className='leaderboard-item__avatar'
        />
        <span className='leaderboard-item__name'>{user.name}</span>
      </div>
      <div className='leaderboard-item__score'>
        <span className='leaderboard-item__score-value'>{score}</span>
        <span className='leaderboard-item__score-label'>poin</span>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
