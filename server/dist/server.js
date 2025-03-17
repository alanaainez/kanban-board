const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3001;
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
    credentials: true // Allow credentials if needed
}));
app.use(express.json());
app.use(routes);
app.options('*', cors()); // Enable preflight for all routes
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
