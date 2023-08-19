export class Option {
    public title: string;
    public image?: string;
    public weight?: number;
  
    constructor(title: string, image?: string, weight?: number) {
      this.title = title;
      this.image = image;
      this.weight = weight;
    }
  }
  