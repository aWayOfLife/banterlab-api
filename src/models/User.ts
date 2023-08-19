export class User {
    public user_id: string;
    public user_name : string;
    public user_full_name?: string;
    public user_bio?: string;
    public user_profile_pic?: string;
    public user_other_links?: { [key: string]: string };
    public user_profession?: string;
    public user_email: string;
    public is_paid?: boolean;
    public credits?: number;
    public follows?: string[];
    public followers?: number;
    public reports?: number;
    public is_banned?: boolean;
    public saved_polls?: string[];
  
    constructor(
      user_id: string,
      user_name : string, 
      user_email: string,
      user_full_name?: string,
      user_bio?: string,
      user_profile_pic?: string,
      user_other_links?: { [key: string]: string },
      user_profession?: string,
      is_paid?: boolean,
      credits?: number,
      follows?: string[],
      followers?: number,
      reports?: number,
      is_banned?: boolean,
      saved_polls?: string[]
    ) {
      this.user_id = user_id;
      this.user_name = user_name
      this.user_email = user_email;
      this.user_full_name = user_full_name;
      this.user_bio = user_bio;
      this.user_profile_pic = user_profile_pic;
      this.user_other_links = user_other_links;
      this.user_profession = user_profession;
      this.is_paid = is_paid;
      this.credits = credits;
      this.follows = follows;
      this.followers = followers;
      this.reports = reports;
      this.is_banned = is_banned;
      this.saved_polls = saved_polls;
    }
  }
  