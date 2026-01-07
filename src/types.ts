// Shared TypeScript interfaces for Network Rail cards

// Home Assistant types
export interface HomeAssistant {
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

// Network Rail Status Card types
export interface NetworkRailStatusCardConfig {
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

// Network Rail Diagram Card types
export interface NetworkRailDiagramCardConfig {
  type: string;
  entity?: string;
  name?: string;
  layout?: 'vertical' | 'horizontal';
  compact?: boolean;
  show_empty_berths?: boolean;
  show_alerts?: boolean;
  show_train_details?: boolean;
  platform_colors?: Record<string, string>;
  alert_color?: string;
}

// Network Diagram Sensor data structures
export interface BerthInfo {
  berth_id: string;
  td_area: string;
  platform?: string;
  occupied: boolean;
  headcode: string | null;
}

export interface StationInfo {
  stanox: string;
  name: string;
  berths: BerthInfo[];
}

export interface TrainInfo {
  train_id: string;
  headcode: string;
  current_berth: string;
  entered_diagram_at: string;
  time_in_diagram_seconds: number;
  berths_visited: string[];
  service_type?: string;
  category?: string;
  origin?: string;
  destination?: string;
  operator?: string;
  triggers_alert?: boolean;
  alert_reason?: string;
}

export interface NetworkDiagramState {
  center_stanox: string;
  center_name: string;
  center_berths: BerthInfo[];
  up_stations: StationInfo[];
  down_stations: StationInfo[];
  smart_data_available: boolean;
  diagram_range: number;
  trains_in_diagram?: TrainInfo[];
  total_trains?: number;
  alert_trains?: number;
  alert_services_enabled?: Record<string, boolean>;
}
