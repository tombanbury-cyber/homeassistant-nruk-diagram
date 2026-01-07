import { LitElement, html, css, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  NetworkRailDiagramCardConfig,
  BerthInfo,
  StationInfo,
  TrainInfo,
  NetworkDiagramState
} from './types.js';

// Custom card class
@customElement('network-rail-diagram-card')
export class NetworkRailDiagramCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: NetworkRailDiagramCardConfig;

  // Default platform colors
  private readonly defaultPlatformColors: Record<string, string> = {
    '1': '#4CAF50',
    '2': '#2196F3',
    '3': '#FF9800',
    '4': '#9C27B0',
    '5': '#F44336',
    '6': '#009688',
    '7': '#795548',
    '8': '#607D8B',
  };

  // Required for Home Assistant card configuration
  public setConfig(config: NetworkRailDiagramCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = {
      layout: 'vertical',
      compact: false,
      show_empty_berths: true,
      show_alerts: true,
      show_train_details: true,
      show_up_lines: true,
      show_down_lines: true,
      alert_color: '#FF5252',
      ...config,
      platform_colors: {
        ...this.defaultPlatformColors,
        ...(config.platform_colors || {})
      }
    };
  }

  // Required for proper rendering in Home Assistant
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }
    return true;
  }

  // Card size for layout purposes
  public getCardSize(): number {
    return 5;
  }

  // Helper function to get train info by headcode
  private getTrainInfoByHeadcode(headcode: string, trains?: TrainInfo[]): TrainInfo | undefined {
    if (!trains || !headcode) return undefined;
    return trains.find(t => t.headcode === headcode);
  }

  // Helper function to format time in diagram
  private formatTimeInDiagram(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  }

  // Helper function to get platform color
  private getPlatformColor(platform?: string): string {
    if (!platform || !this.config) return 'var(--primary-color)';
    return this.config.platform_colors?.[platform] || 'var(--primary-color)';
  }

  // Render a single berth
  private renderBerth(berth: BerthInfo, trains?: TrainInfo[]): TemplateResult {
    if (!this.config) return html``;
    
    const trainInfo = berth.headcode ? this.getTrainInfoByHeadcode(berth.headcode, trains) : undefined;
    const isAlert = trainInfo?.triggers_alert || false;
    const platformColor = this.getPlatformColor(berth.platform);
    const alertColor = this.config.alert_color || '#FF5252';

    // Don't render empty berths if configured
    if (!berth.occupied && !this.config.show_empty_berths) {
      return html``;
    }

    const berthClass = `berth ${berth.occupied ? 'occupied' : 'empty'} ${isAlert ? 'alert' : ''} ${this.config.compact ? 'compact' : ''}`;
    const borderColor = isAlert ? alertColor : (berth.occupied && berth.platform ? platformColor : 'var(--divider-color)');

    return html`
      <div 
        class="${berthClass}" 
        style="border-color: ${borderColor}; ${berth.occupied && berth.platform ? `background-color: ${platformColor}15;` : ''}"
        title="${this.getBerthTooltip(berth, trainInfo)}"
      >
        <div class="berth-id">${berth.berth_id}</div>
        ${berth.occupied && berth.headcode ? html`
          <div class="berth-headcode">${berth.headcode}</div>
        ` : ''}
        ${berth.platform ? html`
          <div class="platform-badge" style="background-color: ${platformColor};">
            P${berth.platform}
          </div>
        ` : ''}
        ${isAlert ? html`
          <div class="alert-icon">⚠️</div>
        ` : ''}
      </div>
    `;
  }

  // Generate tooltip text for berth
  private getBerthTooltip(berth: BerthInfo, trainInfo?: TrainInfo): string {
    if (!berth.occupied || !berth.headcode) {
      return `${berth.berth_id} - Empty`;
    }

    if (!trainInfo) {
      return `${berth.berth_id} - ${berth.headcode}`;
    }

    let tooltip = `🚂 ${trainInfo.headcode}`;
    if (trainInfo.service_type) {
      tooltip += ` (${trainInfo.service_type})`;
    }
    tooltip += `\n━━━━━━━━━━━━━━━━━━━`;
    tooltip += `\nBerth: ${berth.berth_id}`;
    if (trainInfo.origin) {
      tooltip += `\nOrigin: ${trainInfo.origin}`;
    }
    if (trainInfo.destination) {
      tooltip += `\nDest: ${trainInfo.destination}`;
    }
    if (trainInfo.operator) {
      tooltip += `\nOperator: ${trainInfo.operator}`;
    }
    if (trainInfo.time_in_diagram_seconds) {
      tooltip += `\nIn area: ${this.formatTimeInDiagram(trainInfo.time_in_diagram_seconds)}`;
    }
    if (trainInfo.triggers_alert && trainInfo.alert_reason) {
      tooltip += `\n━━━━━━━━━━━━━━━━━━━`;
      tooltip += `\n⚠️ Alert: ${trainInfo.alert_reason}`;
    }

    return tooltip;
  }

  // Render a station section
  private renderStation(station: StationInfo, trains?: TrainInfo[], isCenter: boolean = false): TemplateResult {
    if (!this.config) return html``;

    return html`
      <div class="station ${isCenter ? 'center-station' : ''} ${this.config.compact ? 'compact' : ''}">
        <div class="station-header">
          <div class="station-name">${station.name}</div>
          <div class="station-stanox">${station.stanox}</div>
        </div>
        <div class="berths-container ${this.config.layout === 'horizontal' ? 'horizontal' : 'vertical'}">
          ${station.berths.map(berth => this.renderBerth(berth, trains))}
        </div>
      </div>
    `;
  }

  // Render berths between stations
  private renderBetweenBerths(berths: BerthInfo[], trains?: TrainInfo[]): TemplateResult {
    if (!this.config || !berths?.length) return html``;

    return html`
      <div class="between-berths ${this.config.compact ? 'compact' : ''}">
        <div class="berths-container ${this.config.layout === 'horizontal' ? 'horizontal' : 'vertical'}">
          ${berths.map(berth => this.renderBerth(berth, trains))}
        </div>
      </div>
    `;
  }

  // Render center station
  private renderCenterStation(attrs: NetworkDiagramState): TemplateResult {
    if (!this.config) return html``;

    const centerStation: StationInfo = {
      stanox: attrs.center_stanox,
      name: attrs.center_name,
      berths: attrs.center_berths || []
    };

    return this.renderStation(centerStation, attrs.trains_in_diagram, true);
  }

  // Define styles
  static styles = css`
    :host {
      display: block;
    }
    
    ha-card {
      padding: 16px;
      position: relative;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--divider-color);
    }

    .header-left {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .header-icon {
      margin-right: 12px;
      color: var(--primary-color);
    }

    .header-text {
      font-size: 1.2em;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .header-stats {
      display: flex;
      gap: 12px;
      font-size: 0.9em;
    }

    .stat-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 12px;
      background-color: var(--primary-color);
      color: white;
      font-weight: 600;
    }

    .stat-badge.alert {
      background-color: #FF5252;
    }

    .unavailable {
      text-align: center;
      padding: 20px;
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .diagram-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .diagram-container.horizontal {
      flex-direction: row;
      align-items: center;
    }

    .station {
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background-color: var(--card-background-color, var(--primary-background-color));
    }

    .station.compact {
      padding: 8px;
    }

    .center-station {
      border: 2px solid var(--primary-color);
      background-color: var(--primary-color)08;
    }

    .station-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--divider-color);
    }

    .station-name {
      font-weight: 600;
      font-size: 1em;
      color: var(--primary-text-color);
    }

    .station-stanox {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      font-family: monospace;
    }

    .berths-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .berths-container.horizontal {
      flex-direction: row;
    }

    .berths-container.vertical {
      flex-direction: column;
    }

    .berth {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      min-height: 50px;
      padding: 8px;
      border: 2px solid var(--divider-color);
      border-radius: 6px;
      background-color: white;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .berth.compact {
      min-width: 50px;
      min-height: 40px;
      padding: 6px;
    }

    .berth:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .berth.empty {
      background-color: #f5f5f5;
      border-style: dashed;
    }

    .berth.occupied {
      border-width: 3px;
      font-weight: 600;
    }

    .berth.alert {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .berth-id {
      font-size: 0.75em;
      color: var(--secondary-text-color);
      font-family: monospace;
      margin-bottom: 4px;
    }

    .berth.compact .berth-id {
      font-size: 0.65em;
    }

    .berth-headcode {
      font-size: 1.2em;
      font-weight: 700;
      color: var(--primary-text-color);
      text-align: center;
    }

    .berth.compact .berth-headcode {
      font-size: 1em;
    }

    .platform-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7em;
      font-weight: 700;
      color: white;
      background-color: var(--primary-color);
    }

    .berth.compact .platform-badge {
      padding: 1px 4px;
      font-size: 0.6em;
    }

    .alert-icon {
      position: absolute;
      bottom: 4px;
      right: 4px;
      font-size: 1em;
    }

    .berth.compact .alert-icon {
      font-size: 0.8em;
    }

    .direction-arrow {
      text-align: center;
      font-size: 1.5em;
      color: var(--primary-color);
      padding: 8px;
    }

    .diagram-container.horizontal .direction-arrow {
      writing-mode: vertical-rl;
      text-orientation: upright;
    }

    .up-stations, .down-stations {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .diagram-container.horizontal .up-stations,
    .diagram-container.horizontal .down-stations {
      flex-direction: row;
    }

    .between-berths {
      padding: 8px;
      border: 1px dashed var(--divider-color);
      border-radius: 6px;
      background-color: rgba(128, 128, 128, 0.05);
    }

    .between-berths.compact {
      padding: 6px;
    }
  `;

  // Render method
  protected render() {
    if (!this.config || !this.hass || !this.config.entity) {
      return html``;
    }

    const entity = this.hass.states[this.config.entity];
    const entityState = entity?.state;

    if (!entity || entityState === 'unavailable' || entityState === 'unknown') {
      return html`
        <ha-card>
          <div class="header">
            <div class="header-left">
              <ha-icon class="header-icon" icon="mdi:transit-connection-variant"></ha-icon>
              <div class="header-text">${this.config.name || 'Network Rail Diagram'}</div>
            </div>
          </div>
          <div class="unavailable">No diagram data available</div>
        </ha-card>
      `;
    }

    const attrs = entity.attributes as NetworkDiagramState;

    return html`
      <ha-card>
        <div class="header">
          <div class="header-left">
            <ha-icon class="header-icon" icon="mdi:transit-connection-variant"></ha-icon>
            <div class="header-text">${this.config.name || attrs.center_name || 'Network Rail Diagram'}</div>
          </div>
          ${(attrs.total_trains !== undefined || attrs.alert_trains !== undefined) ? html`
            <div class="header-stats">
              ${attrs.total_trains !== undefined ? html`
                <span class="stat-badge">🚂 ${attrs.total_trains}</span>
              ` : ''}
              ${attrs.alert_trains !== undefined && attrs.alert_trains > 0 ? html`
                <span class="stat-badge alert">⚠️ ${attrs.alert_trains}</span>
              ` : ''}
            </div>
          ` : ''}
        </div>

        <div class="diagram-container ${this.config.layout === 'horizontal' ? 'horizontal' : ''}">
          ${this.config.show_up_lines && attrs.up_stations && attrs.up_stations.length > 0 ? html`
            <div class="up-stations">
              ${attrs.up_stations.map(station => this.renderStation(station, attrs.trains_in_diagram))}
            </div>
            ${attrs.up_between_berths?.length ? html`
              ${this.renderBetweenBerths(attrs.up_between_berths, attrs.trains_in_diagram)}
            ` : ''}
            <div class="direction-arrow">↓</div>
          ` : ''}

          ${this.renderCenterStation(attrs)}

          ${this.config.show_down_lines && attrs.down_stations && attrs.down_stations.length > 0 ? html`
            <div class="direction-arrow">↓</div>
            ${attrs.down_between_berths?.length ? html`
              ${this.renderBetweenBerths(attrs.down_between_berths, attrs.trains_in_diagram)}
            ` : ''}
            <div class="down-stations">
              ${attrs.down_stations.map(station => this.renderStation(station, attrs.trains_in_diagram))}
            </div>
          ` : ''}
        </div>
      </ha-card>
    `;
  }
}

// Declare the custom element for Home Assistant
declare global {
  interface HTMLElementTagNameMap {
    'network-rail-diagram-card': NetworkRailDiagramCard;
  }
}

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'network-rail-diagram-card',
  name: 'Network Rail Diagram Card',
  description: 'Display Network Rail berth occupancy in a graphical diagram',
  preview: false,
  documentationURL: 'https://github.com/tombanbury-cyber/homeassistant-nruk-diagram'
});

console.info(
  '%c NETWORK-RAIL-DIAGRAM-CARD %c 2.0.0 ',
  'color: white; background: #4CAF50; font-weight: 700;',
  'color: #4CAF50; background: white; font-weight: 700;'
);
