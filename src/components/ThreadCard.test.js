/**
 * Skenario pengujian ThreadCard component:
 *
 * - ThreadCard component:
 *   1. Harus menampilkan judul thread
 *   2. Harus menampilkan kategori thread
 *   3. Harus menampilkan jumlah komentar
 *   4. Harus menampilkan nama pemilik thread
 *   5. Harus memanggil onUpVote ketika tombol upvote diklik dan user belum upvote
 *   6. Harus memanggil onNeutralizeVote ketika tombol upvote diklik dan user sudah upvote
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThreadCard from './ThreadCard';

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: '<p>Ini adalah isi thread pertama yang cukup panjang untuk menguji snippet</p>',
  category: 'General',
  createdAt: new Date().toISOString(),
  totalComments: 5,
  upVotesBy: [],
  downVotesBy: [],
  ownerName: 'John Doe',
  ownerAvatar: 'https://example.com/avatar.png',
};

function renderThreadCard(props = {}) {
  const defaultProps = {
    thread: fakeThread,
    authUserId: 'user-1',
    onUpVote: jest.fn(),
    onDownVote: jest.fn(),
    onNeutralizeVote: jest.fn(),
    ...props,
  };
  return {
    ...render(
      <MemoryRouter>
        <ThreadCard {...defaultProps} />
      </MemoryRouter>,
    ),
    props: defaultProps,
  };
}

describe('ThreadCard component', () => {
  it('should display the thread title', () => {
    renderThreadCard();
    expect(screen.getByText('Thread Pertama')).toBeInTheDocument();
  });

  it('should display the thread category', () => {
    renderThreadCard();
    expect(screen.getByText('#General')).toBeInTheDocument();
  });

  it('should display the comment count', () => {
    renderThreadCard();
    expect(screen.getByText('5 komentar')).toBeInTheDocument();
  });

  it('should display the owner name', () => {
    renderThreadCard();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should call onUpVote when upvote button is clicked and user has not upvoted', () => {
    const { props } = renderThreadCard();
    const upVoteButton = screen.getByRole('button', { name: 'up-vote' });
    fireEvent.click(upVoteButton);
    expect(props.onUpVote).toHaveBeenCalledWith('thread-1');
  });

  it('should call onNeutralizeVote when upvote button is clicked and user has already upvoted', () => {
    const threadWithUpvote = { ...fakeThread, upVotesBy: ['user-1'] };
    const { props } = renderThreadCard({ thread: threadWithUpvote });
    const upVoteButton = screen.getByRole('button', { name: 'up-vote' });
    fireEvent.click(upVoteButton);
    expect(props.onNeutralizeVote).toHaveBeenCalledWith('thread-1');
  });
});
