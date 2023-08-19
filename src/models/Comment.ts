import { Poll } from './Poll';

export class Comment {
  public commenter_id: string;
  public poll_id: string;
  public comment: string;
  public comment_likes: number;
  public shared_poll: Poll;
  public comment_reports: number;
  public is_removed: boolean;

  constructor(
    commenter_id: string,
    poll_id: string,
    comment: string,
    comment_likes: number,
    shared_poll: Poll,
    comment_reports: number,
    is_removed: boolean
  ) {
    this.commenter_id = commenter_id;
    this.poll_id = poll_id;
    this.comment = comment;
    this.comment_likes = comment_likes;
    this.shared_poll = shared_poll;
    this.comment_reports = comment_reports;
    this.is_removed = is_removed;
  }
}
