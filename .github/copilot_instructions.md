# GitHub Copilot Instructions for Lovelace Card Development

This file provides guidance to GitHub Copilot when assisting with the development of custom Lovelace cards for Home Assistant.

## Project Context

This repository contains a custom Lovelace card for Home Assistant that displays Network Rail integration status information. 

## Development Principles

### 1. Home Assistant Lovelace Card Architecture

- **Extend LitElement**:  All custom cards should extend `LitElement` from the `lit` library
- **Implement Card Interface**: Cards must implement the `LovelaceCard` interface with required methods: 
  - `setConfig(config)`: Validate and store card configuration
  - `getCardSize()`: Return the estimated height of the card in grid rows
- **Custom Element Registration**: Register the card as a custom element using `customElements.define()`

### 2. Configuration Validation

- Always validate configuration in `setConfig()` method
- Throw errors for missing required configuration properties
- Provide clear, user-friendly error messages
- Support default values for optional configuration properties
- Use TypeScript interfaces to define configuration schema

Example: 
```typescript
setConfig(config) {
  if (!config.entity) {
    throw new Error('You must specify an entity');
  }
  this._config = config;
}
```

### 3. State Management and Updates

- Subscribe to Home Assistant state changes using `hass` property
- Implement `set hass(hass)` setter to receive state updates
- Always check if entity exists before accessing state
- Handle missing or unavailable entities gracefully
- Use `this.requestUpdate()` when manual re-rendering is needed

### 4. Visual Design Best Practices

- **Responsive Design**: Cards should adapt to different screen sizes
- **Theme Support**: Use Home Assistant CSS variables for colors and styling: 
  - `--primary-color`
  - `--primary-text-color`
  - `--secondary-text-color`
  - `--card-background-color`
  - `--divider-color`
  - `--disabled-text-color`
- **Accessibility**: Include proper ARIA labels and semantic HTML
- **Consistent Spacing**: Use ha-card padding conventions (16px standard)
- **Icons**: Use Material Design Icons via `<ha-icon>` component

### 5. Performance Optimization

- Use `lit-html` template caching and efficient rendering
- Implement `shouldUpdate()` for conditional rendering
- Avoid unnecessary DOM manipulations
- Use CSS for animations when possible
- Lazy load heavy dependencies

### 6. Error Handling

- Display user-friendly error messages in the card UI
- Use `<hui-warning>` component for configuration errors
- Log detailed errors to browser console for debugging
- Handle network failures and timeout scenarios gracefully
- Provide fallback UI when data is unavailable

### 7. Code Structure

```
project-root/
├── src/
│   ├── card. ts (or card. js)          # Main card implementation
│   ├── editor.ts (optional)          # Visual configuration editor
│   ├── types.ts                      # TypeScript type definitions
│   ├── styles.ts                     # Shared styles
│   └── utils. ts                      # Helper functions
├── .github/
│   └── copilot-instructions.md       # This file
├── dist/                             # Build output
├── package.json
├── rollup.config.js (or similar)     # Build configuration
└── README.md
```

### 8. TypeScript Best Practices

- Use strict TypeScript configuration
- Define interfaces for configuration objects
- Type the `hass` object properly using Home Assistant types
- Export types for reusability
- Avoid `any` types; use `unknown` when type is truly unknown

### 9. Editor Support (Optional but Recommended)

- Implement a visual editor extending `LitElement`
- Use `<ha-form>` component for configuration UI
- Provide schema for form generation
- Fire `config-changed` event when configuration updates
- Support all configurable options in the editor

### 10. Distribution and Packaging

- **Build Process**: Use Rollup, Webpack, or similar bundler
- **Output Format**: Generate single-file bundle for easy installation
- **Version Tracking**: Include version number in build output
- **HACS Support**: Follow HACS requirements if distributing via HACS: 
  - Include `hacs.json` file
  - Follow proper versioning with GitHub releases
  - Provide `dist/` folder with built files

### 11. Documentation Requirements

- **README.md**: Include installation instructions, configuration options, and examples
- **Screenshots**:  Provide visual examples of the card
- **Configuration Examples**: Show YAML configuration samples
- **Troubleshooting**: Common issues and solutions
- **Changelog**: Track changes between versions

### 12. Testing Considerations

- Test with different entity types and states
- Verify behavior when entities are unavailable
- Test responsive behavior on mobile and desktop
- Validate configuration error handling
- Test with different Home Assistant themes

### 13. Security Best Practices

- Sanitize user input and configuration values
- Avoid using `innerHTML` with unsanitized content
- Use `lit-html` templates which auto-escape content
- Validate entity IDs to prevent injection attacks
- Be cautious with external API calls

### 14. Common Patterns for Lovelace Cards

#### Basic Card Template
```typescript
import { LitElement, html, css } from 'lit';

class CustomCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    // Validate config
    this._config = config;
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const entity = this.hass.states[this._config.entity];
    
    return html`
      <ha-card>
        <div class="card-content">
          ${entity ?  html`
            <div>${entity.state}</div>
          ` : html`
            <hui-warning>Entity not found</hui-warning>
          `}
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      .card-content {
        padding: 16px;
      }
    `;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('custom-card', CustomCard);
```

#### Handling Multiple Entities
```typescript
render() {
  const entities = this._config.entities || [];
  
  return html`
    <ha-card>
      ${entities.map(entityId => {
        const entity = this.hass.states[entityId];
        return entity ? html`
          <div class="entity-row">
            <span>${entity.attributes.friendly_name}</span>
            <span>${entity.state}</span>
          </div>
        ` : html``;
      })}
    </ha-card>
  `;
}
```

### 15. Integration-Specific Considerations

For Network Rail integration cards: 
- Display real-time train status information clearly
- Show delays and disruptions prominently
- Use color coding for different status types (on-time, delayed, cancelled)
- Include station names and platform information when available
- Format timestamps in user-friendly format
- Handle missing or incomplete data from the API
- Consider adding refresh capability for real-time updates

## Coding Style

- Use camelCase for JavaScript/TypeScript variables and functions
- Use kebab-case for HTML attributes and CSS classes
- Prefer `const` over `let`, avoid `var`
- Use template literals for string interpolation
- Use arrow functions for callbacks
- Keep functions small and focused
- Add JSDoc comments for public methods

## When Suggesting Code

- Provide complete, working examples
- Include necessary imports
- Show both JavaScript and TypeScript versions when relevant
- Explain Home Assistant-specific concepts
- Reference official Home Assistant documentation when applicable
- Consider backward compatibility with different Home Assistant versions
- Suggest modern ES6+ features appropriately

## Resources

- [Home Assistant Frontend Documentation](https://developers.home-assistant.io/docs/frontend/)
- [Lit Element Documentation](https://lit.dev/)
- [Custom Card Examples](https://github.com/custom-cards)
- [Home Assistant Card Development](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/)
