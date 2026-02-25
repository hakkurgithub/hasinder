/**
 * Hatay Sanayici Veri Havuzu - Sosyal Medya Yönetim Servisi
 * v1.3 (Final) - Facebook, Twitter ve YouTube Modülleri Tamamlandı
 */

import fs from 'fs';
import { TwitterApi } from 'twitter-api-v2';
import * as bizSdk from 'facebook-nodejs-business-sdk';
import { google } from 'googleapis';

// Facebook SDK
const FacebookAdsApi = bizSdk.FacebookAdsApi;
const Page = bizSdk.Page;

// 1. FACEBOOK & INSTAGRAM
async function postToFacebook(message, link = null) {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!accessToken || !pageId) return { success: false, platform: 'facebook', error: 'Missing Keys' };

  try {
    console.log("��� Facebook paylaşımı başlatılıyor...");
    FacebookAdsApi.init(accessToken);
    const page = new Page(pageId);
    
    const params = { message: message };
    if (link) params.link = link;

    const response = await page.createFeed([], params);
    console.log("✅ Facebook OK. ID:", response.id);
    return { success: true, platform: 'facebook', status: 'posted', id: response.id };
  } catch (error) {
    console.error("❌ Facebook Hatası:", error.message);
    return { success: false, platform: 'facebook', error: error.message };
  }
}

// 2. X (TWITTER)
async function postToTwitter(message, link = null) {
  const appKey = process.env.TWITTER_API_KEY;
  const appSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET;

  if (!appKey || !appSecret || !accessToken || !accessSecret) return { success: false, platform: 'twitter', error: 'Missing Keys' };

  try {
    console.log("⚫ Twitter paylaşımı başlatılıyor...");
    const client = new TwitterApi({ appKey, appSecret, accessToken, accessSecret });
    const tweetText = link ? `${message} ${link}` : message;
    
    const response = await client.v2.tweet(tweetText);
    console.log("✅ Twitter OK. ID:", response.data.id);
    return { success: true, platform: 'twitter', status: 'posted', id: response.data.id };
  } catch (error) {
    console.error("❌ Twitter Hatası:", error.message);
    return { success: false, platform: 'twitter', error: error.message };
  }
}

// 3. YOUTUBE (AKTİF)
async function postToYouTube(videoPath, title, description) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return { success: false, platform: 'youtube', error: 'Missing Google Keys' };
  }

  if (!videoPath || !fs.existsSync(videoPath)) {
    return { success: false, platform: 'youtube', error: 'Video file not found' };
  }

  try {
    console.log("��� YouTube yüklemesi başlatılıyor...");
    
    // OAuth2 İstemcisi
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const fileSize = fs.statSync(videoPath).size;
    
    const res = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: title,
          description: description,
          tags: ['Hatay', 'Yatırım', 'Sanayi', 'Ekonomi'],
        },
        status: {
          privacyStatus: 'public', // 'private' veya 'unlisted' yapılabilir
          selfDeclaredMadeForKids: false,
        },
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    });

    console.log("✅ YouTube OK. ID:", res.data.id);
    return { success: true, platform: 'youtube', status: 'uploaded', id: res.data.id };

  } catch (error) {
    console.error("❌ YouTube Hatası:", error.message);
    return { success: false, platform: 'youtube', error: error.message };
  }
}

// ANA SERVİS (DIŞA AÇILAN KAPI)
export async function publishToAll(contentData) {
  const { message, videoPath, link, title } = contentData;
  const results = {};

  console.log("��� Omni-Channel Yayın Başladı:", message);

  // Promise.all ile paralel gönderim yapılabilir ancak hata takibi için sıralı gidiyoruz
  results.facebook = await postToFacebook(message, link);
  results.twitter = await postToTwitter(message, link);
  
  if (videoPath) {
    results.youtube = await postToYouTube(videoPath, title || message, message);
  }

  return results;
}
