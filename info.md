# Network Rail Status Card

A beautiful custom Lovelace card for displaying real-time Network Rail train movement information in Home Assistant.

## Features

- 🚂 Real-time train movement data display
- 📍 Platform information with highlighted badges
- 🧭 Train direction indicators
- 🏢 Train operating company display
- ⏰ Actual and planned times
- ✅ Status indicators (ON TIME, EARLY, LATE, OFF ROUTE)
- 📊 Timetable variation display
- 🎨 Modern design with theme support

## Requirements

Requires the [Network Rail Integration](https://github.com/tombanbury-cyber/network-rail-integration) to be installed and configured.

## Quick Start

After installation, add the card to your Lovelace dashboard:

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_euston
name: Euston Station
```

For more configuration options and examples, see the [full documentation](https://github.com/tombanbury-cyber/network-rail-integration-lovelace-satus-card).
