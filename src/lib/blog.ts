import articles from '../content/blog.json';
export const posts = [...articles].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
export const topics = [...new Set(posts.map(p => p.topic))].sort();
export const locations = [...new Set(posts.map(p => p.location))].sort();
export function filterPosts(params: URLSearchParams) {
  const topic = params.get('topic') || '';
  const location = params.get('location') || '';
  const query = (params.get('q') || '').trim().toLowerCase();
  return posts.filter(p => (!topic || p.topic === topic) && (!location || p.location === location) && (!query || `${p.title} ${p.excerpt} ${p.topic} ${p.location}`.toLowerCase().includes(query)));
}
