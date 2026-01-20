# SystemPulse 

> A real-time system telemetry dashboard designed to repurpose legacy Android devices into dedicated hardware monitors.

**SystemPulse** is a lightweight, low-latency monitoring tool that tracks your PC's CPU Load, RAM Usage, and Temperatures in real-time. It is engineered with a specific constraint: **Zero-Overhead** on the host machine (for gaming) and **Legacy Compatibility** (ES5) for client devices running Android 4.x.

## Features
* **Real-Time Telemetry:** Stream data via WebSockets (`Socket.io`) with <100ms latency.
* **Gaming Optimized:** Server logic runs on a 1000ms heartbeat to ensure <0.5% CPU usage on the host.
* **Legacy Hardware Support:** Frontend built with Vanilla JS (ES5) and old-school Flexbox to support devices as old as 2012 (e.g., Samsung Tab 3 Neo).
* **Hotspot Temperature Logic:** Calculates the maximum core temperature rather than average package temp for accurate gaming heat tracking.

## Tech Stack
* **Backend:** Node.js, Express
* **Communication:** Socket.io (WebSockets)
* **Hardware Interface:** `systeminformation` library
* **Frontend:** Vanilla JavaScript, HTML5, CSS3 (Neon/Dark Theme)

## Installation & Usage

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/yourusername/SystemPulse.git](https://github.com/yourusername/SystemPulse.git)
    cd SystemPulse
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Server**
    * *Note: Run your terminal as Administrator to access CPU/GPU Temperature sensors.*
    ```bash
    node server.js
    ```

4.  **Connect your Device**
    * Find your PC's Local IP (e.g., `ipconfig` -> `192.168.1.5`).
    * Open your tablet/phone browser and visit: `http://192.168.1.5:3000`

## License
MIT
