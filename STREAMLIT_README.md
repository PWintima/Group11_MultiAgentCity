# Running Streamlit for Smart City Agent Demo

This README provides instructions for running the Streamlit application for the Multi-Agent Smart City Resource Management system.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before running the Streamlit application, ensure you have:

- **Python 3.8 or higher** installed on your system
- **pip** package manager
- A terminal/command prompt (PowerShell or CMD on Windows)

## Installation

### 1. Set Up Virtual Environment (Recommended)

Navigate to the project directory and create a virtual environment:

```bash
cd "C:\Users\DELL\Desktop\Multi-Agent SmartCity"
python -m venv .venv
```

Activate the virtual environment:

**On Windows (CMD):**
```bash
.venv\Scripts\activate
```

**On Windows (PowerShell):**
```bash
.venv\Scripts\Activate.ps1
```

**On macOS/Linux:**
```bash
source .venv/bin/activate
```

### 2. Install Dependencies

Install the required packages:

```bash
pip install streamlit fastapi pandas numpy
```

Or if you have a `requirements.txt` file:

```bash
pip install -r requirements.txt
```

**Key Dependencies:**
- `streamlit` - Web UI framework for the demo
- `fastapi` - Backend API framework
- `pandas` - Data processing and CSV loading
- `numpy` - Numerical computations

## Running the Application

### Start the Streamlit Server

Once in the project directory with the virtual environment activated, run:

```bash
streamlit run app.py
```

This command will:
1. Start a local Streamlit server (typically on `http://localhost:8501`)
2. Automatically open the application in your default web browser
3. Display the Smart City Agent Demo interface

### Expected Output

You should see output similar to:

```
  You can now view your Streamlit app in your browser.

  Local URL: http://localhost:8501
  Network URL: http://192.168.x.x:8501
```

**Note:** If the browser doesn't open automatically, manually visit `http://localhost:8501`

## Features

The Streamlit application demonstrates the following capabilities:

### 🎯 Multi-Agent Resource Management

The demo showcases 5 intelligent agents working together:

1. **Traffic Agent 🚦** - Monitors and manages vehicle congestion
2. **Energy Agent ⚡** - Manages power grid load and peak demand
3. **Environment Agent 🌫** - Monitors air quality index (AQI)
4. **Transit Agent 🚌** - Tracks public transportation delays
5. **Coordinator Agent 🤝** - Orchestrates responses between agents

### 📊 Interactive Controls

- **Input Mode Selection**: Choose between manual input or real dataset
- **Dynamic Sliders**: Adjust values for each agent in real-time
- **Status Metrics**: View current threshold status for each agent
- **Simulation Execution**: Run the agent communication simulation

## Usage Guide

### Step 1: Select Input Mode

At the top of the application, choose your input mode:

- **Manual**: Set custom values using sliders for each agent
- **Dataset**: Automatically load real data from CSV files in the `data/` folder

### Step 2: Configure Agent Values

Adjust the sliders to set:

- **Traffic Agent**: Vehicle count (0-120)
- **Energy Agent**: Energy load value (0-120)
- **Environment Agent**: Air Quality Index - AQI (0-200)
- **Transit Agent**: Delay minutes (0-30)

### Step 3: Monitor Status Metrics

View the real-time status indicators:

- Traffic: Congestion detection
- Energy: Peak load detection
- Environment: High pollution detection
- Transit: Delay detection
- Coordinator: System readiness

### Step 4: Run Simulation

Click the **"Run Simulation"** button to:

1. Activate all agents with your configured values
2. Simulate agent detection of issues
3. Execute agent-to-coordinator communication
4. Process coordination responses
5. Display the complete system log

### Step 5: Review System Log

The system log shows:

- Simulation start marker
- Agent detections and requests
- Coordinator decisions
- Resource allocation responses
- Simulation end marker

## Configuration

### Data Files

The application can load real-world data from CSV files located in `data/`:

- `Air_Quality_Data.csv` - Environmental monitoring data
- `Automatic_Traffic_Recorder_ATR_Stations.csv` - Traffic statistics
- `US Electric Grid new.csv` - Energy grid information
- `Regularities_by_liaisons_Trains_France.csv` - Transit data

### Thresholds

The application uses predefined thresholds for agent triggers (defined in `agents/coordinator.py`):

- `TRAFFIC_CONGESTION` - Vehicle count threshold
- `PEAK_LOAD` - Energy load threshold
- `HIGH_POLLUTION` - AQI threshold
- `TRANSIT_DELAY` - Delay minutes threshold

To modify thresholds, edit the `THRESHOLDS` dictionary in `agents/coordinator.py`

## Troubleshooting

### Issue: `ModuleNotFoundError: No module named 'streamlit'`

**Solution:** Ensure Streamlit is installed:
```bash
pip install streamlit
```

### Issue: `ModuleNotFoundError: No module named 'agents'`

**Solution:** Ensure you're running the command from the correct directory (project root):
```bash
cd "C:\Users\DELL\Desktop\Multi-Agent SmartCity"
streamlit run app.py
```

### Issue: Browser doesn't open automatically

**Solution:** Manually navigate to `http://localhost:8501` in your web browser

### Issue: CSV files not found error

**Solution:** Ensure the `data/` folder contains the required CSV files in the project root directory

### Issue: Port 8501 already in use

**Solution:** Run on a different port:
```bash
streamlit run app.py --server.port 8502
```

### Issue: Virtual environment not activating

**Solution:** Check the activation script:
- Windows CMD: `.venv\Scripts\activate.bat`
- Windows PowerShell: `.venv\Scripts\Activate.ps1` (may require execution policy change)
- Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

## Stopping the Application

To stop the Streamlit server:

1. Press `Ctrl + C` in the terminal
2. Wait for the server to shut down gracefully
3. The web interface will no longer be accessible

## Advanced Usage

### Running with Custom Configuration

```bash
# Disable file watcher (useful on some systems)
streamlit run app.py --logger.level=debug

# Run on specific host/port
streamlit run app.py --server.address localhost --server.port 8502
```

### Clearing Cache

If you experience caching issues:

```bash
streamlit cache clear
```

## Next Steps

After running the Streamlit demo, you can:

1. **Explore the FastAPI backend**: See `api.py` for REST endpoints
2. **Review agent implementations**: Check `agents/` directory for agent logic
3. **Deploy the React frontend**: See `FrontEnd/README.md` for frontend setup
4. **Integrate with the API**: Check `FrontEnd/API_INTEGRATION.md`

## Support

For issues or questions:

1. Check the `Troubleshooting` section above
2. Review the project's main README
3. Examine agent implementation files in `agents/` directory
4. Check data loader logic in `data_loader.py`

---

**Last Updated:** March 2026

