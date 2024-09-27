# pod-ai

Pod AI is a powerful artificial intelligence system with a Go backend, Python AI service, and React frontend.

## Table of Contents
- [pod-ai](#pod-ai)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Starting the Go Server](#starting-the-go-server)
    - [Starting the Python Server](#starting-the-python-server)
    - [Starting the Frontend](#starting-the-frontend)
  - [License](#license)

## Installation

To install pod-ai, follow these steps:

## Usage

### Starting the Go Server

1. Navigate to the Go backend directory:
   ```bash
   cd backend/core
   ```

2. Run the Go server:
   ```bash
   go run main.go start
   ```

### Starting the Python Server

1. Navigate to the Python AI directory:
   ```bash
   cd backend/ai
   ```

2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Python server:
   ```bash
   python main.py
   ```

### Starting the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend should now be accessible at `http://localhost:3000`.

## License

This project is licensed under the [MIT License](LICENSE).
