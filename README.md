# Network Rail Cards for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

Beautiful Lovelace cards for displaying Network Rail information from the [Network Rail Integration](https://github.com/tombanbury-cyber/homeassistant-network-rail-uk) in Home Assistant.

![Network Rail Cards](https://img.shields.io/badge/version-2.0.0-blue.svg)

## Cards Available

### 1. Network Rail Status Card
Displays real-time train movement events (arrivals, departures, passes) for station monitoring. Perfect for tracking individual trains and their status at specific locations.

### 2. Network Rail Diagram Card (NEW in v2.0)
Visualizes railway berth occupancy with real-time train positions in a graphical format. Perfect for creating signal-box style displays showing the network layout and train positions.

## Features

### Status Card Features
- 🚂 Display real-time train movement data
- 📍 Show platform information with highlighted badges
- 🧭 Display train direction (UP/DOWN towards/away from London)
- 🏢 Show train operating company
- ⏰ Display actual and planned arrival/departure times
- ✅ Status indicators (ON TIME, EARLY, LATE, OFF ROUTE)
- 📊 Show timetable variation in minutes
- 🎨 Clean, modern design with customizable display options

### Diagram Card Features
- 🗺️ Visual network layout with center station and surrounding stations
- 🟢 Real-time berth occupancy display
- 🎨 Color-coded platforms
- 🚨 Alert highlighting for freight, RHTT, steam, and other special services
- 🔢 Train count badges (total trains and alert trains)
- 💡 Hover tooltips with detailed train information
- 📐 Flexible layout options (vertical/horizontal)
- 📱 Compact mode for space-constrained displays
- 🌗 Automatic theme support (follows Home Assistant theme)

## Prerequisites

This card requires the [Network Rail UK Integration](https://github.com/tombanbury-cyber/homeassistant-network-rail-uk) v1.14.0 or later to be installed and configured in your Home Assistant instance.

For the Diagram Card specifically, you need to configure a Network Diagram sensor in the integration.

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the three dots in the top right corner
4. Select "Custom repositories"
5. Add this repository URL: `https://github.com/tombanbury-cyber/homeassistant-nruk-diagram`
6. Select category: "Lovelace"
7. Click "Add"
8. Find "Network Rail Cards" in the list and click "Install"
9. Restart Home Assistant

### Manual Installation

1. Download the `network-rail-status-card.js` and `network-rail-diagram-card.js` files from the [latest release](https://github.com/tombanbury-cyber/homeassistant-nruk-diagram/releases)
2. Copy them to your `config/www` folder (create the folder if it doesn't exist)
3. Add the resources to your Lovelace dashboard:
   - Go to Settings → Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/network-rail-status-card.js`
   - Resource type: `JavaScript Module`
   - Repeat for `/local/network-rail-diagram-card.js`
4. Restart Home Assistant

## Configuration

### Network Rail Status Card

The status card displays train movement events for a specific station.

#### Basic Configuration

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_euston
name: Euston Station
```

#### Full Configuration

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_euston
name: Euston Station
icon: mdi:train
show_platform: true
show_direction: true
show_operator: true
show_status: true
show_time: true
show_variation: true
theme: default
```

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **required** | Must be `custom:network-rail-status-card` |
| `entity` | string | **required** | Entity ID from Network Rail Integration (e.g., `sensor.network_rail_integration_euston`) |
| `name` | string | optional | Card title (defaults to station name from entity) |
| `icon` | string | `mdi:train` | Icon to display in the header |
| `show_platform` | boolean | `true` | Show/hide platform information |
| `show_direction` | boolean | `true` | Show/hide direction information |
| `show_operator` | boolean | `true` | Show/hide train operator |
| `show_status` | boolean | `true` | Show/hide status badge |
| `show_time` | boolean | `true` | Show/hide actual time |
| `show_variation` | boolean | `true` | Show/hide timetable variation |
| `theme` | string | `default` | Theme style: `default` or `compact` |

### Network Rail Diagram Card

The diagram card visualizes the network layout with berth occupancy and train positions.

#### Basic Configuration

```yaml
type: custom:network-rail-diagram-card
entity: sensor.network_rail_integration_diagram_32000
name: "Manchester Piccadilly Network"
```

#### Full Configuration

```yaml
type: custom:network-rail-diagram-card
entity: sensor.network_rail_integration_diagram_32000
name: "Manchester Piccadilly Network"
layout: vertical
compact: false
show_empty_berths: true
show_alerts: true
show_train_details: true
platform_colors:
  "1": "#4CAF50"
  "2": "#2196F3"
  "3": "#FF9800"
  "4": "#9C27B0"
  "5": "#F44336"
  "6": "#009688"
alert_color: "#FF5252"
```

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **required** | Must be `custom:network-rail-diagram-card` |
| `entity` | string | **required** | Network Diagram sensor entity ID (e.g., `sensor.network_rail_integration_diagram_32000`) |
| `name` | string | optional | Card title (defaults to center station name) |
| `layout` | string | `vertical` | Layout direction: `vertical` (up → center → down) or `horizontal` (up ← center → down) |
| `compact` | boolean | `false` | Enable compact mode with smaller berth blocks |
| `show_empty_berths` | boolean | `true` | Show or hide empty berths |
| `show_alerts` | boolean | `true` | Highlight alert trains (freight, RHTT, steam, etc.) |
| `show_train_details` | boolean | `true` | Show detailed tooltips on hover |
| `platform_colors` | object | See defaults | Custom colors for each platform number (hex colors) |
| `alert_color` | string | `#FF5252` | Color for alert train borders (hex color) |

#### Default Platform Colors

```yaml
platform_colors:
  "1": "#4CAF50"  # Green
  "2": "#2196F3"  # Blue
  "3": "#FF9800"  # Orange
  "4": "#9C27B0"  # Purple
  "5": "#F44336"  # Red
  "6": "#009688"  # Teal
  "7": "#795548"  # Brown
  "8": "#607D8B"  # Blue Grey
```

## Usage Examples

### Status Card Examples

#### Single Station Card

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_paddington
name: Paddington Station
```

#### Compact Theme

For a more condensed display:

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_kings_cross
name: Kings Cross
theme: compact
```

#### Minimal Display

Show only essential information:

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_euston
name: Euston
show_operator: false
show_variation: false
```

#### Multiple Stations

Create a grid or vertical stack with multiple cards:

```yaml
type: vertical-stack
cards:
  - type: custom:network-rail-status-card
    entity: sensor.network_rail_integration_euston
    name: Euston
  - type: custom:network-rail-status-card
    entity: sensor.network_rail_integration_paddington
    name: Paddington
  - type: custom:network-rail-status-card
    entity: sensor.network_rail_integration_kings_cross
    name: Kings Cross
```

### Diagram Card Examples

#### Basic Network Diagram

```yaml
type: custom:network-rail-diagram-card
entity: sensor.network_rail_integration_diagram_32000
name: "Manchester Piccadilly"
```

#### Horizontal Layout

Display stations side-by-side:

```yaml
type: custom:network-rail-diagram-card
entity: sensor.network_rail_integration_diagram_32000
name: "Manchester Network"
layout: horizontal
```

#### Compact Mode

For smaller displays or multiple diagrams:

```yaml
type: custom:network-rail-diagram-card
entity: sensor.network_rail_integration_diagram_32000
name: "Manchester Piccadilly"
compact: true
show_empty_berths: false
```

#### Custom Platform Colors

Match your station's actual platform colors:

```yaml
type: custom:network-rail-diagram-card
entity: sensor.network_rail_integration_diagram_32000
name: "Manchester Piccadilly"
platform_colors:
  "1": "#FF6B35"  # Orange for Platform 1
  "2": "#004E89"  # Navy for Platform 2
  "3": "#1A659E"  # Blue for Platform 3
  "13": "#F77F00" # Amber for Platform 13
  "14": "#06A77D" # Green for Platform 14
```

#### Signal Box Style Dashboard

Create a comprehensive control-room style view:

```yaml
type: vertical-stack
cards:
  - type: custom:network-rail-diagram-card
    entity: sensor.network_rail_integration_diagram_32000
    name: "Manchester Piccadilly"
    show_alerts: true
    compact: false
  - type: horizontal-stack
    cards:
      - type: custom:network-rail-status-card
        entity: sensor.network_rail_integration_manchester_piccadilly
        name: "Arrivals/Departures"
        theme: compact
      - type: sensor
        entity: binary_sensor.network_rail_integration_feed_connected
        name: "Feed Status"
```

#### Multiple Diagrams Side by Side

```yaml
type: horizontal-stack
cards:
  - type: custom:network-rail-diagram-card
    entity: sensor.network_rail_integration_diagram_32000
    name: "Manchester"
    compact: true
  - type: custom:network-rail-diagram-card
    entity: sensor.network_rail_integration_diagram_33000
    name: "Liverpool"
    compact: true
```

## Understanding the Diagram Card

### Visual Elements

#### Berth Display
- **Empty Berths**: Light gray with dashed border
- **Occupied Berths**: Solid border with headcode displayed
- **Platform Badge**: Small colored badge showing platform number (e.g., "P1")
- **Alert Icon**: ⚠️ icon for special services (freight, RHTT, steam, etc.)

#### Station Sections
- **Center Station**: Your configured monitoring point with highlighted border
- **Up Stations**: Stations in the "up" direction (typically towards London)
- **Down Stations**: Stations in the "down" direction (typically away from London)

#### Train Information
Hover over an occupied berth to see:
- Train headcode and service type
- Current berth ID
- Origin and destination stations
- Operating company
- Time in the diagram area
- Alert reason (if applicable)

### Layout Options

**Vertical Layout** (default)
```
┌─────────────────┐
│   Up Station    │
│   [berths...]   │
└─────────────────┘
        ↓
┌─────────────────┐
│ CENTER STATION  │
│   [berths...]   │
└─────────────────┘
        ↓
┌─────────────────┐
│  Down Station   │
│   [berths...]   │
└─────────────────┘
```

**Horizontal Layout**
```
┌────────────┐  →  ┌──────────────┐  →  ┌────────────┐
│ Up Station │     │    CENTER    │     │Down Station│
│ [berths]   │     │   [berths]   │     │  [berths]  │
└────────────┘     └──────────────┘     └────────────┘
```

## Troubleshooting

### Status Card Issues

#### Card not showing

1. Make sure the Network Rail Integration is installed and configured
2. Verify the entity ID is correct
3. Check that the resource is properly added in Lovelace
4. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

#### "No train data available"

This is normal when:
- No trains have passed the configured station recently
- The Network Rail feed is disconnected
- The entity is unavailable

Check the `binary_sensor.network_rail_integration_feed_connected` entity to verify the feed connection status.

### Diagram Card Issues

#### "No diagram data available"

This appears when:
- The Network Diagram sensor entity is unavailable
- The integration hasn't received berth data yet (can take a few minutes after startup)
- The entity ID is incorrect

**Solutions:**
1. Verify the entity ID matches a Network Diagram sensor (not a train movement sensor)
2. Check that the diagram sensor is configured in the integration
3. Wait a few minutes after restarting Home Assistant for data to populate
4. Check integration logs for any errors

#### Empty berths not showing

If you've set `show_empty_berths: false`, empty berths are hidden by design. Set it to `true` to see all berths.

#### Train tooltips not appearing

Make sure:
- `show_train_details: true` is set (it's the default)
- You're hovering over an occupied berth (one with a headcode)
- Your browser supports the `title` attribute for tooltips

#### Platform colors not applying

Check that:
- Platform numbers in your `platform_colors` config match the actual platform values from the sensor
- Colors are valid hex codes (e.g., `#FF0000` not `red`)
- The berths have platform information available

#### Alert trains not highlighted

Alert train highlighting requires:
- Integration v1.14.0 or later with alert services enabled
- `show_alerts: true` in your card config (default)
- Trains that match alert criteria (freight, RHTT, steam, etc.)

### General Issues

#### Cards not registering after installation

1. Clear browser cache completely
2. Restart Home Assistant
3. Try accessing from an incognito/private window
4. Check browser console (F12) for JavaScript errors

#### Resource loading errors

If you see "Custom element doesn't exist" errors:
1. Verify the JS files are in the correct location (`config/www/`)
2. Check that resources are added correctly in Settings → Dashboards → Resources
3. The resource type must be "JavaScript Module" not "JavaScript"

## Entity Requirements

### For Status Card
Use a **Train Movement sensor** entity from the integration:
- Format: `sensor.network_rail_integration_<station_name>`
- Example: `sensor.network_rail_integration_manchester_piccadilly`

These sensors provide:
- Event type (arrival, departure, pass)
- Platform information
- Operator details
- Timing information

### For Diagram Card
Use a **Network Diagram sensor** entity from the integration:
- Format: `sensor.network_rail_integration_diagram_<stanox>`
- Example: `sensor.network_rail_integration_diagram_32000`

These sensors provide:
- Center station information
- Up/Down stations
- Berth occupancy data
- Train positions and details
- Alert information (v1.14.0+)

See the [Network Rail Integration documentation](https://github.com/tombanbury-cyber/homeassistant-network-rail-uk) for configuration details.

## Styling

Both cards automatically adapt to your Home Assistant theme. They use the following CSS variables which you can override in your theme:

- `--primary-color` - Main accent color
- `--primary-text-color` - Main text color
- `--secondary-text-color` - Secondary text color
- `--card-background-color` - Card background
- `--divider-color` - Border colors

## Development

### Building from source

```bash
npm install
npm run build
```

The built files will be in the `dist/` folder:
- `network-rail-status-card.js`
- `network-rail-diagram-card.js`

### Watch mode

```bash
npm run watch
```

Changes will automatically rebuild the cards.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Credits

- Designed for the [Network Rail UK Integration](https://github.com/tombanbury-cyber/homeassistant-network-rail-uk)
- Built with [Lit](https://lit.dev/)
- Uses data from Network Rail's open data feeds

## Support

If you find these cards useful, please star the repository!

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/tombanbury-cyber/homeassistant-nruk-diagram/issues).

## Changelog

### Version 2.0.0
- ✨ **NEW**: Network Rail Diagram Card for visualizing berth occupancy
- 🎨 Platform color coding
- 🚨 Alert train highlighting
- 📐 Flexible layouts (vertical/horizontal)
- 💡 Interactive tooltips with train details
- 📦 Shared TypeScript types between cards
- 📚 Comprehensive documentation and examples
- 🔧 Enhanced build system supporting multiple cards

### Version 1.0.0
- Initial release of Network Rail Status Card
- Train movement display
- Platform and operator information
- Status indicators and timing data