export interface User {
  id?:             number;
  realm:           string;
  username?:       string;
  email:           string;
  password?:       string;
  firstName:       string;
  lastName:        string;
}

export interface AccessToken {
  id:        string;
  userId:    string;
  created?:  Date;
  ttl?:      number;
}

export interface Sticker {
  id: number;
  tags?: string[];
  organiser?: string;
  link?: string;
}
