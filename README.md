# Transaction Dashboard

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing and visualizing transaction data. This dashboard displays transactions with search, filter, and pagination functionality, and provides visual statistics through bar and pie charts.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd transaction-dashboard




#############################################3

   Install server dependencies:

bash
Copy code
cd backend
npm install
Install client dependencies:

bash
Copy code
cd ../client
npm install
Set up MongoDB database:
###############################################################
Ensure MongoDB is running locally on mongodb://localhost:27017.
Create a database named transactionsDB.
Or use a cloud MongoDB connection URI and update it in the backend.
Run the server:

Navigate to the backend folder and start the server:
bash
Copy code
cd ../backend
npm start
The backend should now be running on http://localhost:5000.
Run the client:

Navigate to the client folder and start the React application:
bash
Copy code
cd ../client
npm start
The client should now be running on http://localhost:3000.
Features
Display transaction data with search and pagination.
Filter transactions by month.
Visual statistics:
Bar Chart: Price range distribution of transactions.
Pie Chart: Category-wise transaction count.
Database Initialization from a JSON source file.
API Endpoints


###########################################################################################
1. Initialize Database
Endpoint: /api/init-database
Method: GET
Description: Fetches data from a remote JSON file and populates the MongoDB database.
2. Get Transactions
Endpoint: /api/transactions
Method: GET
Query Parameters:
page: Current page number for pagination.
perPage: Number of items per page.
search: Search string for transaction titles or descriptions.
month: Month filter for transactions.
Description: Fetches a paginated and filtered list of transactions based on query parameters.
3. Get Statistics
Endpoint: /api/statistics
Method: GET
Query Parameters:
month: Month for which statistics are calculated.
Description: Provides statistics for the selected month, including total sales amount, sold items, and unsold items count.
4. Get Bar Chart Data
Endpoint: /api/bar-chart
Method: GET
Query Parameters:
month: Month for which bar chart data is required.
Description: Returns data for generating a bar chart showing price ranges.
5. Get Pie Chart Data
Endpoint: /api/pie-chart
Method: GET
Query Parameters:
month: Month for which pie chart data is required.
Description: Returns data for generating a pie chart showing category-wise transaction distribution.
Project Structure
graphql
Copy code
transaction-dashboard/
├── backend/
│   ├── models/
│   │   └── Transaction.js          # Mongoose model for transactions
│   ├── routes/
│   │   └── transactionRoutes.js    # API routes for transactions
│   ├── server.js                   # Main server file
│   └── package.json                # Backend dependencies
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Transactions.js      # Transactions table component
│   │   │   ├── BarChart.js          # Bar chart component
│   │   │   └── PieChart.js          # Pie chart component
│   │   ├── App.js                  # Main React component
│   │   ├── index.js                # React entry point
│   └── package.json                # Client dependencies
│
└── README.md                       # Project documentation
Usage
Initialize Database: Open a browser or use Postman to navigate to http://localhost:5000/api/init-database. This will load data into the database.

Open the Application: Go to http://localhost:3000 in your browser to view and use the dashboard.

Search and Filter: Use the search bar to filter transactions and select a month to view data specific to that month.

View Charts: Check the bar chart for price range distribution and the pie chart for category-wise counts.

Technologies Used
Frontend: React.js, Axios, Chart.js
Backend: Node.js, Express.js, MongoDB, Mongoose
Other: Axios for API requests, Chart.js for visualizations, CSS for styling
License
This project is licensed under the MIT License.



#   r o x i l e r - M e r n  
 #   r o x i l e r - M e r n  
 