import app from "./app";
import { ConnectDB } from "./src/config/database";


const PORT = process.env.PORT || 3000

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    })
})

