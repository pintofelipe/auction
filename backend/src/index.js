import app from "./app.js";
import { connectDB } from "./db.js";


connectDB();

app.listen(77)
console.log('server on port', 77)