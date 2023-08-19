export class Poll {
    public poll_id: string;
    public poll_title: string;
    public poll_description: string;
    public poll_owner_username: string;
    public poll_options_text: string[];
    public poll_options_image_urls: string[];
    public poll_background_image: string;
    public poll_background_color: string;
    public poll_labels: string[];
    public poll_tags: string[];
    public poll_type: number;
    public poll_creation_time: Date;
    public is_open: boolean;
    public is_sponsored: boolean;
    public ends_on: Date | undefined;
    public total_opened: number;
    public total_responded: number;
    public total_shared: number;
    public total_saved: number;
    public total_likes: number;
    public reports: number;
    public is_banned: boolean;
  
    constructor(
      poll_id: string,
      poll_title: string,
      poll_description: string,
      poll_owner_username: string,
      poll_options_text: string[],
      poll_options_image_urls: string[],
      poll_background_image: string,
      poll_background_color: string,
      poll_labels: string[],
      poll_tags: string[],
      poll_type: number,
      poll_creation_time: Date,
      is_open: boolean,
      is_sponsored: boolean,
      ends_on: Date | undefined,
      total_opened: number,
      total_responded: number,
      total_shared: number,
      total_saved: number,
      total_likes: number,
      reports: number,
      is_banned: boolean
    ) {
      this.poll_id = poll_id;
      this.poll_title = poll_title;
      this.poll_description = poll_description;
      this.poll_owner_username = poll_owner_username;
      this.poll_options_text = poll_options_text;
      this.poll_options_image_urls = poll_options_image_urls;
      this.poll_background_image = poll_background_image;
      this.poll_background_color = poll_background_color;
      this.poll_labels = poll_labels;
      this.poll_tags = poll_tags;
      this.poll_type = poll_type;
      this.poll_creation_time = poll_creation_time;
      this.is_open = is_open;
      this.is_sponsored = is_sponsored;
      this.ends_on = ends_on;
      this.total_opened = total_opened;
      this.total_responded = total_responded;
      this.total_shared = total_shared;
      this.total_saved = total_saved;
      this.total_likes = total_likes;
      this.reports = reports;
      this.is_banned = is_banned;
    }
  }
  