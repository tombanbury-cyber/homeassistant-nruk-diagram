function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:l,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",g=u.reactiveElementPolyfillSupport,_=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...l(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[_("elementProperties")]=new Map,y[_("finalized")]=new Map,g?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=A.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,P=`<${C}>`,O=document,U=()=>O.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,N=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,D=/"/g,j=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,q=O.createTreeWalker(O,129);function V(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===z?"!--"===c[1]?n=M:void 0!==c[1]?n=N:void 0!==c[2]?(j.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=r??z,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?H:'"'===c[3]?D:B):n===D||n===B?n=H:n===M||n===N?n=z:(n=H,r=void 0);const l=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===z?i+P:h>=0?(s.push(a),i.slice(0,h)+E+i.slice(h)+S+l):i+S+(-2===h?e:l)}return[V(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,h]=K(t,e);if(this.el=J.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=h[o++],i=s.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?X:"?"===n[1]?tt:"@"===n[1]?et:Q}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),q.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===L)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=k(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Y(t,r._$AS(t,e.values),r,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new G(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=q.nextNode(),o++)}return q.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),k(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new G(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Y(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Y(this,s[i+n],e,n),a===L&&(a=this._$AH[n]),o||=!k(a)||a!==this._$AH[n],a===F?t=F:t!==F&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class et extends Q{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??F)===L)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const st=A.litHtmlPolyfillSupport;st?.(J,G),(A.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new G(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const nt=rt.litElementPolyfillSupport;nt?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},ct=(t=at,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let dt=class extends ot{constructor(){super(...arguments),this.defaultPlatformColors={1:"#4CAF50",2:"#2196F3",3:"#FF9800",4:"#9C27B0",5:"#F44336",6:"#009688",7:"#795548",8:"#607D8B"}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config={layout:"vertical",compact:!1,show_empty_berths:!0,show_alerts:!0,show_train_details:!0,show_up_lines:!0,show_down_lines:!0,alert_color:"#FF5252",...t,platform_colors:{...this.defaultPlatformColors,...t.platform_colors||{}}}}shouldUpdate(t){return!!this.config}getCardSize(){return 5}getTrainInfoByHeadcode(t,e){if(e&&t)return e.find(e=>e.headcode===t)}formatTimeInDiagram(t){const e=Math.floor(t/60),i=t%60;return e>0?`${e}m ${i}s`:`${i}s`}getPlatformColor(t){return t&&this.config&&this.config.platform_colors?.[t]||"var(--primary-color)"}renderBerth(t,e){if(!this.config)return I``;const i=t.headcode?this.getTrainInfoByHeadcode(t.headcode,e):void 0,s=i?.triggers_alert||!1,r=this.getPlatformColor(t.platform),o=this.config.alert_color||"#FF5252";if(!t.occupied&&!this.config.show_empty_berths)return I``;const n=`berth ${t.occupied?"occupied":"empty"} ${s?"alert":""} ${this.config.compact?"compact":""}`,a=s?o:t.occupied&&t.platform?r:"var(--divider-color)";return I`
      <div 
        class="${n}" 
        style="border-color: ${a}; ${t.occupied&&t.platform?`background-color: ${r}15;`:""}"
        title="${this.getBerthTooltip(t,i)}"
      >
        <div class="berth-id">${t.berth_id}</div>
        ${t.occupied&&t.headcode?I`
          <div class="berth-headcode">${t.headcode}</div>
        `:""}
        ${t.platform?I`
          <div class="platform-badge" style="background-color: ${r};">
            P${t.platform}
          </div>
        `:""}
        ${s?I`
          <div class="alert-icon">⚠️</div>
        `:""}
      </div>
    `}getBerthTooltip(t,e){if(!t.occupied||!t.headcode)return`${t.berth_id} - Empty`;if(!e)return`${t.berth_id} - ${t.headcode}`;let i=`🚂 ${e.headcode}`;return e.service_type&&(i+=` (${e.service_type})`),i+="\n━━━━━━━━━━━━━━━━━━━",i+=`\nBerth: ${t.berth_id}`,e.origin&&(i+=`\nOrigin: ${e.origin}`),e.destination&&(i+=`\nDest: ${e.destination}`),e.operator&&(i+=`\nOperator: ${e.operator}`),e.time_in_diagram_seconds&&(i+=`\nIn area: ${this.formatTimeInDiagram(e.time_in_diagram_seconds)}`),e.triggers_alert&&e.alert_reason&&(i+="\n━━━━━━━━━━━━━━━━━━━",i+=`\n⚠️ Alert: ${e.alert_reason}`),i}renderStation(t,e,i=!1){return this.config?I`
      <div class="station ${i?"center-station":""} ${this.config.compact?"compact":""}">
        <div class="station-header">
          <div class="station-name">${t.name}</div>
          <div class="station-stanox">${t.stanox}</div>
        </div>
        <div class="berths-container ${"horizontal"===this.config.layout?"horizontal":"vertical"}">
          ${t.berths.map(t=>this.renderBerth(t,e))}
        </div>
      </div>
    `:I``}renderBetweenBerths(t,e){return this.config&&t&&0!==t.length?I`
      <div class="between-berths ${this.config.compact?"compact":""}">
        <div class="berths-container ${"horizontal"===this.config.layout?"horizontal":"vertical"}">
          ${t.map(t=>this.renderBerth(t,e))}
        </div>
      </div>
    `:I``}renderCenterStation(t){if(!this.config)return I``;const e={stanox:t.center_stanox,name:t.center_name,berths:t.center_berths||[]};return this.renderStation(e,t.trains_in_diagram,!0)}render(){if(!this.config||!this.hass||!this.config.entity)return I``;const t=this.hass.states[this.config.entity],e=t?.state;if(!t||"unavailable"===e||"unknown"===e)return I`
        <ha-card>
          <div class="header">
            <div class="header-left">
              <ha-icon class="header-icon" icon="mdi:transit-connection-variant"></ha-icon>
              <div class="header-text">${this.config.name||"Network Rail Diagram"}</div>
            </div>
          </div>
          <div class="unavailable">No diagram data available</div>
        </ha-card>
      `;const i=t.attributes;return I`
      <ha-card>
        <div class="header">
          <div class="header-left">
            <ha-icon class="header-icon" icon="mdi:transit-connection-variant"></ha-icon>
            <div class="header-text">${this.config.name||i.center_name||"Network Rail Diagram"}</div>
          </div>
          ${void 0!==i.total_trains||void 0!==i.alert_trains?I`
            <div class="header-stats">
              ${void 0!==i.total_trains?I`
                <span class="stat-badge">🚂 ${i.total_trains}</span>
              `:""}
              ${void 0!==i.alert_trains&&i.alert_trains>0?I`
                <span class="stat-badge alert">⚠️ ${i.alert_trains}</span>
              `:""}
            </div>
          `:""}
        </div>

        <div class="diagram-container ${"horizontal"===this.config.layout?"horizontal":""}">
          ${this.config.show_up_lines&&i.up_stations&&i.up_stations.length>0?I`
            <div class="up-stations">
              ${i.up_stations.map(t=>this.renderStation(t,i.trains_in_diagram))}
            </div>
            ${i.up_between_berths&&i.up_between_berths.length>0?I`
              ${this.renderBetweenBerths(i.up_between_berths,i.trains_in_diagram)}
            `:""}
            <div class="direction-arrow">↓</div>
          `:""}

          ${this.renderCenterStation(i)}

          ${this.config.show_down_lines&&i.down_stations&&i.down_stations.length>0?I`
            <div class="direction-arrow">↓</div>
            ${i.down_between_berths&&i.down_between_berths.length>0?I`
              ${this.renderBetweenBerths(i.down_between_berths,i.trains_in_diagram)}
            `:""}
            <div class="down-stations">
              ${i.down_stations.map(t=>this.renderStation(t,i.trains_in_diagram))}
            </div>
          `:""}
        </div>
      </ha-card>
    `}};dt.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
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
  `,t([ht({attribute:!1})],dt.prototype,"hass",void 0),t([function(t){return ht({...t,state:!0,attribute:!1})}()],dt.prototype,"config",void 0),dt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("network-rail-diagram-card")],dt),window.customCards=window.customCards||[],window.customCards.push({type:"network-rail-diagram-card",name:"Network Rail Diagram Card",description:"Display Network Rail berth occupancy in a graphical diagram",preview:!1,documentationURL:"https://github.com/tombanbury-cyber/homeassistant-nruk-diagram"}),console.info("%c NETWORK-RAIL-DIAGRAM-CARD %c 2.0.0 ","color: white; background: #4CAF50; font-weight: 700;","color: #4CAF50; background: white; font-weight: 700;");export{dt as NetworkRailDiagramCard};
//# sourceMappingURL=network-rail-diagram-card.js.map
