var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var si = require('systeminformation');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = socketIo(server);

var PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

var staticData = {
    cpu: '',
    os: ''
};

// Fetch static data once at startup
function fetchStaticData() {
    si.cpu().then(function(data) {
        staticData.cpu = data.manufacturer + ' ' + data.brand;
    });
    si.osInfo().then(function(data) {
        staticData.os = data.distro + ' (' + data.arch + ')';
    });
}

fetchStaticData();

// Fetch dynamic data every 1000ms
setInterval(function() {
    Promise.all([
        si.currentLoad(),
        si.mem(),
        si.cpuTemperature()
    ]).then(function(results) {
        var load = results[0];
        var mem = results[1];
        var temp = results[2];

        // --- NEW TEMP LOGIC START ---
        // Default to the main package temp
        var cleanTemp = temp.main;

        // If we have individual core data, find the max (hottest core)
        // This makes the number fluctuate more realistically for gaming
        if (temp.cores && temp.cores.length > 0) {
            // Math.max.apply is the ES5 way to find max in an array
            var maxCore = Math.max.apply(null, temp.cores);
            if (maxCore > cleanTemp) {
                cleanTemp = maxCore;
            }
        }

        // Final safety check for -1 or null
        if (!cleanTemp || cleanTemp < 0) {
            cleanTemp = 'N/A';
        }
        // --- NEW TEMP LOGIC END ---

        var stats = {
            cpu: staticData.cpu,
            os: staticData.os,
            cpuLoad: Math.round(load.currentLoad),
            memTotal: (mem.total / (1024 * 1024 * 1024)).toFixed(2),
            memUsed: (mem.active / (1024 * 1024 * 1024)).toFixed(2),
            memPercent: Math.round((mem.active / mem.total) * 100),
            cpuTemp: cleanTemp
        };

        io.emit('stats', stats);
    }).catch(function(err) {
        console.error('Error fetching stats:', err);
    });
}, 1000);

server.listen(PORT, '0.0.0.0', function() {
    console.log('SystemPulse running on http://0.0.0.0:' + PORT);
    console.log('Accessible on your local network!');
    console.log('REMINDER: If Temp is N/A, restart this terminal as Administrator.');
});