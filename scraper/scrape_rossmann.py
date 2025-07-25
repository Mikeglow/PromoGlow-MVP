import requests
from bs4 import BeautifulSoup
import os
from supabase import create_client, Client

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

URL = "https://www.rossmann.pl/promocje"
headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get(URL, headers=headers)
soup = BeautifulSoup(response.content, "html.parser")

promotions = []

for item in soup.select(".promotion-tile"):
    name = item.select_one(".product-name").get_text(strip=True)
    price = item.select_one(".new-price").get_text(strip=True)
    image = item.select_one("img")["src"]
    link = "https://www.rossmann.pl" + item.select_one("a")["href"]
    promotions.append({"name": name, "price": price, "image": image, "link": link, "store": "Rossmann"})

supabase.table("promotions").delete().eq("store", "Rossmann").execute()
for promo in promotions:
    supabase.table("promotions").insert(promo).execute()

print(f"✅ Zaimportowano {len(promotions)} promocji z Rossmanna do Supabase.")