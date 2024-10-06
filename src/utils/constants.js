export const USER_AVATAR = "http://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png";
export const API_OPTIONS = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
  }
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];