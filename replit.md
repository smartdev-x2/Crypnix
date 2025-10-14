# Crypnix - Crypto Mining Dashboard

## Overview
Crypnix is a professional crypto mining dashboard and simulation platform. This web application provides a realistic interface for monitoring cryptocurrency mining operations, featuring real-time statistics, worker management, and algorithm selection.

**Status**: Fully functional and ready to use
**Created**: October 14, 2025

## Features
- **Real-time Mining Simulation**: Start/stop mining with realistic hash rate calculations
- **Multiple Algorithm Support**: SHA-256 (Bitcoin), Ethash (Ethereum), RandomX (Monero), Equihash (Zcash)
- **Worker Management**: Monitor multiple GPU workers with individual stats
- **Live Statistics**: Hash rate, earnings, active workers, and power usage tracking
- **Visual Chart**: Real-time hash rate history visualization
- **Responsive Design**: Modern UI that works on desktop and mobile devices

## Project Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Server**: Python HTTP Server (built-in)
- **Deployment**: Autoscale (stateless web app)

### File Structure
```
├── index.html          # Main dashboard page
├── style.css           # Styling and responsive design
├── script.js           # Mining simulation logic and interactivity
├── README.md           # Project description
└── replit.md          # This documentation file
```

### Key Components

#### HTML Structure (index.html)
- Header with logo and balance display
- Stats grid showing key metrics
- Mining control panel with algorithm selector
- Hash rate history chart
- Mining workers list with GPU information

#### Styling (style.css)
- Dark theme with gradient accents
- Responsive grid layout
- Smooth animations and transitions
- Mobile-optimized design

#### JavaScript Logic (script.js)
- Mining state management
- Real-time calculations for hash rates and earnings
- Dynamic worker statistics with temperature simulation
- Canvas-based chart rendering
- Algorithm-specific hash rate multipliers

## How to Use

### Running Locally
The application is served via Python's built-in HTTP server:
```bash
python -m http.server 5000 --bind 0.0.0.0
```

### Using the Dashboard
1. **Select Algorithm**: Choose from SHA-256, Ethash, RandomX, or Equihash
2. **Start Mining**: Click the "Start Mining" button to begin simulation
3. **Monitor Stats**: Watch real-time updates of hash rate, earnings, and workers
4. **View Chart**: Track hash rate history over time
5. **Stop Mining**: Click "Stop Mining" to halt the simulation

## Configuration

### Workflow
- **Name**: Server
- **Command**: `python -m http.server 5000 --bind 0.0.0.0`
- **Port**: 5000
- **Type**: Web view

### Deployment
- **Target**: Autoscale (stateless)
- **Run Command**: `python -m http.server 5000 --bind 0.0.0.0`

## Mining Simulation Details

### Worker Configuration
- Worker #1: NVIDIA RTX 3080 (95 MH/s base)
- Worker #2: AMD RX 6800 XT (64 MH/s base)
- Worker #3: NVIDIA RTX 3070 (62 MH/s base)

### Algorithm Multipliers
- SHA-256 (Bitcoin): 1.0x
- Ethash (Ethereum): 0.8x
- RandomX (Monero): 0.3x
- Equihash (Zcash): 0.6x

### Earnings Calculation
- Base rate: 0.00000015 BTC per MH/s per day
- Updates every second during active mining
- Accumulates in total balance and daily earnings

## Recent Changes
- **October 14, 2025**: Initial project setup
  - Created full crypto mining dashboard UI
  - Implemented mining simulation logic
  - Added multi-algorithm support
  - Configured Python HTTP server
  - Set up deployment configuration

## Notes
- This is a **simulation** application for educational/demonstration purposes
- No actual cryptocurrency mining occurs
- All statistics and earnings are simulated
- Designed to showcase a professional mining dashboard interface
