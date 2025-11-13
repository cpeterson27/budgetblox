# BudgetBlox - Spending Analysis Project

## Dataset Setup

Due to file size limitations, please download the dataset manually:

1. **Download the dataset:**
   - Go to: https://www.kaggle.com/datasets/ismetsemedov/transactions
   - Click "Download"
   - Extract the ZIP file

2. **Place the dataset:**
   - Move the extracted CSV file to the `data/` folder in this repository
   - The file should be at: `data/transactions.csv`

3. **Run the notebooks:**
   - All notebooks expect the data to be in the `data/` folder

## Project Structure

```
budgetblox/
├── data/
├── notebooks/ # Jupyter notebooks for analysis
├── benchmark_spending.json # Output for SE team
└── README.md
```

## Quick Start

1. Download dataset
2. Install requirements: `pip install -r requirements.txt`
3. Run the notebooks in order

## SE Setup

## Features

- User authentication (login & signup)
- Add, view, and manage expenses
- Visualize spending with interactive charts
- Overspending alerts and benchmarks
- Responsive, modern UI

## Tech Stack

- **Frontend**: React, Vite, CSS Modules
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT

## Getting Started

Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)
  Installation

#### 1. Clone the repository:

```
git clone https://github.com/cpeterson27/budgetblox.git
cd budgetblox
```

#### 2. Install dependencies:

```
npm install
cd client
npm install
cd ..
```

#### 3. Set up environment variables:

- Create a .env file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

- (Optional) Add any other required environment variables.

#### 4. Start the backend server:

```
npm run dev-server
```

#### 5. Start the frontend development server:

```
cd client
npm run dev
```

#### 6. Visit the app:

- Open http://localhost:5173 in your browser.

## Project Structure

```
budgetblox/
  client/           # React frontend
    src/
      components/
      pages/
      utils/
      ...
    public/
    ...
  server/           # Express backend
    controllers/
    models/
    routes/
    ...
  .env
  [package.json](http://_vscodecontentref_/1)
  [README.md](http://_vscodecontentref_/2)
```

## Scripts

- `npm run dev-server` — Start backend in development mode
- `cd client && npm run dev` — Start frontend in development mode

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
