import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Define the card configuration interface
interface NetworkRailStatusCardConfig {
  type: string;
  entity?: string;
  name?: string;
  show_platform?: boolean;
  show_direction?: boolean;
  show_operator?: boolean;
  show_status?: boolean;
  show_time?: boolean;
  show_variation?: boolean;
  icon?: string;
  theme?: 'default' | 'compact';
}

// Define the Home Assistant types
interface HomeAssistant {
  states: {
    [entity_id: string]: {
      state: string;
      attributes: {
        [key: string]: any;
      };
      last_changed: string;
      last_updated: string;
    };
  };
  callService: (domain: string, service: string, serviceData?: any) => void;
}

// Custom card class
@customElement('network-rail-status-card')
export class NetworkRailStatusCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: NetworkRailStatusCardConfig;

  // Required for Home Assistant card configuration
  public setConfig(config: NetworkRailStatusCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = {
      show_platform: true,
      show_direction: true,
      show_operator: true,
      show_status: true,
      show_time: true,
      show_variation: true,
      theme: 'default',
      ...config
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
    return 3;
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
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--divider-color);
    }

    .header-icon {
      margin-right: 12px;
      color: var(--primary-color);
    }

    .header-text {
      flex: 1;
      font-size: 1.2em;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .unavailable {
      text-align: center;
      padding: 20px;
      color: var(--secondary-text-color);
      font-style: italic;
    }

    .event-type {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.9em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .event-type.arrival {
      background-color: rgba(76, 175, 80, 0.2);
      color: #4CAF50;
    }

    .event-type.departure {
      background-color: rgba(33, 150, 243, 0.2);
      color: #2196F3;
    }

    .event-type.pass {
      background-color: rgba(158, 158, 158, 0.2);
      color: #9E9E9E;
    }

    .train-info {
      display: grid;
      gap: 12px;
      margin-top: 8px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      background-color: var(--card-background-color, var(--primary-background-color));
      border-radius: 8px;
    }

    .info-label {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      font-weight: 500;
    }

    .info-value {
      color: var(--primary-text-color);
      font-size: 1em;
      font-weight: 600;
      text-align: right;
    }

    .platform-badge {
      display: inline-block;
      background-color: var(--primary-color);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 1.1em;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.85em;
    }

    .status-badge.on-time {
      background-color: rgba(76, 175, 80, 0.2);
      color: #4CAF50;
    }

    .status-badge.early {
      background-color: rgba(33, 150, 243, 0.2);
      color: #2196F3;
    }

    .status-badge.late {
      background-color: rgba(244, 67, 54, 0.2);
      color: #F44336;
    }

    .status-badge.off-route {
      background-color: rgba(255, 152, 0, 0.2);
      color: #FF9800;
    }

    .compact .train-info {
      gap: 8px;
    }

    .compact .info-row {
      padding: 6px;
    }

    .compact .info-label,
    .compact .info-value {
      font-size: 0.85em;
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
            <ha-icon class="header-icon" icon="${this.config.icon || 'mdi:train'}"></ha-icon>
            <div class="header-text">${this.config.name || 'Network Rail Status'}</div>
          </div>
          <div class="unavailable">No train data available</div>
        </ha-card>
      `;
    }

    const attrs = entity.attributes;
    const eventType = attrs.event_type;
    const platform = attrs.platform;
    const direction = attrs.direction_description;
    const operator = attrs.toc_name;
    const actualTime = attrs.actual_time_local;
    const plannedTime = attrs.planned_time_local;
    const variation = attrs.timetable_variation;
    const status = attrs.variation_status;
    const trainId = attrs.train_id;

    const eventClass = eventType?.toLowerCase() || '';
    const statusClass = status?.toLowerCase().replace(/\s+/g, '-') || '';
    const themeClass = this.config.theme === 'compact' ? 'compact' : '';

    return html`
      <ha-card class="${themeClass}">
        <div class="header">
          <ha-icon class="header-icon" icon="${this.config.icon || 'mdi:train'}"></ha-icon>
          <div class="header-text">${this.config.name || attrs.station_name || 'Network Rail Status'}</div>
        </div>

        ${eventType ? html`
          <div class="event-type ${eventClass}">${eventType}</div>
        ` : ''}

        <div class="train-info">
          ${this.config.show_operator && operator ? html`
            <div class="info-row">
              <span class="info-label">Operator</span>
              <span class="info-value">${operator}</span>
            </div>
          ` : ''}

          ${this.config.show_platform && platform ? html`
            <div class="info-row">
              <span class="info-label">Platform</span>
              <span class="info-value">
                <span class="platform-badge">${platform}</span>
              </span>
            </div>
          ` : ''}

          ${this.config.show_direction && direction ? html`
            <div class="info-row">
              <span class="info-label">Direction</span>
              <span class="info-value">${direction}</span>
            </div>
          ` : ''}

          ${this.config.show_time && actualTime ? html`
            <div class="info-row">
              <span class="info-label">Time</span>
              <span class="info-value">${actualTime}</span>
            </div>
          ` : ''}

          ${this.config.show_status && status ? html`
            <div class="info-row">
              <span class="info-label">Status</span>
              <span class="info-value">
                <span class="status-badge ${statusClass}">${status}</span>
              </span>
            </div>
          ` : ''}

          ${this.config.show_variation && variation !== undefined && variation !== null ? html`
            <div class="info-row">
              <span class="info-label">Variation</span>
              <span class="info-value">${variation > 0 ? '+' : ''}${variation} min</span>
            </div>
          ` : ''}

          ${trainId ? html`
            <div class="info-row">
              <span class="info-label">Train ID</span>
              <span class="info-value">${trainId}</span>
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
    'network-rail-status-card': NetworkRailStatusCard;
  }
}

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'network-rail-status-card',
  name: 'Network Rail Status Card',
  description: 'Display Network Rail train movement information',
  preview: false,
  documentationURL: 'https://github.com/tombanbury-cyber/network-rail-integration-lovelace-satus-card'
});

console.info(
  '%c NETWORK-RAIL-STATUS-CARD %c 1.0.0 ',
  'color: white; background: #2196F3; font-weight: 700;',
  'color: #2196F3; background: white; font-weight: 700;'
);
