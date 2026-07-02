import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteDetail,
  asyncToggleDownVoteDetail,
  asyncNeutralizeVoteDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/threadDetail/action';
import CommentCard from '../components/CommentCard';
import CommentInput from '../components/CommentInput';
import VoteButton from '../components/VoteButton';
import './styles/DetailPage.css';

function DetailPage() {
  const { threadId } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

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

  function onAddComment(content) {
    dispatch(asyncAddComment({ threadId, content }));
  }

  function onUpVoteThread() {
    dispatch(asyncToggleUpVoteDetail());
  }

  function onDownVoteThread() {
    dispatch(asyncToggleDownVoteDetail());
  }

  function onNeutralizeVoteThread() {
    dispatch(asyncNeutralizeVoteDetail());
  }

  function onUpVoteComment(commentId) {
    dispatch(asyncToggleUpVoteComment(commentId));
  }

  function onDownVoteComment(commentId) {
    dispatch(asyncToggleDownVoteComment(commentId));
  }

  function onNeutralizeVoteComment(commentId) {
    dispatch(asyncNeutralizeVoteComment(commentId));
  }

  if (!threadDetail) {
    return (
      <div className='detail-page' id='detail-page'>
        <div className='detail-page__loading'>
          <p>Memuat thread...</p>
        </div>
      </div>
    );
  }

  const isUpVoted = authUser
    ? threadDetail.upVotesBy.includes(authUser.id)
    : false;
  const isDownVoted = authUser
    ? threadDetail.downVotesBy.includes(authUser.id)
    : false;

  return (
    <div className='detail-page' id='detail-page'>
      <article className='detail-page__thread'>
        <div className='detail-page__thread-header'>
          {threadDetail.category && (
            <span className='detail-page__category'>
              #{threadDetail.category}
            </span>
          )}
          <span className='detail-page__time'>
            {postedAt(threadDetail.createdAt)}
          </span>
        </div>
        <h1 className='detail-page__title'>{threadDetail.title}</h1>
        <div className='detail-page__owner'>
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
            className='detail-page__avatar'
          />
          <div className='detail-page__owner-info'>
            <span className='detail-page__owner-name'>
              {threadDetail.owner.name}
            </span>
            <span className='detail-page__owner-label'>Pembuat thread</span>
          </div>
        </div>
        <div
          className='detail-page__body'
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />
        <div className='detail-page__actions'>
          <VoteButton
            type='up'
            count={threadDetail.upVotesBy.length}
            isActive={isUpVoted}
            onClick={isUpVoted ? onNeutralizeVoteThread : onUpVoteThread}
          />
          <VoteButton
            type='down'
            count={threadDetail.downVotesBy.length}
            isActive={isDownVoted}
            onClick={isDownVoted ? onNeutralizeVoteThread : onDownVoteThread}
          />
        </div>
      </article>

      <section className='detail-page__comments' id='comments-section'>
        <h2 className='detail-page__comments-title'>
          Komentar ({threadDetail.comments.length})
        </h2>
        {authUser ? (
          <CommentInput onAddComment={onAddComment} />
        ) : (
          <div className='detail-page__login-prompt'>
            <p>
              <a href='/login'>Login</a> untuk memberikan komentar.
            </p>
          </div>
        )}
        <div className='detail-page__comments-list'>
          {threadDetail.comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              authUserId={authUser ? authUser.id : ''}
              onUpVote={onUpVoteComment}
              onDownVote={onDownVoteComment}
              onNeutralizeVote={onNeutralizeVoteComment}
            />
          ))}
          {threadDetail.comments.length === 0 && (
            <p className='detail-page__no-comments'>
              Belum ada komentar. Jadilah yang pertama!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
