export interface User {
  userid: number;
  username: string;
  profile_url: string | null;
}

export interface Post {
  postid:number;
  post_id: number;
  title: string;
  userid: number;
  description: string;
  images: string[];
  locationid:number;
}
export interface Category {
  cat_id: number;
  cat_name: string;

}
export interface PostByCat {
  postid:number;
  post_id: number;
  title: string;
  userid: number;
  description: string;
  images: string[];
  locationid:number;
  cat_id:number;
}