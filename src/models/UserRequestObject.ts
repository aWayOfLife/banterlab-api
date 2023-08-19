export class UserRequestObject {
    username: string;
    user_email: string;
  
    constructor(username: string, user_email: string) {
      this.username = username;
      this.user_email = user_email;
    }
  }