const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/transactionsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Transaction schema
const TransactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    sold: Boolean,
    category: String
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

// API to initialize the database
app.get('/api/init-database', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Insert data into MongoDB
        await Transaction.insertMany(transactions);
        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error initializing database' });
    }
});

// API to list transactions with search and pagination
app.get('/api/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    try {
        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } }
            ],
            dateOfSale: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) }
        };

        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
});

// API to get statistics for the selected month
app.get('/api/statistics', async (req, res) => {
    const { month } = req.query;

    try {
        const totalSaleAmount = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) } } },
            { $group: { _id: null, totalAmount: { $sum: '$price' } } }
        ]);

        const totalSoldItems = await Transaction.countDocuments({ sold: true, dateOfSale: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) } });
        const totalUnsoldItems = await Transaction.countDocuments({ sold: false, dateOfSale: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) } });

        res.json({
            totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
            totalSoldItems,
            totalUnsoldItems
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching statistics' });
    }
});

// API to get bar chart data (price ranges for the selected month)
app.get('/api/bar-chart', async (req, res) => {
    const { month } = req.query;

    try {
        const priceRanges = await Transaction.aggregate([
            {
                $match: { dateOfSale: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) } }
            },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                    default: "901-above",
                    output: { count: { $sum: 1 } }
                }
            }
        ]);

        res.json(priceRanges);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bar chart data' });
    }
});

// API to get pie chart data (categories and item counts for the selected month)
app.get('/api/pie-chart', async (req, res) => {
    const { month } = req.query;

    try {
        const categories = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: new Date(`${month}-01`), $lte: new Date(`${month}-31`) } } },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pie chart data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
