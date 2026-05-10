import requests, urllib.parse, json

TOKEN = "skFjK2lunCGax2IhkArkpe0E3h9z0UYnc30ivtcnecgvejFNThHakbMnYGhqsbZmITfUQHwhhpcEW0fWUO5nawiU19OlBJsJNckVEGNH5EC1T2l7Zky0zw78NBLYVln5LurIysWFiBqlWOHjFhGo2dP76EaHDTf37jCwCl8r3QdfDZ8fTSZB"
BASE = "https://3c4uripz.api.sanity.io/v2021-06-07"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

query = '*[_type == "services"]{"slug": slug.current, title}'
url = f"{BASE}/data/query/production?query={urllib.parse.quote(query)}"
r = requests.get(url, headers=HEADERS)
results = r.json().get("result", [])
for s in results:
    print(f"  {s.get('slug'):50s} | {s.get('title')}")
print(f"\nTotal: {len(results)} services")
