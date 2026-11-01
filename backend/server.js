const express = require("express");
const server = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

// const { connectRedis } = require("./config/redis");


const cookieParser = require("cookie-parser");
server.use(cookieParser());


const cors = require("cors");

server.use(cors())

// server.use(
//     cors({
//         origin:[ "http://localhost:5173", "http://localhost:5174"],
//         credentials: true
//     })
// );
server.use(express.json());   

// admin routes
const adminRoutes = require("./routes/adminRoutes");
server.use("/api/admin", adminRoutes);

// user routes
const userRouter = require("./routes/router");
server.use("/api",userRouter);

// product routes
const productRouter=require("./routes/ProductRoutes");
server.use("/api",productRouter)

// cart routes
const cartRouter = require("./routes/cartRoutes");
server.use("/cart",cartRouter)

// wishlist routes
const wishlistRouter = require("./routes/wishRoute");
server.use("/wishList",wishlistRouter)

// redis routes
// const redisRoutes = require("./routes/redisRoutes");
// server.use("/api/redis", redisRoutes);

// Start server after connecting databases
const startServer = async () => {
    try {
        await connectDB();
        // await connectRedis();

        server.listen(process.env.PORT || 5000, () => {
            console.log(
                "Server running on port",
                process.env.PORT || 5000
            );
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};
startServer();

