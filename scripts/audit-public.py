"""Read-only public inventory. Never requests authenticated APIs or user endpoints."""
import subprocess,json,re,time
from pathlib import Path
from urllib.parse import urljoin,urlparse,urldefrag
from bs4 import BeautifulSoup
BASE='https://veritybuildstg.wpenginepowered.com'
OUT=Path('.local/public-source');OUT.mkdir(parents=True,exist_ok=True)
def fetch(url):
 r=subprocess.run(['curl','-sSL','--max-time','30','-w','\n%{http_code}',url],capture_output=True,text=True)
 body,_,status=r.stdout.rpartition('\n');return body,int(status or 0)
queue=['/']; inventory=[];seen=set();apis={}
for kind in ['pages','posts','categories','tags']:
 data=[]
 for page in range(1,20):
  body,status=fetch(f'{BASE}/wp-json/wp/v2/{kind}?per_page=100&page={page}'+('&status=publish' if kind in ['pages','posts'] else ''))
  if status!=200:break
  batch=json.loads(body)
  if not batch:break
  # Only public identifiers, titles, routes, and taxonomy associations; no author or private fields.
  for x in batch:
   data.append({k:x[k] for k in ['id','slug','link','title','name','parent','categories','tags','template'] if k in x})
   if x.get('link'):queue.append(urlparse(x['link']).path)
  if len(batch)<100:break
 apis[kind]=data
for p in ['robots.txt','wp-sitemap.xml','wp-sitemap-posts-post-1.xml','wp-sitemap-posts-page-1.xml','wp-sitemap-taxonomies-category-1.xml','wp-sitemap-taxonomies-post_tag-1.xml']:
 b,s=fetch(BASE+'/'+p);(OUT/p).write_text(b)
 if s==200 and p.endswith('.xml') and p!='wp-sitemap.xml':
  queue += [urlparse(x).path for x in re.findall(r'<loc>(.*?)</loc>',b)]
while queue:
 path=queue.pop(0)
 if path in seen:continue
 seen.add(path)
 if any(path.startswith(x) for x in ['/wp-','/author/','/feed','/comments']) or re.search(r'\.(jpg|jpeg|png|gif|svg|pdf|zip|webp)$',path):continue
 body,status=fetch(BASE+path);soup=BeautifulSoup(body,'html.parser')
 links=[a.get('href') for a in soup.select('a[href]')]
 for link in links:
  u=urlparse(urljoin(BASE+path,link))
  if u.netloc==urlparse(BASE).netloc and not u.query:queue.append(u.path or '/')
 title=soup.title.get_text() if soup.title else ''
 record={'path':path,'status':status,'title':title,'canonical':str(soup.select_one('link[rel="canonical"]') or ''),'meta':[dict(m.attrs) for m in soup.select('meta[name],meta[property]')],'headings':[h.get_text(' ',strip=True) for h in soup.select('h1,h2,h3')],'links':links,'forms':len(soup.select('form')),'scripts':[s.get('src') for s in soup.select('script[src]')],'styles':[s.get('href') for s in soup.select('link[rel="stylesheet"]')],'assets':[i.get('src') for i in soup.select('img[src]')]}
 if status==200:
  filename=('home' if path=='/' else path.strip('/').replace('/','__'))+'.html';(OUT/filename).write_text(body);record['sourceFile']=filename
 inventory.append(record)
 print(status,path,flush=True)
Path('docs/public-inventory.json').write_text(json.dumps({'source':BASE,'content':apis,'routes':inventory},indent=2))
