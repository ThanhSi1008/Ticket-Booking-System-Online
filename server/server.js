const express = require('express');
const cors = require('cors');  // Import cors
const connectDB = require('./config/db');  // Import connectDB từ db.js
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')

const app = express();

// Kết nối đến MongoDB
connectDB();

// Cấu hình CORS cho phép tất cả các nguồn (có thể thay đổi theo yêu cầu)
app.use(cors());  // Cho phép mọi nguồn

// Middleware để parse body request
app.use(express.json());

// Middleware cơ bản để kiểm tra
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Cinema app!</h1>');
});

// Sử dụng route movie
app.use('/api', movieRoutes);

app.use('/user', userRoutes)

app.use('/product', productRoutes)

// Chạy server trên port 3000
app.listen(3000, '0.0.0.0', () => {
  console.log("Server is running on http://0.0.0.0:3000");
});
