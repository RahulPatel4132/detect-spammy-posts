import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';

export const twitterClient = new TwitterApi({
  appKey:        process.env.TWITTER_API_KEY!,
  appSecret:     process.env.TWITTER_API_SECRET!,
  accessToken:   process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret:  process.env.TWITTER_ACCESS_SECRET!,
});

export async function tweet(text: string) {
  return twitterClient.v2.tweet(text);
}
