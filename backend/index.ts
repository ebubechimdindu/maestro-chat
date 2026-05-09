import app from "./app";
import { ConnectDB } from "./src/config/database";
import http from "http";
import { initializeSocket } from "./src/socket";


const PORT = process.env.PORT || 3000
const httpServer = http.createServer(app)

initializeSocket(httpServer);


ConnectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    })
}).catch(() => {
     console.log(`🚀 Server failed to run ${PORT}`);
    process.exit(1)
})

