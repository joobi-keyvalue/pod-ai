from fastapi import FastAPI, HTTPException
from models import Item
from dotenv import load_dotenv
from tools.tavily import fetch_content
from service import get_users
load_dotenv()

app = FastAPI()


# fetch_content("Go Lang", ['https://jtarchie.com/posts/2024-08-30-exploring-goja-a-golang-javascript-runtime', 'https://alovak.com/2024/08/27/mastering-iso-8583-message-networking-with-golang/', 'https://rogersm.net/posts/developing-a-go-bot-embedding-ichiban-prolog/'])
# In-memory store for the items
get_users()
items = {}

# Create an item
@app.post("/items/")
async def create_item(item: Item):
    if item.id in items:
        raise HTTPException(status_code=400, detail="Item already exists")
    items[item.id] = item
    return item

# Read an item by ID
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]

# Update an item
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    items[item_id] = item
    return item

# Delete an item
@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    del items[item_id]
    return {"detail": "Item deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)