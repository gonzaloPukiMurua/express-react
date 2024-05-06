import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

async function main() {
  try {
    await connectDB();//Database connection
    app.listen(app.get("port"), () => {
      console.log("Listening port: ", app.get("port"));
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();