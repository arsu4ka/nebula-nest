export type TwitterLikedResponse = {
  like: boolean;
  next_cursor: string;
};

export type TwitterQuoteResponse = {
  text: string;
  status: string;
};

export type TwitterFollowResponse = {
  follow: boolean;
};

export type TweetScoutRequestBody = {
  user_handler: string;
  tweet_link?: string;
  next_cursor?: string;
  project_handler?: string;
};

export type TweetScoutRequestOptions = {
  body: TweetScoutRequestBody;
  path: string;
  method?: 'GET' | 'POST';
  apiKey?: string;
};
