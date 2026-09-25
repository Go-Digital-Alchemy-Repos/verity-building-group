"""Build public article summaries from migrated post records."""
import json
from pathlib import Path
from bs4 import BeautifulSoup
root = Path(__file__).resolve().parents[1]
posts = []
for path in (root / 'src/content/pages').glob('*.json'):
    page = json.loads(path.read_text())
    if 'single-post' not in page['bodyClass']:
        continue
    soup = BeautifulSoup(''.join(page['sections']), 'html.parser')
    image = soup.select_one('.vbg-editorial-image img')
    topic, location = soup.select_one('.eyebrow').get_text(strip=True).split(' · ', 1)
    posts.append(dict(path=page['path'], title=soup.select_one('.entry-title').get_text(strip=True), date=soup.select_one('time.published')['datetime'], topic=topic, location=location, excerpt=soup.select_one('.lead').get_text(strip=True), image=image['src'], alt=image['alt']))
posts.sort(key=lambda post: post['date'], reverse=True)
(root / 'src/content/blog.json').write_text(json.dumps(posts, indent=2, ensure_ascii=False) + '\n')
print(f'Indexed {len(posts)} published articles.')
