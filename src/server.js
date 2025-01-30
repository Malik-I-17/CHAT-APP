

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const sequelize = require('./config/sql');
const userRoutes = require('./routes/indexRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes.appRoutes());

// Error handling
app.use(errorMiddleware);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    try {
        await sequelize.sync();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
});