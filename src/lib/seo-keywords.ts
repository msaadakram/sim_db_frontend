export const SIM_OWNER_SEO_KEYWORDS = [
  'sim owner detail',
  'sim owner details pakistan',
  'sim owner details check',
  'sim data check',
  'sim information',
  'sim owner name check',
  'sim number details',
  'pak sim data',
  'sim owner finder',
  'sim verification pakistan',
  'sim database pakistan',
  'check sim owner online',
  'sim details by number',
  'mobile number details pakistan',
  'sim info pakistan',
  'number tracker pakistan',
  'sim owner lookup',
  'sim record check',
  'sim registration check',
  'pta sim check',
  'pta sim information',
  'sim ownership details',
  'check sim data online',
  'sim detail finder',
  'number information pakistan',
  'sim data online',
  'pak sim details free',
  'sim info check',
  'sim owner database',
  'mobile sim details',
  'sim detail check code',
  'sim owner check app',
  'sim number info',
  'sim record finder',
  'sim info finder',
  'number detail finder',
  'sim owner tracker',
  'pakistan sim info',
  'sim detail online check',
  'sim registration details',
  'sim data finder',
  'sim verification online',
  'check number owner pakistan',
  'sim owner detail free',
  'sim check online pakistan',
  'sim record check online',
  'mobile number owner info',
  'pak sim owner details',
  'sim ownership check',
  'sim data search',
  'sim detail system',
  'sim info online',
  'sim data tool',
  'sim owner detail finder',
  'sim lookup pakistan',
  'sim record pakistan',
  'mobile sim info',
  'number owner lookup',
  'sim owner details by number',
  'sim info by number',
  'sim tracker pakistan',
  'sim database search',
  'check sim owner name',
  'sim data check online free',
  'sim number details pakistan free',
  'sim owner information',
  'sim lookup tool',
  'sim check system pakistan',
  'sim info search',
  'sim detail website',
  'sim database finder',
  'mobile number sim details',
  'pak number info',
  'sim owner check free',
  'sim detail verification',
  'sim number search',
  'sim info tool pakistan',
  'sim ownership finder',
  'sim detail tracking',
  'sim number owner name',
  'sim record lookup',
  'sim verification system',
  'sim owner search pakistan',
  'sim detail engine',
  'sim owner details tool',
  'sim info lookup pakistan',
  'sim detail checker',
  'sim owner detail checker',
  'sim data lookup',
  'sim number verification',
  'sim ownership info',
  'sim check service pakistan',
  'sim owner identification',
  'sim detail analyzer',
] as const;

export const SEO_ALT_SUFFIX = 'sim owner details pakistan, sim data check, sim details by number';

export function withSeoAlt(baseAlt: string): string {
  const cleanBaseAlt = String(baseAlt || '').replace(/\s+/g, ' ').trim();

  if (!cleanBaseAlt) {
    return `sim owner detail | ${SEO_ALT_SUFFIX}`;
  }

  const lower = cleanBaseAlt.toLowerCase();
  if (lower.includes('sim owner details pakistan') || lower.includes('sim data check')) {
    return cleanBaseAlt;
  }

  return `${cleanBaseAlt} | ${SEO_ALT_SUFFIX}`;
}

export function getKeywordSentence(start = 0, count = 12): string {
  return SIM_OWNER_SEO_KEYWORDS.slice(start, start + count).join(', ');
}

export function getKeywordParagraphs(chunkSize = 14): string[] {
  const paragraphs: string[] = [];

  for (let i = 0; i < SIM_OWNER_SEO_KEYWORDS.length; i += chunkSize) {
    paragraphs.push(SIM_OWNER_SEO_KEYWORDS.slice(i, i + chunkSize).join(', '));
  }

  return paragraphs;
}