# Network Rail Status Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

A beautiful Lovelace card for displaying Network Rail train movement information from the [Network Rail Integration](https://github.com/tombanbury-cyber/network-rail-integration) in Home Assistant.

![Network Rail Status Card](https://img.shields.io/badge/version-1.0.0-blue.svg)

## Features

- 🚂 Display real-time train movement data
- 📍 Show platform information with highlighted badges
- 🧭 Display train direction (UP/DOWN towards/away from London)
- 🏢 Show train operating company
- ⏰ Display actual and planned arrival/departure times
- ✅ Status indicators (ON TIME, EARLY, LATE, OFF ROUTE)
- 📊 Show timetable variation in minutes
- 🎨 Clean, modern design with customizable display options
- 📱 Responsive layout that works on all devices
- 🌗 Automatic theme support (follows Home Assistant theme)

## Preview

The card displays comprehensive train movement information including:
- Event type (ARRIVAL, DEPARTURE, PASS) with color-coded badges
- Train operator name
- Platform number with prominent display
- Direction of travel
- Actual time
- Status with color indicators
- Time variation from schedule
- Train ID

## Prerequisites

This card requires the [Network Rail Integration](https://github.com/tombanbury-cyber/network-rail-integration) to be installed and configured in your Home Assistant instance.

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the three dots in the top right corner
4. Select "Custom repositories"
5. Add this repository URL: `https://github.com/tombanbury-cyber/network-rail-integration-lovelace-satus-card`
6. Select category: "Lovelace"
7. Click "Add"
8. Find "Network Rail Status Card" in the list and click "Install"
9. Restart Home Assistant

### Manual Installation

1. Download the `network-rail-status-card.js` file from the [latest release](https://github.com/tombanbury-cyber/network-rail-integration-lovelace-satus-card/releases)
2. Copy it to your `config/www` folder (create the folder if it doesn't exist)
3. Add the resource to your Lovelace dashboard:
   - Go to Settings → Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/network-rail-status-card.js`
   - Resource type: `JavaScript Module`
4. Restart Home Assistant

## Configuration

Add the card to your Lovelace dashboard:

### Basic Configuration

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_euston
name: Euston Station
```

### Full Configuration

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

### Configuration Options

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

## Usage Examples

### Single Station Card

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_paddington
name: Paddington Station
```

### Compact Theme

For a more condensed display:

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_kings_cross
name: Kings Cross
theme: compact
```

### Minimal Display

Show only essential information:

```yaml
type: custom:network-rail-status-card
entity: sensor.network_rail_integration_euston
name: Euston
show_operator: false
show_variation: false
```

### Multiple Stations

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

## Styling

The card automatically adapts to your Home Assistant theme. It uses the following CSS variables which you can override in your theme:

- `--primary-color` - Main accent color
- `--primary-text-color` - Main text color
- `--secondary-text-color` - Secondary text color
- `--card-background-color` - Card background
- `--divider-color` - Border colors

## Troubleshooting

### Card not showing

1. Make sure the Network Rail Integration is installed and configured
2. Verify the entity ID is correct
3. Check that the resource is properly added in Lovelace
4. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### "No train data available"

This is normal when:
- No trains have passed the configured station recently
- The Network Rail feed is disconnected
- The entity is unavailable

Check the `binary_sensor.network_rail_integration_feed_connected` entity to verify the feed connection status.

## Development

### Building from source

```bash
npm install
npm run build
```

The built file will be in the `dist/` folder.

### Watch mode

```bash
npm run watch
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Credits

- Designed for the [Network Rail Integration](https://github.com/tombanbury-cyber/network-rail-integration)
- Built with [Lit](https://lit.dev/)
- Uses data from Network Rail's open data feeds

## Support

If you find this card useful, please star the repository!

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/tombanbury-cyber/network-rail-integration-lovelace-satus-card/issues).