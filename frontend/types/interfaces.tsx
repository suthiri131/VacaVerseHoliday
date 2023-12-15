export interface User {
  userid: string;
  username: string;
  profile_url: string | null;
}

export interface Post {
  post_id: number;
  title: string;
  userid: number;
  description: string;
  images: string[];
}
export interface Category {
  cat_id: number;
  cat_name: string;

}
