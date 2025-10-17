// src/db.js
import Dexie from "dexie";

export const db = new Dexie("WoodshedAppDB");

db.version(2).stores({
  images: "&id, refcount",
});
