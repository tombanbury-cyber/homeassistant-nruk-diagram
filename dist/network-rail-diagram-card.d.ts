import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { HomeAssistant, NetworkRailDiagramCardConfig } from './types.js';
export declare class NetworkRailDiagramCard extends LitElement {
    hass?: HomeAssistant;
    private config?;
    private readonly defaultPlatformColors;
    setConfig(config: NetworkRailDiagramCardConfig): void;
    protected shouldUpdate(changedProps: PropertyValues): boolean;
    getCardSize(): number;
    private getTrainInfo;
    private formatTimeInDiagram;
    private getPlatformColor;
    private renderBerth;
    private getBerthTooltip;
    private renderStation;
    private renderCenterStation;
    static styles: import("lit").CSSResult;
    protected render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'network-rail-diagram-card': NetworkRailDiagramCard;
    }
}
//# sourceMappingURL=network-rail-diagram-card.d.ts.map