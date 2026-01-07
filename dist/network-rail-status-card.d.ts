import { LitElement, PropertyValues } from 'lit';
import { HomeAssistant, NetworkRailStatusCardConfig } from './types.js';
export declare class NetworkRailStatusCard extends LitElement {
    hass?: HomeAssistant;
    private config?;
    setConfig(config: NetworkRailStatusCardConfig): void;
    protected shouldUpdate(changedProps: PropertyValues): boolean;
    getCardSize(): number;
    static styles: import("lit").CSSResult;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'network-rail-status-card': NetworkRailStatusCard;
    }
}
//# sourceMappingURL=network-rail-status-card.d.ts.map