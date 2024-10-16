import * as cheerio from 'cheerio';

export function countJobEntries(htmlContent) {
  if (!htmlContent) {
    console.error('htmlContent is undefined or empty');
    return 0;
  }

  try {
    const $ = cheerio.load(htmlContent);
    const jobEntries = $('.jobs-container > div');
    return jobEntries.length;
  } catch (error) {
    console.error('Error in countJobEntries:', error);
    return 0;
  }
}