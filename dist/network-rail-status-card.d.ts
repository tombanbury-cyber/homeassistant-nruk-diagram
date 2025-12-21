import { LitElement, PropertyValues } from 'lit';
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
export {};
//# sourceMappingURL=network-rail-status-card.d.ts.map