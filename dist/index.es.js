var pi = Object.defineProperty;
var Ri = (i, t, e) => t in i ? pi(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var sn = (i, t, e) => Ri(i, typeof t != "symbol" ? t + "" : t, e);
import { Map as yi, View as Ei } from "ol";
class Ti extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = "<style>p { color: blue; }</style><p>Hello, World!</p>";
  }
}
customElements.define("my-component", Ti);
class fe {
  /**
   * @param {string} type Type.
   */
  constructor(t) {
    this.propagationStopped, this.defaultPrevented, this.type = t, this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */
  preventDefault() {
    this.defaultPrevented = !0;
  }
  /**
   * Stop event propagation.
   * @api
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
const xi = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
};
class Ci {
  constructor() {
    this.disposed = !1;
  }
  /**
   * Clean up.
   */
  dispose() {
    this.disposed || (this.disposed = !0, this.disposeInternal());
  }
  /**
   * Extension point for disposable objects.
   * @protected
   */
  disposeInternal() {
  }
}
function De(i, t) {
  return i > t ? 1 : i < t ? -1 : 0;
}
function ze(i, t, e) {
  if (i[0] <= t)
    return 0;
  const n = i.length;
  if (t <= i[n - 1])
    return n - 1;
  if (typeof e == "function") {
    for (let s = 1; s < n; ++s) {
      const r = i[s];
      if (r === t)
        return s;
      if (r < t)
        return e(t, i[s - 1], r) > 0 ? s - 1 : s;
    }
    return n - 1;
  }
  if (e > 0) {
    for (let s = 1; s < n; ++s)
      if (i[s] < t)
        return s - 1;
    return n - 1;
  }
  if (e < 0) {
    for (let s = 1; s < n; ++s)
      if (i[s] <= t)
        return s;
    return n - 1;
  }
  for (let s = 1; s < n; ++s) {
    if (i[s] == t)
      return s;
    if (i[s] < t)
      return i[s - 1] - t < t - i[s] ? s - 1 : s;
  }
  return n - 1;
}
function Mi(i, t) {
  const e = Array.isArray(t) ? t : [t], n = e.length;
  for (let s = 0; s < n; s++)
    i[i.length] = e[s];
}
function bn(i, t) {
  const e = i.length;
  if (e !== t.length)
    return !1;
  for (let n = 0; n < e; n++)
    if (i[n] !== t[n])
      return !1;
  return !0;
}
function wi(i, t, e) {
  const n = t || De;
  return i.every(function(s, r) {
    if (r === 0)
      return !0;
    const o = n(i[r - 1], s);
    return !(o > 0 || o === 0);
  });
}
function Fe() {
}
function Ii(i) {
  let t, e, n;
  return function() {
    const s = Array.prototype.slice.call(arguments);
    return (!e || this !== n || !bn(s, e)) && (n = this, e = s, t = i.apply(this, arguments)), t;
  };
}
function Dn(i) {
  for (const t in i)
    delete i[t];
}
function vi(i) {
  let t;
  for (t in i)
    return !1;
  return !t;
}
class zn extends Ci {
  /**
   * @param {*} [target] Default event target for dispatched events.
   */
  constructor(t) {
    super(), this.eventTarget_ = t, this.pendingRemovals_ = null, this.dispatching_ = null, this.listeners_ = null;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  addEventListener(t, e) {
    if (!t || !e)
      return;
    const n = this.listeners_ || (this.listeners_ = {}), s = n[t] || (n[t] = []);
    s.includes(e) || s.push(e);
  }
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */
  dispatchEvent(t) {
    const e = typeof t == "string", n = e ? t : t.type, s = this.listeners_ && this.listeners_[n];
    if (!s)
      return;
    const r = e ? new fe(t) : (
      /** @type {Event} */
      t
    );
    r.target || (r.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}), a = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    n in o || (o[n] = 0, a[n] = 0), ++o[n];
    let l;
    for (let h = 0, c = s.length; h < c; ++h)
      if ("handleEvent" in s[h] ? l = /** @type {import("../events.js").ListenerObject} */
      s[h].handleEvent(r) : l = /** @type {import("../events.js").ListenerFunction} */
      s[h].call(this, r), l === !1 || r.propagationStopped) {
        l = !1;
        break;
      }
    if (--o[n] === 0) {
      let h = a[n];
      for (delete a[n]; h--; )
        this.removeEventListener(n, Fe);
      delete o[n];
    }
    return l;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.listeners_ && Dn(this.listeners_);
  }
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */
  getListeners(t) {
    return this.listeners_ && this.listeners_[t] || void 0;
  }
  /**
   * @param {string} [type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */
  hasListener(t) {
    return this.listeners_ ? t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0 : !1;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  removeEventListener(t, e) {
    if (!this.listeners_)
      return;
    const n = this.listeners_[t];
    if (!n)
      return;
    const s = n.indexOf(e);
    s !== -1 && (this.pendingRemovals_ && t in this.pendingRemovals_ ? (n[s] = Fe, ++this.pendingRemovals_[t]) : (n.splice(s, 1), n.length === 0 && delete this.listeners_[t]));
  }
}
const st = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: "change",
  /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */
  ERROR: "error",
  BLUR: "blur",
  CLEAR: "clear",
  CONTEXTMENU: "contextmenu",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  FOCUS: "focus",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  RESIZE: "resize",
  TOUCHMOVE: "touchmove",
  WHEEL: "wheel"
};
function mt(i, t, e, n, s) {
  if (s) {
    const o = e;
    e = function() {
      i.removeEventListener(t, e), o.apply(n ?? this, arguments);
    };
  } else n && n !== i && (e = e.bind(n));
  const r = {
    target: i,
    type: t,
    listener: e
  };
  return i.addEventListener(t, e), r;
}
function re(i, t, e, n) {
  return mt(i, t, e, n, !0);
}
function it(i) {
  i && i.target && (i.target.removeEventListener(i.type, i.listener), Dn(i));
}
class Ut extends zn {
  constructor() {
    super(), this.on = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onInternal, this.once = /** @type {ObservableOnSignature<import("./events").EventsKey>} */
    this.onceInternal, this.un = /** @type {ObservableOnSignature<void>} */
    this.unInternal, this.revision_ = 0;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */
  changed() {
    ++this.revision_, this.dispatchEvent(st.CHANGE);
  }
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */
  getRevision() {
    return this.revision_;
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onInternal(t, e) {
    if (Array.isArray(t)) {
      const n = t.length, s = new Array(n);
      for (let r = 0; r < n; ++r)
        s[r] = mt(this, t[r], e);
      return s;
    }
    return mt(
      this,
      /** @type {string} */
      t,
      e
    );
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onceInternal(t, e) {
    let n;
    if (Array.isArray(t)) {
      const s = t.length;
      n = new Array(s);
      for (let r = 0; r < s; ++r)
        n[r] = re(this, t[r], e);
    } else
      n = re(
        this,
        /** @type {string} */
        t,
        e
      );
    return e.ol_key = n, n;
  }
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */
  unInternal(t, e) {
    const n = (
      /** @type {Object} */
      e.ol_key
    );
    if (n)
      Si(n);
    else if (Array.isArray(t))
      for (let s = 0, r = t.length; s < r; ++s)
        this.removeEventListener(t[s], e);
    else
      this.removeEventListener(t, e);
  }
}
Ut.prototype.on;
Ut.prototype.once;
Ut.prototype.un;
function Si(i) {
  if (Array.isArray(i))
    for (let t = 0, e = i.length; t < e; ++t)
      it(i[t]);
  else
    it(
      /** @type {import("./events.js").EventsKey} */
      i
    );
}
function G() {
  throw new Error("Unimplemented abstract method.");
}
let Pi = 0;
function Q(i) {
  return i.ol_uid || (i.ol_uid = String(++Pi));
}
class rn extends fe {
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */
  constructor(t, e, n) {
    super(t), this.key = e, this.oldValue = n;
  }
}
class _e extends Ut {
  /**
   * @param {Object<string, *>} [values] An object with key-value pairs.
   */
  constructor(t) {
    super(), this.on, this.once, this.un, Q(this), this.values_ = null, t !== void 0 && this.setProperties(t);
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */
  get(t) {
    let e;
    return this.values_ && this.values_.hasOwnProperty(t) && (e = this.values_[t]), e;
  }
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */
  getKeys() {
    return this.values_ && Object.keys(this.values_) || [];
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */
  getProperties() {
    return this.values_ && Object.assign({}, this.values_) || {};
  }
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.values_;
  }
  /**
   * @return {boolean} The object has properties.
   */
  hasProperties() {
    return !!this.values_;
  }
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */
  notify(t, e) {
    let n;
    n = `change:${t}`, this.hasListener(n) && this.dispatchEvent(new rn(n, t, e)), n = xi.PROPERTYCHANGE, this.hasListener(n) && this.dispatchEvent(new rn(n, t, e));
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  addChangeListener(t, e) {
    this.addEventListener(`change:${t}`, e);
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  removeChangeListener(t, e) {
    this.removeEventListener(`change:${t}`, e);
  }
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  set(t, e, n) {
    const s = this.values_ || (this.values_ = {});
    if (n)
      s[t] = e;
    else {
      const r = s[t];
      s[t] = e, r !== e && this.notify(t, r);
    }
  }
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  setProperties(t, e) {
    for (const n in t)
      this.set(n, t[n], e);
  }
  /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */
  applyProperties(t) {
    t.values_ && Object.assign(this.values_ || (this.values_ = {}), t.values_);
  }
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [silent] Unset without triggering an event.
   * @api
   */
  unset(t, e) {
    if (this.values_ && t in this.values_) {
      const n = this.values_[t];
      delete this.values_[t], vi(this.values_) && (this.values_ = null), e || this.notify(t, n);
    }
  }
}
const w = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source",
  MAP: "map"
};
function N(i, t) {
  if (!i)
    throw new Error(t);
}
function j(i, t, e) {
  return Math.min(Math.max(i, t), e);
}
function Ai(i, t, e, n, s, r) {
  const o = s - e, a = r - n;
  if (o !== 0 || a !== 0) {
    const l = ((i - e) * o + (t - n) * a) / (o * o + a * a);
    l > 1 ? (e = s, n = r) : l > 0 && (e += o * l, n += a * l);
  }
  return Lt(i, t, e, n);
}
function Lt(i, t, e, n) {
  const s = e - i, r = n - t;
  return s * s + r * r;
}
function Fi(i) {
  const t = i.length;
  for (let n = 0; n < t; n++) {
    let s = n, r = Math.abs(i[n][n]);
    for (let a = n + 1; a < t; a++) {
      const l = Math.abs(i[a][n]);
      l > r && (r = l, s = a);
    }
    if (r === 0)
      return null;
    const o = i[s];
    i[s] = i[n], i[n] = o;
    for (let a = n + 1; a < t; a++) {
      const l = -i[a][n] / i[n][n];
      for (let h = n; h < t + 1; h++)
        n == h ? i[a][h] = 0 : i[a][h] += l * i[n][h];
    }
  }
  const e = new Array(t);
  for (let n = t - 1; n >= 0; n--) {
    e[n] = i[n][t] / i[n][n];
    for (let s = n - 1; s >= 0; s--)
      i[s][t] -= i[s][n] * e[n];
  }
  return e;
}
function ne(i) {
  return i * Math.PI / 180;
}
function bt(i, t) {
  const e = i % t;
  return e * t < 0 ? e + t : e;
}
function Oi(i, t, e) {
  return i + e * (t - i);
}
function Xn(i, t) {
  const e = Math.pow(10, t);
  return Math.round(i * e) / e;
}
function $t(i, t) {
  return Math.floor(Xn(i, t));
}
function Qt(i, t) {
  return Math.ceil(Xn(i, t));
}
class Li extends _e {
  /**
   * @param {Options} options Layer options.
   */
  constructor(t) {
    super(), this.on, this.once, this.un, this.background_ = t.background;
    const e = Object.assign({}, t);
    typeof t.properties == "object" && (delete e.properties, Object.assign(e, t.properties)), e[w.OPACITY] = t.opacity !== void 0 ? t.opacity : 1, N(
      typeof e[w.OPACITY] == "number",
      "Layer opacity must be a number"
    ), e[w.VISIBLE] = t.visible !== void 0 ? t.visible : !0, e[w.Z_INDEX] = t.zIndex, e[w.MAX_RESOLUTION] = t.maxResolution !== void 0 ? t.maxResolution : 1 / 0, e[w.MIN_RESOLUTION] = t.minResolution !== void 0 ? t.minResolution : 0, e[w.MIN_ZOOM] = t.minZoom !== void 0 ? t.minZoom : -1 / 0, e[w.MAX_ZOOM] = t.maxZoom !== void 0 ? t.maxZoom : 1 / 0, this.className_ = e.className !== void 0 ? e.className : "ol-layer", delete e.className, this.setProperties(e), this.state_ = null;
  }
  /**
   * Get the background for this layer.
   * @return {BackgroundColor|false} Layer background.
   */
  getBackground() {
    return this.background_;
  }
  /**
   * @return {string} CSS class name.
   */
  getClassName() {
    return this.className_;
  }
  /**
   * This method is not meant to be called by layers or layer renderers because the state
   * is incorrect if the layer is included in a layer group.
   *
   * @param {boolean} [managed] Layer is managed.
   * @return {import("./Layer.js").State} Layer state.
   */
  getLayerState(t) {
    const e = this.state_ || /** @type {?} */
    {
      layer: this,
      managed: t === void 0 ? !0 : t
    }, n = this.getZIndex();
    return e.opacity = j(Math.round(this.getOpacity() * 100) / 100, 0, 1), e.visible = this.getVisible(), e.extent = this.getExtent(), e.zIndex = n === void 0 && !e.managed ? 1 / 0 : n, e.maxResolution = this.getMaxResolution(), e.minResolution = Math.max(this.getMinResolution(), 0), e.minZoom = this.getMinZoom(), e.maxZoom = this.getMaxZoom(), this.state_ = e, e;
  }
  /**
   * @abstract
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */
  getLayersArray(t) {
    return G();
  }
  /**
   * @abstract
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */
  getLayerStatesArray(t) {
    return G();
  }
  /**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */
  getExtent() {
    return (
      /** @type {import("../extent.js").Extent|undefined} */
      this.get(w.EXTENT)
    );
  }
  /**
   * Return the maximum resolution of the layer. Returns Infinity if
   * the layer has no maximum resolution set.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */
  getMaxResolution() {
    return (
      /** @type {number} */
      this.get(w.MAX_RESOLUTION)
    );
  }
  /**
   * Return the minimum resolution of the layer. Returns 0 if
   * the layer has no minimum resolution set.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */
  getMinResolution() {
    return (
      /** @type {number} */
      this.get(w.MIN_RESOLUTION)
    );
  }
  /**
   * Return the minimum zoom level of the layer. Returns -Infinity if
   * the layer has no minimum zoom set.
   * @return {number} The minimum zoom level of the layer.
   * @observable
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.get(w.MIN_ZOOM)
    );
  }
  /**
   * Return the maximum zoom level of the layer. Returns Infinity if
   * the layer has no maximum zoom set.
   * @return {number} The maximum zoom level of the layer.
   * @observable
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.get(w.MAX_ZOOM)
    );
  }
  /**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */
  getOpacity() {
    return (
      /** @type {number} */
      this.get(w.OPACITY)
    );
  }
  /**
   * @abstract
   * @return {import("../source/Source.js").State} Source state.
   */
  getSourceState() {
    return G();
  }
  /**
   * Return the value of this layer's `visible` property. To find out whether the layer
   * is visible on a map, use `isVisible()` instead.
   * @return {boolean} The value of the `visible` property of the layer.
   * @observable
   * @api
   */
  getVisible() {
    return (
      /** @type {boolean} */
      this.get(w.VISIBLE)
    );
  }
  /**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. Returns undefined if the layer is unmanaged.
   * @return {number|undefined} The Z-index of the layer.
   * @observable
   * @api
   */
  getZIndex() {
    return (
      /** @type {number|undefined} */
      this.get(w.Z_INDEX)
    );
  }
  /**
   * Sets the background color.
   * @param {BackgroundColor} [background] Background color.
   */
  setBackground(t) {
    this.background_ = t, this.changed();
  }
  /**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */
  setExtent(t) {
    this.set(w.EXTENT, t);
  }
  /**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */
  setMaxResolution(t) {
    this.set(w.MAX_RESOLUTION, t);
  }
  /**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */
  setMinResolution(t) {
    this.set(w.MIN_RESOLUTION, t);
  }
  /**
   * Set the maximum zoom (exclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} maxZoom The maximum zoom of the layer.
   * @observable
   * @api
   */
  setMaxZoom(t) {
    this.set(w.MAX_ZOOM, t);
  }
  /**
   * Set the minimum zoom (inclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} minZoom The minimum zoom of the layer.
   * @observable
   * @api
   */
  setMinZoom(t) {
    this.set(w.MIN_ZOOM, t);
  }
  /**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */
  setOpacity(t) {
    N(typeof t == "number", "Layer opacity must be a number"), this.set(w.OPACITY, t);
  }
  /**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */
  setVisible(t) {
    this.set(w.VISIBLE, t);
  }
  /**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */
  setZIndex(t) {
    this.set(w.Z_INDEX, t);
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.state_ && (this.state_.layer = null, this.state_ = null), super.disposeInternal();
  }
}
const jt = {
  /**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */
  PRERENDER: "prerender",
  /**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */
  POSTRENDER: "postrender",
  /**
   * Triggered before layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */
  PRECOMPOSE: "precompose",
  /**
   * Triggered after layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */
  POSTCOMPOSE: "postcompose",
  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */
  RENDERCOMPLETE: "rendercomplete"
}, dt = {
  ANIMATING: 0,
  INTERACTING: 1
}, $ = {
  CENTER: "center",
  RESOLUTION: "resolution",
  ROTATION: "rotation"
}, bi = 42, Xe = 256, Ge = {
  // use the radius of the Normal sphere
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class Gn {
  /**
   * @param {Options} options Projection options.
   */
  constructor(t) {
    this.code_ = t.code, this.units_ = /** @type {import("./Units.js").Units} */
    t.units, this.extent_ = t.extent !== void 0 ? t.extent : null, this.worldExtent_ = t.worldExtent !== void 0 ? t.worldExtent : null, this.axisOrientation_ = t.axisOrientation !== void 0 ? t.axisOrientation : "enu", this.global_ = t.global !== void 0 ? t.global : !1, this.canWrapX_ = !!(this.global_ && this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit;
  }
  /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */
  canWrapX() {
    return this.canWrapX_;
  }
  /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */
  getCode() {
    return this.code_;
  }
  /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */
  getUnits() {
    return this.units_;
  }
  /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */
  getMetersPerUnit() {
    return this.metersPerUnit_ || Ge[this.units_];
  }
  /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getWorldExtent() {
    return this.worldExtent_;
  }
  /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */
  isGlobal() {
    return this.global_;
  }
  /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */
  setGlobal(t) {
    this.global_ = t, this.canWrapX_ = !!(t && this.extent_);
  }
  /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */
  setDefaultTileGrid(t) {
    this.defaultTileGrid_ = t;
  }
  /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  setExtent(t) {
    this.extent_ = t, this.canWrapX_ = !!(this.global_ && t);
  }
  /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */
  setWorldExtent(t) {
    this.worldExtent_ = t;
  }
  /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */
  setGetPointResolution(t) {
    this.getPointResolutionFunc_ = t;
  }
  /**
   * Get the custom point resolution function for this projection (if set).
   * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
   * resolution function (if set).
   */
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const Kt = 6378137, Ot = Math.PI * Kt, Di = [-Ot, -Ot, Ot, Ot], zi = [-180, -85, 180, 85], Jt = Kt * Math.log(Math.tan(Math.PI / 2));
class wt extends Gn {
  /**
   * @param {string} code Code.
   */
  constructor(t) {
    super({
      code: t,
      units: "m",
      extent: Di,
      global: !0,
      worldExtent: zi,
      getPointResolution: function(e, n) {
        return e / Math.cosh(n[1] / Kt);
      }
    });
  }
}
const on = [
  new wt("EPSG:3857"),
  new wt("EPSG:102100"),
  new wt("EPSG:102113"),
  new wt("EPSG:900913"),
  new wt("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new wt("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function Xi(i, t, e) {
  const n = i.length;
  e = e > 1 ? e : 2, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(n));
  for (let s = 0; s < n; s += e) {
    t[s] = Ot * i[s] / 180;
    let r = Kt * Math.log(Math.tan(Math.PI * (+i[s + 1] + 90) / 360));
    r > Jt ? r = Jt : r < -Jt && (r = -Jt), t[s + 1] = r;
  }
  return t;
}
function Gi(i, t, e) {
  const n = i.length;
  e = e > 1 ? e : 2, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(n));
  for (let s = 0; s < n; s += e)
    t[s] = 180 * i[s] / Ot, t[s + 1] = 360 * Math.atan(Math.exp(i[s + 1] / Kt)) / Math.PI - 90;
  return t;
}
const ji = 6378137, an = [-180, -90, 180, 90], Ni = Math.PI * ji / 180;
class Et extends Gn {
  /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */
  constructor(t, e) {
    super({
      code: t,
      units: "degrees",
      extent: an,
      axisOrientation: e,
      global: !0,
      metersPerUnit: Ni,
      worldExtent: an
    });
  }
}
const ln = [
  new Et("CRS:84"),
  new Et("EPSG:4326", "neu"),
  new Et("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new Et("urn:ogc:def:crs:OGC:2:84"),
  new Et("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new Et("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new Et("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let Oe = {};
function Zi(i) {
  return Oe[i] || Oe[i.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function Yi(i, t) {
  Oe[i] = t;
}
let Dt = {};
function oe(i, t, e) {
  const n = i.getCode(), s = t.getCode();
  n in Dt || (Dt[n] = {}), Dt[n][s] = e;
}
function ki(i, t) {
  let e;
  return i in Dt && t in Dt[i] && (e = Dt[i][t]), e;
}
const Z = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function hn(i) {
  const t = Ct();
  for (let e = 0, n = i.length; e < n; ++e)
    ie(t, i[e]);
  return t;
}
function jn(i, t, e) {
  let n, s;
  return t < i[0] ? n = i[0] - t : i[2] < t ? n = t - i[2] : n = 0, e < i[1] ? s = i[1] - e : i[3] < e ? s = e - i[3] : s = 0, n * n + s * s;
}
function je(i, t) {
  return Nn(i, t[0], t[1]);
}
function Ui(i, t) {
  return i[0] <= t[0] && t[2] <= i[2] && i[1] <= t[1] && t[3] <= i[3];
}
function Nn(i, t, e) {
  return i[0] <= t && t <= i[2] && i[1] <= e && e <= i[3];
}
function cn(i, t) {
  const e = i[0], n = i[1], s = i[2], r = i[3], o = t[0], a = t[1];
  let l = Z.UNKNOWN;
  return o < e ? l = l | Z.LEFT : o > s && (l = l | Z.RIGHT), a < n ? l = l | Z.BELOW : a > r && (l = l | Z.ABOVE), l === Z.UNKNOWN && (l = Z.INTERSECTING), l;
}
function Ct() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function Wt(i, t, e, n, s) {
  return s ? (s[0] = i, s[1] = t, s[2] = e, s[3] = n, s) : [i, t, e, n];
}
function Ne(i) {
  return Wt(1 / 0, 1 / 0, -1 / 0, -1 / 0, i);
}
function Ki(i, t) {
  const e = i[0], n = i[1];
  return Wt(e, n, e, n, t);
}
function Wi(i, t, e, n, s) {
  const r = Ne(s);
  return Zn(r, i, t, e, n);
}
function Vi(i, t) {
  return i[0] == t[0] && i[2] == t[2] && i[1] == t[1] && i[3] == t[3];
}
function Hi(i, t) {
  return t[0] < i[0] && (i[0] = t[0]), t[2] > i[2] && (i[2] = t[2]), t[1] < i[1] && (i[1] = t[1]), t[3] > i[3] && (i[3] = t[3]), i;
}
function ie(i, t) {
  t[0] < i[0] && (i[0] = t[0]), t[0] > i[2] && (i[2] = t[0]), t[1] < i[1] && (i[1] = t[1]), t[1] > i[3] && (i[3] = t[1]);
}
function Zn(i, t, e, n, s) {
  for (; e < n; e += s)
    Bi(i, t[e], t[e + 1]);
  return i;
}
function Bi(i, t, e) {
  i[0] = Math.min(i[0], t), i[1] = Math.min(i[1], e), i[2] = Math.max(i[2], t), i[3] = Math.max(i[3], e);
}
function Yn(i, t) {
  let e;
  return e = t(me(i)), e || (e = t(pe(i)), e) || (e = t(Re(i)), e) || (e = t(Mt(i)), e) ? e : !1;
}
function Zt(i) {
  let t = 0;
  return Ze(i) || (t = O(i) * V(i)), t;
}
function me(i) {
  return [i[0], i[1]];
}
function pe(i) {
  return [i[2], i[1]];
}
function zt(i) {
  return [(i[0] + i[2]) / 2, (i[1] + i[3]) / 2];
}
function qi(i, t) {
  let e;
  if (t === "bottom-left")
    e = me(i);
  else if (t === "bottom-right")
    e = pe(i);
  else if (t === "top-left")
    e = Mt(i);
  else if (t === "top-right")
    e = Re(i);
  else
    throw new Error("Invalid corner");
  return e;
}
function $i(i, t, e, n, s) {
  const [r, o, a, l, h, c, u, d] = Qi(
    i,
    t,
    e,
    n
  );
  return Wt(
    Math.min(r, a, h, u),
    Math.min(o, l, c, d),
    Math.max(r, a, h, u),
    Math.max(o, l, c, d),
    s
  );
}
function Qi(i, t, e, n) {
  const s = t * n[0] / 2, r = t * n[1] / 2, o = Math.cos(e), a = Math.sin(e), l = s * o, h = s * a, c = r * o, u = r * a, d = i[0], f = i[1];
  return [
    d - l + u,
    f - h - c,
    d - l - u,
    f - h + c,
    d + l - u,
    f + h + c,
    d + l + u,
    f + h - c,
    d - l + u,
    f - h - c
  ];
}
function V(i) {
  return i[3] - i[1];
}
function nt(i, t, e) {
  const n = e || Ct();
  return Vt(i, t) ? (i[0] > t[0] ? n[0] = i[0] : n[0] = t[0], i[1] > t[1] ? n[1] = i[1] : n[1] = t[1], i[2] < t[2] ? n[2] = i[2] : n[2] = t[2], i[3] < t[3] ? n[3] = i[3] : n[3] = t[3]) : Ne(n), n;
}
function Mt(i) {
  return [i[0], i[3]];
}
function Re(i) {
  return [i[2], i[3]];
}
function O(i) {
  return i[2] - i[0];
}
function Vt(i, t) {
  return i[0] <= t[2] && i[2] >= t[0] && i[1] <= t[3] && i[3] >= t[1];
}
function Ze(i) {
  return i[2] < i[0] || i[3] < i[1];
}
function Ji(i, t) {
  return t ? (t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t) : i;
}
function ts(i, t, e) {
  let n = !1;
  const s = cn(i, t), r = cn(i, e);
  if (s === Z.INTERSECTING || r === Z.INTERSECTING)
    n = !0;
  else {
    const o = i[0], a = i[1], l = i[2], h = i[3], c = t[0], u = t[1], d = e[0], f = e[1], g = (f - u) / (d - c);
    let _, p;
    r & Z.ABOVE && !(s & Z.ABOVE) && (_ = d - (f - h) / g, n = _ >= o && _ <= l), !n && r & Z.RIGHT && !(s & Z.RIGHT) && (p = f - (d - l) * g, n = p >= a && p <= h), !n && r & Z.BELOW && !(s & Z.BELOW) && (_ = d - (f - a) / g, n = _ >= o && _ <= l), !n && r & Z.LEFT && !(s & Z.LEFT) && (p = f - (d - o) * g, n = p >= a && p <= h);
  }
  return n;
}
function es(i, t) {
  const e = t.getExtent(), n = zt(i);
  if (t.canWrapX() && (n[0] < e[0] || n[0] >= e[2])) {
    const s = O(e), o = Math.floor(
      (n[0] - e[0]) / s
    ) * s;
    i[0] -= o, i[2] -= o;
  }
  return i;
}
function kn(i, t, e) {
  if (t.canWrapX()) {
    const n = t.getExtent();
    if (!isFinite(i[0]) || !isFinite(i[2]))
      return [[n[0], i[1], n[2], i[3]]];
    es(i, t);
    const s = O(n);
    if (O(i) > s && !e)
      return [[n[0], i[1], n[2], i[3]]];
    if (i[0] < n[0])
      return [
        [i[0] + s, i[1], n[2], i[3]],
        [n[0], i[1], i[2], i[3]]
      ];
    if (i[2] > n[2])
      return [
        [i[0], i[1], n[2], i[3]],
        [n[0], i[1], i[2] - s, i[3]]
      ];
  }
  return [i];
}
function ns(i, t) {
  return i[0] += +t[0], i[1] += +t[1], i;
}
function ae(i, t) {
  let e = !0;
  for (let n = i.length - 1; n >= 0; --n)
    if (i[n] != t[n]) {
      e = !1;
      break;
    }
  return e;
}
function is(i, t) {
  const e = Math.cos(t), n = Math.sin(t), s = i[0] * e - i[1] * n, r = i[1] * e + i[0] * n;
  return i[0] = s, i[1] = r, i;
}
const ss = 63710088e-1;
function un(i, t, e) {
  e = e || ss;
  const n = ne(i[1]), s = ne(t[1]), r = (s - n) / 2, o = ne(t[0] - i[0]) / 2, a = Math.sin(r) * Math.sin(r) + Math.sin(o) * Math.sin(o) * Math.cos(n) * Math.cos(s);
  return 2 * e * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function rs(...i) {
  console.warn(...i);
}
let Le = !0;
function os(i) {
  Le = !1;
}
function Ye(i, t) {
  if (t !== void 0) {
    for (let e = 0, n = i.length; e < n; ++e)
      t[e] = i[e];
    t = t;
  } else
    t = i.slice();
  return t;
}
function Un(i, t) {
  if (t !== void 0 && i !== t) {
    for (let e = 0, n = i.length; e < n; ++e)
      t[e] = i[e];
    i = t;
  }
  return i;
}
function as(i) {
  Yi(i.getCode(), i), oe(i, i, Ye);
}
function ls(i) {
  i.forEach(as);
}
function J(i) {
  return typeof i == "string" ? Zi(
    /** @type {string} */
    i
  ) : (
    /** @type {Projection} */
    i || null
  );
}
function dn(i, t, e, n) {
  i = J(i);
  let s;
  const r = i.getPointResolutionFunc();
  if (r)
    s = r(t, e);
  else {
    const o = i.getUnits();
    if (o == "degrees" && !n || n == "degrees")
      s = t;
    else {
      const a = Ue(
        i,
        J("EPSG:4326")
      );
      if (a === Un && o !== "degrees")
        s = t * i.getMetersPerUnit();
      else {
        let h = [
          e[0] - t / 2,
          e[1],
          e[0] + t / 2,
          e[1],
          e[0],
          e[1] - t / 2,
          e[0],
          e[1] + t / 2
        ];
        h = a(h, h, 2);
        const c = un(h.slice(0, 2), h.slice(2, 4)), u = un(h.slice(4, 6), h.slice(6, 8));
        s = (c + u) / 2;
      }
      const l = i.getMetersPerUnit();
      l !== void 0 && (s /= l);
    }
  }
  return s;
}
function gn(i) {
  ls(i), i.forEach(function(t) {
    i.forEach(function(e) {
      t !== e && oe(t, e, Ye);
    });
  });
}
function hs(i, t, e, n) {
  i.forEach(function(s) {
    t.forEach(function(r) {
      oe(s, r, e), oe(r, s, n);
    });
  });
}
function ke(i, t) {
  return i ? typeof i == "string" ? J(i) : (
    /** @type {Projection} */
    i
  ) : J(t);
}
function Nt(i, t) {
  if (i === t)
    return !0;
  const e = i.getUnits() === t.getUnits();
  return (i.getCode() === t.getCode() || Ue(i, t) === Ye) && e;
}
function Ue(i, t) {
  const e = i.getCode(), n = t.getCode();
  let s = ki(e, n);
  return s || (s = Un), s;
}
function le(i, t) {
  const e = J(i), n = J(t);
  return Ue(e, n);
}
function cs(i, t, e) {
  return le(t, e)(i, void 0, i.length);
}
function fn(i, t) {
  return i;
}
function gt(i, t) {
  return Le && !ae(i, [0, 0]) && i[0] >= -180 && i[0] <= 180 && i[1] >= -90 && i[1] <= 90 && (Le = !1, rs(
    "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates."
  )), i;
}
function us(i, t) {
  return i;
}
function Tt(i, t) {
  return i;
}
function ds() {
  gn(on), gn(ln), hs(
    ln,
    on,
    Xi,
    Gi
  );
}
ds();
function _n(i, t, e) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number|undefined} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function(n, s, r, o, a) {
      if (!n)
        return;
      if (!s && !t)
        return n;
      const l = t ? 0 : r[0] * s, h = t ? 0 : r[1] * s, c = a ? a[0] : 0, u = a ? a[1] : 0;
      let d = i[0] + l / 2 + c, f = i[2] - l / 2 + c, g = i[1] + h / 2 + u, _ = i[3] - h / 2 + u;
      d > f && (d = (f + d) / 2, f = d), g > _ && (g = (_ + g) / 2, _ = g);
      let p = j(n[0], d, f), R = j(n[1], g, _);
      if (o && e && s) {
        const m = 30 * s;
        p += -m * Math.log(1 + Math.max(0, d - n[0]) / m) + m * Math.log(1 + Math.max(0, n[0] - f) / m), R += -m * Math.log(1 + Math.max(0, g - n[1]) / m) + m * Math.log(1 + Math.max(0, n[1] - _) / m);
      }
      return [p, R];
    }
  );
}
function gs(i) {
  return i;
}
function Ke(i, t, e, n) {
  const s = O(t) / e[0], r = V(t) / e[1];
  return n ? Math.min(i, Math.max(s, r)) : Math.min(i, Math.min(s, r));
}
function We(i, t, e) {
  let n = Math.min(i, t);
  const s = 50;
  return n *= Math.log(1 + s * Math.max(0, i / t - 1)) / s + 1, e && (n = Math.max(n, e), n /= Math.log(1 + s * Math.max(0, e / i - 1)) / s + 1), j(n, e / 2, t * 2);
}
function fs(i, t, e, n) {
  return t = t !== void 0 ? t : !0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(s, r, o, a) {
    if (s !== void 0) {
      const l = i[0], h = i[i.length - 1], c = e ? Ke(
        l,
        e,
        o,
        n
      ) : l;
      if (a)
        return t ? We(
          s,
          c,
          h
        ) : j(s, h, c);
      const u = Math.min(c, s), d = Math.floor(ze(i, u, r));
      return i[d] > c && d < i.length - 1 ? i[d + 1] : i[d];
    }
  };
}
function _s(i, t, e, n, s, r) {
  return n = n !== void 0 ? n : !0, e = e !== void 0 ? e : 0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(o, a, l, h) {
    if (o !== void 0) {
      const c = s ? Ke(
        t,
        s,
        l,
        r
      ) : t;
      if (h)
        return n ? We(
          o,
          c,
          e
        ) : j(o, e, c);
      const u = 1e-9, d = Math.ceil(
        Math.log(t / c) / Math.log(i) - u
      ), f = -a * (0.5 - u) + 0.5, g = Math.min(c, o), _ = Math.floor(
        Math.log(t / g) / Math.log(i) + f
      ), p = Math.max(d, _), R = t / Math.pow(i, p);
      return j(R, e, c);
    }
  };
}
function mn(i, t, e, n, s) {
  return e = e !== void 0 ? e : !0, /**
   * @param {number|undefined} resolution Resolution.
   * @param {number} direction Direction.
   * @param {import("./size.js").Size} size Viewport size.
   * @param {boolean} [isMoving] True if an interaction or animation is in progress.
   * @return {number|undefined} Resolution.
   */
  function(r, o, a, l) {
    if (r !== void 0) {
      const h = n ? Ke(
        i,
        n,
        a,
        s
      ) : i;
      return !e || !l ? j(r, t, h) : We(
        r,
        h,
        t
      );
    }
  };
}
function ms(i) {
  if (i !== void 0)
    return 0;
}
function pn(i) {
  if (i !== void 0)
    return i;
}
function ps(i) {
  const t = 2 * Math.PI / i;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(e, n) {
      if (n)
        return e;
      if (e !== void 0)
        return e = Math.floor(e / t + 0.5) * t, e;
    }
  );
}
function Rs(i) {
  const t = ne(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */
    function(e, n) {
      return n || e === void 0 ? e : Math.abs(e) <= t ? 0 : e;
    }
  );
}
function Kn(i) {
  return Math.pow(i, 3);
}
function ys(i) {
  return 1 - Kn(1 - i);
}
function Es(i) {
  return 3 * i * i - 2 * i * i * i;
}
new Array(6);
function se() {
  return [1, 0, 0, 1, 0, 0];
}
function et(i, t) {
  const e = t[0], n = t[1];
  return t[0] = i[0] * e + i[2] * n + i[4], t[1] = i[1] * e + i[3] * n + i[5], t;
}
function he(i, t, e, n, s, r, o, a) {
  const l = Math.sin(r), h = Math.cos(r);
  return i[0] = n * h, i[1] = s * l, i[2] = -n * l, i[3] = s * h, i[4] = o * n * h - a * n * l + t, i[5] = o * s * l + a * s * h + e, i;
}
function Ts(i, t) {
  const e = xs(t);
  N(e !== 0, "Transformation matrix cannot be inverted");
  const n = t[0], s = t[1], r = t[2], o = t[3], a = t[4], l = t[5];
  return i[0] = o / e, i[1] = -s / e, i[2] = -r / e, i[3] = n / e, i[4] = (r * l - o * a) / e, i[5] = -(n * l - s * a) / e, i;
}
function xs(i) {
  return i[0] * i[3] - i[1] * i[2];
}
const Rn = [1e6, 1e6, 1e6, 1e6, 2, 2];
function Cs(i) {
  return "matrix(" + i.map(
    (e, n) => Math.round(e * Rn[n]) / Rn[n]
  ).join(", ") + ")";
}
function Ms(i, t, e, n, s, r) {
  r = r || [];
  let o = 0;
  for (let a = t; a < e; a += n) {
    const l = i[a], h = i[a + 1];
    r[o++] = s[0] * l + s[2] * h + s[4], r[o++] = s[1] * l + s[3] * h + s[5];
  }
  return r && r.length != o && (r.length = o), r;
}
function ws(i, t, e, n, s, r, o) {
  o = o || [];
  const a = Math.cos(s), l = Math.sin(s), h = r[0], c = r[1];
  let u = 0;
  for (let d = t; d < e; d += n) {
    const f = i[d] - h, g = i[d + 1] - c;
    o[u++] = h + f * a - g * l, o[u++] = c + f * l + g * a;
    for (let _ = d + 2; _ < d + n; ++_)
      o[u++] = i[_];
  }
  return o && o.length != u && (o.length = u), o;
}
function Is(i, t, e, n, s, r, o, a) {
  a = a || [];
  const l = o[0], h = o[1];
  let c = 0;
  for (let u = t; u < e; u += n) {
    const d = i[u] - l, f = i[u + 1] - h;
    a[c++] = l + s * d, a[c++] = h + r * f;
    for (let g = u + 2; g < u + n; ++g)
      a[c++] = i[g];
  }
  return a && a.length != c && (a.length = c), a;
}
function vs(i, t, e, n, s, r, o) {
  o = o || [];
  let a = 0;
  for (let l = t; l < e; l += n) {
    o[a++] = i[l] + s, o[a++] = i[l + 1] + r;
    for (let h = l + 2; h < l + n; ++h)
      o[a++] = i[h];
  }
  return o && o.length != a && (o.length = a), o;
}
const yn = se();
class Ss extends _e {
  constructor() {
    super(), this.extent_ = Ct(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = Ii(
      (t, e, n) => {
        if (!n)
          return this.getSimplifiedGeometry(e);
        const s = this.clone();
        return s.applyTransform(n), s.getSimplifiedGeometry(e);
      }
    );
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */
  simplifyTransformed(t, e) {
    return this.simplifyTransformedInternal(
      this.getRevision(),
      t,
      e
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */
  clone() {
    return G();
  }
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(t, e, n, s) {
    return G();
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(t, e) {
    const n = this.getClosestPoint([t, e]);
    return n[0] === t && n[1] === e;
  }
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */
  getClosestPoint(t, e) {
    return e = e || [NaN, NaN], this.closestPointXY(t[0], t[1], e, 1 / 0), e;
  }
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */
  intersectsCoordinate(t) {
    return this.containsXY(t[0], t[1]);
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(t) {
    return G();
  }
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */
  getExtent(t) {
    if (this.extentRevision_ != this.getRevision()) {
      const e = this.computeExtent(this.extent_);
      (isNaN(e[0]) || isNaN(e[1])) && Ne(e), this.extentRevision_ = this.getRevision();
    }
    return Ji(this.extent_, t);
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(t, e) {
    G();
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(t, e, n) {
    G();
  }
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */
  simplify(t) {
    return this.getSimplifiedGeometry(t * t);
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */
  getSimplifiedGeometry(t) {
    return G();
  }
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */
  getType() {
    return G();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */
  applyTransform(t) {
    G();
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */
  intersectsExtent(t) {
    return G();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(t, e) {
    G();
  }
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {this} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */
  transform(t, e) {
    const n = J(t), s = n.getUnits() == "tile-pixels" ? function(r, o, a) {
      const l = n.getExtent(), h = n.getWorldExtent(), c = V(h) / V(l);
      return he(
        yn,
        h[0],
        h[3],
        c,
        -c,
        0,
        0,
        0
      ), Ms(
        r,
        0,
        r.length,
        a,
        yn,
        o
      ), le(n, e)(
        r,
        o,
        a
      );
    } : le(n, e);
    return this.applyTransform(s), this;
  }
}
class Ve extends Ss {
  constructor() {
    super(), this.layout = "XY", this.stride = 2, this.flatCoordinates;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(t) {
    return Wi(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */
  getCoordinates() {
    return G();
  }
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */
  getLastCoordinate() {
    return this.flatCoordinates.slice(
      this.flatCoordinates.length - this.stride
    );
  }
  /**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */
  getLayout() {
    return this.layout;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @override
   */
  getSimplifiedGeometry(t) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && t <= this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const e = this.getSimplifiedGeometryInternal(t);
    return e.getFlatCoordinates().length < this.flatCoordinates.length ? e : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this);
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */
  getSimplifiedGeometryInternal(t) {
    return this;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride;
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */
  setFlatCoordinates(t, e) {
    this.stride = En(t), this.layout = t, this.flatCoordinates = e;
  }
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  setCoordinates(t, e) {
    G();
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */
  setLayout(t, e, n) {
    let s;
    if (t)
      s = En(t);
    else {
      for (let r = 0; r < n; ++r) {
        if (e.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        }
        e = /** @type {Array<unknown>} */
        e[0];
      }
      s = e.length, t = Ps(s);
    }
    this.layout = t, this.stride = s;
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   * @override
   */
  applyTransform(t) {
    this.flatCoordinates && (t(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed());
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   * @override
   */
  rotate(t, e) {
    const n = this.getFlatCoordinates();
    if (n) {
      const s = this.getStride();
      ws(
        n,
        0,
        n.length,
        s,
        t,
        e,
        n
      ), this.changed();
    }
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   * @override
   */
  scale(t, e, n) {
    e === void 0 && (e = t), n || (n = zt(this.getExtent()));
    const s = this.getFlatCoordinates();
    if (s) {
      const r = this.getStride();
      Is(
        s,
        0,
        s.length,
        r,
        t,
        e,
        n,
        s
      ), this.changed();
    }
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   * @override
   */
  translate(t, e) {
    const n = this.getFlatCoordinates();
    if (n) {
      const s = this.getStride();
      vs(
        n,
        0,
        n.length,
        s,
        t,
        e,
        n
      ), this.changed();
    }
  }
}
function Ps(i) {
  let t;
  return i == 2 ? t = "XY" : i == 3 ? t = "XYZ" : i == 4 && (t = "XYZM"), /** @type {import("./Geometry.js").GeometryLayout} */
  t;
}
function En(i) {
  let t;
  return i == "XY" ? t = 2 : i == "XYZ" || i == "XYM" ? t = 3 : i == "XYZM" && (t = 4), /** @type {number} */
  t;
}
function Tn(i, t, e, n, s, r, o) {
  const a = i[t], l = i[t + 1], h = i[e] - a, c = i[e + 1] - l;
  let u;
  if (h === 0 && c === 0)
    u = t;
  else {
    const d = ((s - a) * h + (r - l) * c) / (h * h + c * c);
    if (d > 1)
      u = e;
    else if (d > 0) {
      for (let f = 0; f < n; ++f)
        o[f] = Oi(
          i[t + f],
          i[e + f],
          d
        );
      o.length = n;
      return;
    } else
      u = t;
  }
  for (let d = 0; d < n; ++d)
    o[d] = i[u + d];
  o.length = n;
}
function Wn(i, t, e, n, s) {
  let r = i[t], o = i[t + 1];
  for (t += n; t < e; t += n) {
    const a = i[t], l = i[t + 1], h = Lt(r, o, a, l);
    h > s && (s = h), r = a, o = l;
  }
  return s;
}
function As(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s = Wn(i, t, a, n, s), t = a;
  }
  return s;
}
function Vn(i, t, e, n, s, r, o, a, l, h, c) {
  if (t == e)
    return h;
  let u, d;
  if (s === 0) {
    if (d = Lt(
      o,
      a,
      i[t],
      i[t + 1]
    ), d < h) {
      for (u = 0; u < n; ++u)
        l[u] = i[t + u];
      return l.length = n, d;
    }
    return h;
  }
  c = c || [NaN, NaN];
  let f = t + n;
  for (; f < e; )
    if (Tn(
      i,
      f - n,
      f,
      n,
      o,
      a,
      c
    ), d = Lt(o, a, c[0], c[1]), d < h) {
      for (h = d, u = 0; u < n; ++u)
        l[u] = c[u];
      l.length = n, f += n;
    } else
      f += n * Math.max(
        (Math.sqrt(d) - Math.sqrt(h)) / s | 0,
        1
      );
  if (Tn(
    i,
    e - n,
    t,
    n,
    o,
    a,
    c
  ), d = Lt(o, a, c[0], c[1]), d < h) {
    for (h = d, u = 0; u < n; ++u)
      l[u] = c[u];
    l.length = n;
  }
  return h;
}
function Fs(i, t, e, n, s, r, o, a, l, h, c) {
  c = c || [NaN, NaN];
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u];
    h = Vn(
      i,
      t,
      f,
      n,
      s,
      r,
      o,
      a,
      l,
      h,
      c
    ), t = f;
  }
  return h;
}
function Os(i, t, e, n) {
  for (let s = 0, r = e.length; s < r; ++s)
    i[t++] = e[s];
  return t;
}
function Hn(i, t, e, n) {
  for (let s = 0, r = e.length; s < r; ++s) {
    const o = e[s];
    for (let a = 0; a < n; ++a)
      i[t++] = o[a];
  }
  return t;
}
function Ls(i, t, e, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = Hn(
      i,
      t,
      e[o],
      n
    );
    s[r++] = l, t = l;
  }
  return s.length = r, s;
}
function bs(i, t, e, n, s, r, o) {
  const a = (e - t) / n;
  if (a < 3) {
    for (; t < e; t += n)
      r[o++] = i[t], r[o++] = i[t + 1];
    return o;
  }
  const l = new Array(a);
  l[0] = 1, l[a - 1] = 1;
  const h = [t, e - n];
  let c = 0;
  for (; h.length > 0; ) {
    const u = h.pop(), d = h.pop();
    let f = 0;
    const g = i[d], _ = i[d + 1], p = i[u], R = i[u + 1];
    for (let m = d + n; m < u; m += n) {
      const E = i[m], x = i[m + 1], y = Ai(E, x, g, _, p, R);
      y > f && (c = m, f = y);
    }
    f > s && (l[(c - t) / n] = 1, d + n < c && h.push(d, c), c + n < u && h.push(c, u));
  }
  for (let u = 0; u < a; ++u)
    l[u] && (r[o++] = i[t + u * n], r[o++] = i[t + u * n + 1]);
  return o;
}
function It(i, t) {
  return t * Math.round(i / t);
}
function Ds(i, t, e, n, s, r, o) {
  if (t == e)
    return o;
  let a = It(i[t], s), l = It(i[t + 1], s);
  t += n, r[o++] = a, r[o++] = l;
  let h, c;
  do
    if (h = It(i[t], s), c = It(i[t + 1], s), t += n, t == e)
      return r[o++] = h, r[o++] = c, o;
  while (h == a && c == l);
  for (; t < e; ) {
    const u = It(i[t], s), d = It(i[t + 1], s);
    if (t += n, u == h && d == c)
      continue;
    const f = h - a, g = c - l, _ = u - a, p = d - l;
    if (f * p == g * _ && (f < 0 && _ < f || f == _ || f > 0 && _ > f) && (g < 0 && p < g || g == p || g > 0 && p > g)) {
      h = u, c = d;
      continue;
    }
    r[o++] = h, r[o++] = c, a = h, l = c, h = u, c = d;
  }
  return r[o++] = h, r[o++] = c, o;
}
function zs(i, t, e, n, s, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l];
    o = Ds(
      i,
      t,
      c,
      n,
      s,
      r,
      o
    ), a.push(o), t = c;
  }
  return o;
}
function Bn(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = t; o < e; o += n)
    s[r++] = i.slice(o, o + n);
  return s.length = r, s;
}
function Xs(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    s[r++] = Bn(
      i,
      t,
      l,
      n,
      s[r]
    ), t = l;
  }
  return s.length = r, s;
}
function qn(i, t, e, n) {
  let s = 0;
  const r = i[e - n], o = i[e - n + 1];
  let a = 0, l = 0;
  for (; t < e; t += n) {
    const h = i[t] - r, c = i[t + 1] - o;
    s += l * h - a * c, a = h, l = c;
  }
  return s / 2;
}
function Gs(i, t, e, n) {
  let s = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    s += qn(i, t, a, n), t = a;
  }
  return s;
}
class Yt extends Ve {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(t, e) {
    super(), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, e !== void 0 && !Array.isArray(t[0]) ? this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ) : this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      t,
      e
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   * @override
   */
  clone() {
    return new Yt(this.flatCoordinates.slice(), this.layout);
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, s) {
    return s < jn(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Wn(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Vn(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      s
    ));
  }
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return qn(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return Bn(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return e.length = bs(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new Yt(e, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "LinearRing";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return !1;
  }
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Hn(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
class He extends Ve {
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(t, e) {
    super(), this.setCoordinates(t, e);
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new He(this.flatCoordinates.slice(), this.layout);
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, s) {
    const r = this.flatCoordinates, o = Lt(
      t,
      e,
      r[0],
      r[1]
    );
    if (o < s) {
      const a = this.stride;
      for (let l = 0; l < a; ++l)
        n[l] = r[l];
      return n.length = a, o;
    }
    return s;
  }
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return this.flatCoordinates.slice();
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(t) {
    return Ki(this.flatCoordinates, t);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Point";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return Nn(t, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Os(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
function js(i, t, e, n, s) {
  return !Yn(
    s,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(o) {
      return !xt(
        i,
        t,
        e,
        n,
        o[0],
        o[1]
      );
    }
  );
}
function xt(i, t, e, n, s, r) {
  let o = 0, a = i[e - n], l = i[e - n + 1];
  for (; t < e; t += n) {
    const h = i[t], c = i[t + 1];
    l <= r ? c > r && (h - a) * (r - l) - (s - a) * (c - l) > 0 && o++ : c <= r && (h - a) * (r - l) - (s - a) * (c - l) < 0 && o--, a = h, l = c;
  }
  return o !== 0;
}
function $n(i, t, e, n, s, r) {
  if (e.length === 0 || !xt(i, t, e[0], n, s, r))
    return !1;
  for (let o = 1, a = e.length; o < a; ++o)
    if (xt(i, e[o - 1], e[o], n, s, r))
      return !1;
  return !0;
}
function Ns(i, t, e, n, s, r, o) {
  let a, l, h, c, u, d, f;
  const g = s[r + 1], _ = [];
  for (let m = 0, E = e.length; m < E; ++m) {
    const x = e[m];
    for (c = i[x - n], d = i[x - n + 1], a = t; a < x; a += n)
      u = i[a], f = i[a + 1], (g <= d && f <= g || d <= g && g <= f) && (h = (g - d) / (f - d) * (u - c) + c, _.push(h)), c = u, d = f;
  }
  let p = NaN, R = -1 / 0;
  for (_.sort(De), c = _[0], a = 1, l = _.length; a < l; ++a) {
    u = _[a];
    const m = Math.abs(u - c);
    m > R && (h = (c + u) / 2, $n(i, t, e, n, h, g) && (p = h, R = m)), c = u;
  }
  return isNaN(p) && (p = s[r]), [p, g, R];
}
function Zs(i, t, e, n, s) {
  let r;
  for (t += n; t < e; t += n)
    if (r = s(
      i.slice(t - n, t),
      i.slice(t, t + n)
    ), r)
      return r;
  return !1;
}
function Qn(i, t, e, n, s) {
  const r = Zn(
    Ct(),
    i,
    t,
    e,
    n
  );
  return Vt(s, r) ? Ui(s, r) || r[0] >= s[0] && r[2] <= s[2] || r[1] >= s[1] && r[3] <= s[3] ? !0 : Zs(
    i,
    t,
    e,
    n,
    /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function(o, a) {
      return ts(s, o, a);
    }
  ) : !1;
}
function Jn(i, t, e, n, s) {
  return !!(Qn(i, t, e, n, s) || xt(
    i,
    t,
    e,
    n,
    s[0],
    s[1]
  ) || xt(
    i,
    t,
    e,
    n,
    s[0],
    s[3]
  ) || xt(
    i,
    t,
    e,
    n,
    s[2],
    s[1]
  ) || xt(
    i,
    t,
    e,
    n,
    s[2],
    s[3]
  ));
}
function Ys(i, t, e, n, s) {
  if (!Jn(i, t, e[0], n, s))
    return !1;
  if (e.length === 1)
    return !0;
  for (let r = 1, o = e.length; r < o; ++r)
    if (js(
      i,
      e[r - 1],
      e[r],
      n,
      s
    ) && !Qn(
      i,
      e[r - 1],
      e[r],
      n,
      s
    ))
      return !1;
  return !0;
}
function ks(i, t, e, n) {
  for (; t < e - n; ) {
    for (let s = 0; s < n; ++s) {
      const r = i[t + s];
      i[t + s] = i[e - n + s], i[e - n + s] = r;
    }
    t += n, e -= n;
  }
}
function ti(i, t, e, n) {
  let s = 0, r = i[e - n], o = i[e - n + 1];
  for (; t < e; t += n) {
    const a = i[t], l = i[t + 1];
    s += (a - r) * (l + o), r = a, o = l;
  }
  return s === 0 ? void 0 : s > 0;
}
function Us(i, t, e, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r], l = ti(
      i,
      t,
      a,
      n
    );
    if (r === 0) {
      if (s && l || !s && !l)
        return !1;
    } else if (s && !l || !s && l)
      return !1;
    t = a;
  }
  return !0;
}
function xn(i, t, e, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r], l = ti(
      i,
      t,
      a,
      n
    );
    (r === 0 ? s && l || !s && !l : s && !l || !s && l) && ks(i, t, a, n), t = a;
  }
  return t;
}
class ce extends Ve {
  /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
   */
  constructor(t, e, n) {
    super(), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, e !== void 0 && n ? (this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ), this.ends_ = n) : this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      t,
      e
    );
  }
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */
  appendLinearRing(t) {
    this.flatCoordinates ? Mi(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new ce(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, s) {
    return s < jn(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      As(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Fs(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      s
    ));
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(t, e) {
    return $n(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t,
      e
    );
  }
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return Gs(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   * @override
   */
  getCoordinates(t) {
    let e;
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), xn(e, 0, this.ends_, this.stride, t)) : e = this.flatCoordinates, Xs(e, 0, this.ends_, this.stride);
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * @return {Array<number>} Interior point.
   */
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const t = zt(this.getExtent());
      this.flatInteriorPoint_ = Ns(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        t,
        0
      ), this.flatInteriorPointRevision_ = this.getRevision();
    }
    return (
      /** @type {import("../coordinate.js").Coordinate} */
      this.flatInteriorPoint_
    );
  }
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoint() {
    return new He(this.getFlatInteriorPoint(), "XYM");
  }
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */
  getLinearRingCount() {
    return this.ends_.length;
  }
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */
  getLinearRing(t) {
    return t < 0 || this.ends_.length <= t ? null : new Yt(
      this.flatCoordinates.slice(
        t === 0 ? 0 : this.ends_[t - 1],
        this.ends_[t]
      ),
      this.layout
    );
  }
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */
  getLinearRings() {
    const t = this.layout, e = this.flatCoordinates, n = this.ends_, s = [];
    let r = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o], h = new Yt(
        e.slice(r, l),
        t
      );
      s.push(h), r = l;
    }
    return s;
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      Us(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = xn(
        this.orientedFlatCoordinates_,
        0,
        this.ends_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.orientedFlatCoordinates_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [], n = [];
    return e.length = zs(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new ce(e, "XY", n);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Polygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return Ys(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t
    );
  }
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = Ls(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
function Cn(i) {
  if (Ze(i))
    throw new Error("Cannot create polygon from empty extent");
  const t = i[0], e = i[1], n = i[2], s = i[3], r = [
    t,
    e,
    t,
    s,
    n,
    s,
    n,
    e,
    t,
    e
  ];
  return new ce(r, "XY", [r.length]);
}
const Te = 0;
class Mn extends _e {
  /**
   * @param {ViewOptions} [options] View options.
   */
  constructor(t) {
    super(), this.on, this.once, this.un, t = Object.assign({}, t), this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.projection_ = ke(t.projection, "EPSG:3857"), this.viewportSize_ = [100, 100], this.targetCenter_ = null, this.targetResolution_, this.targetRotation_, this.nextCenter_ = null, this.nextResolution_, this.nextRotation_, this.cancelAnchor_ = void 0, t.projection && os(), t.center && (t.center = gt(t.center, this.projection_)), t.extent && (t.extent = Tt(t.extent, this.projection_)), this.applyOptions_(t);
  }
  /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */
  applyOptions_(t) {
    const e = Object.assign({}, t);
    for (const a in $)
      delete e[a];
    this.setProperties(e, !0);
    const n = Ws(t);
    this.maxResolution_ = n.maxResolution, this.minResolution_ = n.minResolution, this.zoomFactor_ = n.zoomFactor, this.resolutions_ = t.resolutions, this.padding_ = t.padding, this.minZoom_ = n.minZoom;
    const s = Ks(t), r = n.constraint, o = Vs(t);
    this.constraints_ = {
      center: s,
      resolution: r,
      rotation: o
    }, this.setRotation(t.rotation !== void 0 ? t.rotation : 0), this.setCenterInternal(
      t.center !== void 0 ? t.center : null
    ), t.resolution !== void 0 ? this.setResolution(t.resolution) : t.zoom !== void 0 && this.setZoom(t.zoom);
  }
  /**
   * Padding (in css pixels).
   * If the map viewport is partially covered with other content (overlays) along
   * its edges, this setting allows to shift the center of the viewport away from that
   * content. The order of the values in the array is top, right, bottom, left.
   * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
   * @type {Array<number>|undefined}
   * @api
   */
  get padding() {
    return this.padding_;
  }
  set padding(t) {
    let e = this.padding_;
    this.padding_ = t;
    const n = this.getCenterInternal();
    if (n) {
      const s = t || [0, 0, 0, 0];
      e = e || [0, 0, 0, 0];
      const r = this.getResolution(), o = r / 2 * (s[3] - e[3] + e[1] - s[1]), a = r / 2 * (s[0] - e[0] + e[2] - s[2]);
      this.setCenterInternal([n[0] + o, n[1] - a]);
    }
  }
  /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */
  getUpdatedOptions_(t) {
    const e = this.getProperties();
    return e.resolution !== void 0 ? e.resolution = this.getResolution() : e.zoom = this.getZoom(), e.center = this.getCenterInternal(), e.rotation = this.getRotation(), Object.assign({}, e, t);
  }
  /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */
  animate(t) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
    const e = new Array(arguments.length);
    for (let n = 0; n < e.length; ++n) {
      let s = arguments[n];
      s.center && (s = Object.assign({}, s), s.center = gt(
        s.center,
        this.getProjection()
      )), s.anchor && (s = Object.assign({}, s), s.anchor = gt(
        s.anchor,
        this.getProjection()
      )), e[n] = s;
    }
    this.animateInternal.apply(this, e);
  }
  /**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */
  animateInternal(t) {
    let e = arguments.length, n;
    e > 1 && typeof arguments[e - 1] == "function" && (n = arguments[e - 1], --e);
    let s = 0;
    for (; s < e && !this.isDef(); ++s) {
      const c = arguments[s];
      c.center && this.setCenterInternal(c.center), c.zoom !== void 0 ? this.setZoom(c.zoom) : c.resolution && this.setResolution(c.resolution), c.rotation !== void 0 && this.setRotation(c.rotation);
    }
    if (s === e) {
      n && te(n, !0);
      return;
    }
    let r = Date.now(), o = this.targetCenter_.slice(), a = this.targetResolution_, l = this.targetRotation_;
    const h = [];
    for (; s < e; ++s) {
      const c = (
        /** @type {AnimationOptions} */
        arguments[s]
      ), u = {
        start: r,
        complete: !1,
        anchor: c.anchor,
        duration: c.duration !== void 0 ? c.duration : 1e3,
        easing: c.easing || Es,
        callback: n
      };
      if (c.center && (u.sourceCenter = o, u.targetCenter = c.center.slice(), o = u.targetCenter), c.zoom !== void 0 ? (u.sourceResolution = a, u.targetResolution = this.getResolutionForZoom(c.zoom), a = u.targetResolution) : c.resolution && (u.sourceResolution = a, u.targetResolution = c.resolution, a = u.targetResolution), c.rotation !== void 0) {
        u.sourceRotation = l;
        const d = bt(c.rotation - l + Math.PI, 2 * Math.PI) - Math.PI;
        u.targetRotation = l + d, l = u.targetRotation;
      }
      Hs(u) ? u.complete = !0 : r += u.duration, h.push(u);
    }
    this.animations_.push(h), this.setHint(dt.ANIMATING, 1), this.updateAnimations_();
  }
  /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */
  getAnimating() {
    return this.hints_[dt.ANIMATING] > 0;
  }
  /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */
  getInteracting() {
    return this.hints_[dt.INTERACTING] > 0;
  }
  /**
   * Cancel any ongoing animations.
   * @api
   */
  cancelAnimations() {
    this.setHint(dt.ANIMATING, -this.hints_[dt.ANIMATING]);
    let t;
    for (let e = 0, n = this.animations_.length; e < n; ++e) {
      const s = this.animations_[e];
      if (s[0].callback && te(s[0].callback, !1), !t)
        for (let r = 0, o = s.length; r < o; ++r) {
          const a = s[r];
          if (!a.complete) {
            t = a.anchor;
            break;
          }
        }
    }
    this.animations_.length = 0, this.cancelAnchor_ = t, this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
  }
  /**
   * Update all animations.
   */
  updateAnimations_() {
    if (this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), !this.getAnimating())
      return;
    const t = Date.now();
    let e = !1;
    for (let n = this.animations_.length - 1; n >= 0; --n) {
      const s = this.animations_[n];
      let r = !0;
      for (let o = 0, a = s.length; o < a; ++o) {
        const l = s[o];
        if (l.complete)
          continue;
        const h = t - l.start;
        let c = l.duration > 0 ? h / l.duration : 1;
        c >= 1 ? (l.complete = !0, c = 1) : r = !1;
        const u = l.easing(c);
        if (l.sourceCenter) {
          const d = l.sourceCenter[0], f = l.sourceCenter[1], g = l.targetCenter[0], _ = l.targetCenter[1];
          this.nextCenter_ = l.targetCenter;
          const p = d + u * (g - d), R = f + u * (_ - f);
          this.targetCenter_ = [p, R];
        }
        if (l.sourceResolution && l.targetResolution) {
          const d = u === 1 ? l.targetResolution : l.sourceResolution + u * (l.targetResolution - l.sourceResolution);
          if (l.anchor) {
            const f = this.getViewportSize_(this.getRotation()), g = this.constraints_.resolution(
              d,
              0,
              f,
              !0
            );
            this.targetCenter_ = this.calculateCenterZoom(
              g,
              l.anchor
            );
          }
          this.nextResolution_ = l.targetResolution, this.targetResolution_ = d, this.applyTargetState_(!0);
        }
        if (l.sourceRotation !== void 0 && l.targetRotation !== void 0) {
          const d = u === 1 ? bt(l.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : l.sourceRotation + u * (l.targetRotation - l.sourceRotation);
          if (l.anchor) {
            const f = this.constraints_.rotation(
              d,
              !0
            );
            this.targetCenter_ = this.calculateCenterRotate(
              f,
              l.anchor
            );
          }
          this.nextRotation_ = l.targetRotation, this.targetRotation_ = d;
        }
        if (this.applyTargetState_(!0), e = !0, !l.complete)
          break;
      }
      if (r) {
        this.animations_[n] = null, this.setHint(dt.ANIMATING, -1), this.nextCenter_ = null, this.nextResolution_ = NaN, this.nextRotation_ = NaN;
        const o = s[0].callback;
        o && te(o, !0);
      }
    }
    this.animations_ = this.animations_.filter(Boolean), e && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(
      this.updateAnimations_.bind(this)
    ));
  }
  /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */
  calculateCenterRotate(t, e) {
    let n;
    const s = this.getCenterInternal();
    return s !== void 0 && (n = [s[0] - e[0], s[1] - e[1]], is(n, t - this.getRotation()), ns(n, e)), n;
  }
  /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */
  calculateCenterZoom(t, e) {
    let n;
    const s = this.getCenterInternal(), r = this.getResolution();
    if (s !== void 0 && r !== void 0) {
      const o = e[0] - t * (e[0] - s[0]) / r, a = e[1] - t * (e[1] - s[1]) / r;
      n = [o, a];
    }
    return n;
  }
  /**
   * Returns the current viewport size.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */
  getViewportSize_(t) {
    const e = this.viewportSize_;
    if (t) {
      const n = e[0], s = e[1];
      return [
        Math.abs(n * Math.cos(t)) + Math.abs(s * Math.sin(t)),
        Math.abs(n * Math.sin(t)) + Math.abs(s * Math.cos(t))
      ];
    }
    return e;
  }
  /**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [size] Viewport size; if undefined, [100, 100] is assumed
   */
  setViewportSize(t) {
    this.viewportSize_ = Array.isArray(t) ? t.slice() : [100, 100], this.getAnimating() || this.resolveConstraints(0);
  }
  /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */
  getCenter() {
    const t = this.getCenterInternal();
    return t && fn(t, this.getProjection());
  }
  /**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */
  getCenterInternal() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get($.CENTER)
    );
  }
  /**
   * @return {Constraints} Constraints.
   */
  getConstraints() {
    return this.constraints_;
  }
  /**
   * @return {boolean} Resolution constraint is set
   */
  getConstrainResolution() {
    return this.get("constrainResolution");
  }
  /**
   * @param {Array<number>} [hints] Destination array.
   * @return {Array<number>} Hint.
   */
  getHints(t) {
    return t !== void 0 ? (t[0] = this.hints_[0], t[1] = this.hints_[1], t) : this.hints_.slice();
  }
  /**
   * Calculate the extent for the current view state and the passed box size.
   * @param {import("./size.js").Size} [size] The pixel dimensions of the box
   * into which the calculated extent should fit. Defaults to the size of the
   * map the view is associated with.
   * If no map or multiple maps are connected to the view, provide the desired
   * box size (e.g. `map.getSize()`).
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */
  calculateExtent(t) {
    const e = this.calculateExtentInternal(t);
    return us(e, this.getProjection());
  }
  /**
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */
  calculateExtentInternal(t) {
    t = t || this.getViewportSizeMinusPadding_();
    const e = (
      /** @type {!import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    N(e, "The view center is not defined");
    const n = (
      /** @type {!number} */
      this.getResolution()
    );
    N(n !== void 0, "The view resolution is not defined");
    const s = (
      /** @type {!number} */
      this.getRotation()
    );
    return N(s !== void 0, "The view rotation is not defined"), $i(e, n, s, t);
  }
  /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */
  getMaxResolution() {
    return this.maxResolution_;
  }
  /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */
  getMinResolution() {
    return this.minResolution_;
  }
  /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */
  getMaxZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.minResolution_)
    );
  }
  /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */
  setMaxZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t }));
  }
  /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */
  getMinZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.maxResolution_)
    );
  }
  /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */
  setMinZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: t }));
  }
  /**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */
  setConstrainResolution(t) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: t }));
  }
  /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */
  getProjection() {
    return this.projection_;
  }
  /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */
  getResolution() {
    return (
      /** @type {number|undefined} */
      this.get($.RESOLUTION)
    );
  }
  /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */
  getResolutionForExtent(t, e) {
    return this.getResolutionForExtentInternal(
      Tt(t, this.getProjection()),
      e
    );
  }
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */
  getResolutionForExtentInternal(t, e) {
    e = e || this.getViewportSizeMinusPadding_();
    const n = O(t) / e[0], s = V(t) / e[1];
    return Math.max(n, s);
  }
  /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Resolution for value function.
   */
  getResolutionForValueFunction(t) {
    t = t || 2;
    const e = this.getConstrainedResolution(this.maxResolution_), n = this.minResolution_, s = Math.log(e / n) / Math.log(t);
    return (
      /**
       * @param {number} value Value.
       * @return {number} Resolution.
       */
      function(r) {
        return e / Math.pow(t, r * s);
      }
    );
  }
  /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */
  getRotation() {
    return (
      /** @type {number} */
      this.get($.ROTATION)
    );
  }
  /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Value for resolution function.
   */
  getValueForResolutionFunction(t) {
    const e = Math.log(t || 2), n = this.getConstrainedResolution(this.maxResolution_), s = this.minResolution_, r = Math.log(n / s) / e;
    return (
      /**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */
      function(o) {
        return Math.log(n / o) / e / r;
      }
    );
  }
  /**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */
  getViewportSizeMinusPadding_(t) {
    let e = this.getViewportSize_(t);
    const n = this.padding_;
    return n && (e = [
      e[0] - n[1] - n[3],
      e[1] - n[0] - n[2]
    ]), e;
  }
  /**
   * @return {State} View state.
   */
  getState() {
    const t = this.getProjection(), e = this.getResolution(), n = this.getRotation();
    let s = (
      /** @type {import("./coordinate.js").Coordinate} */
      this.getCenterInternal()
    );
    const r = this.padding_;
    if (r) {
      const o = this.getViewportSizeMinusPadding_();
      s = xe(
        s,
        this.getViewportSize_(),
        [o[0] / 2 + r[3], o[1] / 2 + r[0]],
        e,
        n
      );
    }
    return {
      center: s.slice(0),
      projection: t !== void 0 ? t : null,
      resolution: e,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: n,
      zoom: this.getZoom()
    };
  }
  /**
   * @return {ViewStateLayerStateExtent} Like `FrameState`, but just `viewState` and `extent`.
   */
  getViewStateAndExtent() {
    return {
      viewState: this.getState(),
      extent: this.calculateExtent()
    };
  }
  /**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */
  getZoom() {
    let t;
    const e = this.getResolution();
    return e !== void 0 && (t = this.getZoomForResolution(e)), t;
  }
  /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */
  getZoomForResolution(t) {
    let e = this.minZoom_ || 0, n, s;
    if (this.resolutions_) {
      const r = ze(this.resolutions_, t, 1);
      e = r, n = this.resolutions_[r], r == this.resolutions_.length - 1 ? s = 2 : s = n / this.resolutions_[r + 1];
    } else
      n = this.maxResolution_, s = this.zoomFactor_;
    return e + Math.log(n / t) / Math.log(s);
  }
  /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */
  getResolutionForZoom(t) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1)
        return 0;
      const e = j(
        Math.floor(t),
        0,
        this.resolutions_.length - 2
      ), n = this.resolutions_[e] / this.resolutions_[e + 1];
      return this.resolutions_[e] / Math.pow(n, j(t - e, 0, 1));
    }
    return this.maxResolution_ / Math.pow(this.zoomFactor_, t - this.minZoom_);
  }
  /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [options] Options.
   * @api
   */
  fit(t, e) {
    let n;
    if (N(
      Array.isArray(t) || typeof /** @type {?} */
      t.getSimplifiedGeometry == "function",
      "Invalid extent or geometry provided as `geometry`"
    ), Array.isArray(t)) {
      N(
        !Ze(t),
        "Cannot fit empty extent provided as `geometry`"
      );
      const s = Tt(t, this.getProjection());
      n = Cn(s);
    } else if (t.getType() === "Circle") {
      const s = Tt(
        t.getExtent(),
        this.getProjection()
      );
      n = Cn(s), n.rotate(this.getRotation(), zt(s));
    } else
      n = t;
    this.fitInternal(n, e);
  }
  /**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */
  rotatedExtentForGeometry(t) {
    const e = this.getRotation(), n = Math.cos(e), s = Math.sin(-e), r = t.getFlatCoordinates(), o = t.getStride();
    let a = 1 / 0, l = 1 / 0, h = -1 / 0, c = -1 / 0;
    for (let u = 0, d = r.length; u < d; u += o) {
      const f = r[u] * n - r[u + 1] * s, g = r[u] * s + r[u + 1] * n;
      a = Math.min(a, f), l = Math.min(l, g), h = Math.max(h, f), c = Math.max(c, g);
    }
    return [a, l, h, c];
  }
  /**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [options] Options.
   */
  fitInternal(t, e) {
    e = e || {};
    let n = e.size;
    n || (n = this.getViewportSizeMinusPadding_());
    const s = e.padding !== void 0 ? e.padding : [0, 0, 0, 0], r = e.nearest !== void 0 ? e.nearest : !1;
    let o;
    e.minResolution !== void 0 ? o = e.minResolution : e.maxZoom !== void 0 ? o = this.getResolutionForZoom(e.maxZoom) : o = 0;
    const a = this.rotatedExtentForGeometry(t);
    let l = this.getResolutionForExtentInternal(a, [
      n[0] - s[1] - s[3],
      n[1] - s[0] - s[2]
    ]);
    l = isNaN(l) ? o : Math.max(l, o), l = this.getConstrainedResolution(l, r ? 0 : 1);
    const h = this.getRotation(), c = Math.sin(h), u = Math.cos(h), d = zt(a);
    d[0] += (s[1] - s[3]) / 2 * l, d[1] += (s[0] - s[2]) / 2 * l;
    const f = d[0] * u - d[1] * c, g = d[1] * u + d[0] * c, _ = this.getConstrainedCenter([f, g], l), p = e.callback ? e.callback : Fe;
    e.duration !== void 0 ? this.animateInternal(
      {
        resolution: l,
        center: _,
        duration: e.duration,
        easing: e.easing
      },
      p
    ) : (this.targetResolution_ = l, this.targetCenter_ = _, this.applyTargetState_(!1, !0), te(p, !0));
  }
  /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */
  centerOn(t, e, n) {
    this.centerOnInternal(
      gt(t, this.getProjection()),
      e,
      n
    );
  }
  /**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */
  centerOnInternal(t, e, n) {
    this.setCenterInternal(
      xe(
        t,
        e,
        n,
        this.getResolution(),
        this.getRotation()
      )
    );
  }
  /**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */
  calculateCenterShift(t, e, n, s) {
    let r;
    const o = this.padding_;
    if (o && t) {
      const a = this.getViewportSizeMinusPadding_(-n), l = xe(
        t,
        s,
        [a[0] / 2 + o[3], a[1] / 2 + o[0]],
        e,
        n
      );
      r = [
        t[0] - l[0],
        t[1] - l[1]
      ];
    }
    return r;
  }
  /**
   * @return {boolean} Is defined.
   */
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */
  adjustCenter(t) {
    const e = fn(this.targetCenter_, this.getProjection());
    this.setCenter([
      e[0] + t[0],
      e[1] + t[1]
    ]);
  }
  /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */
  adjustCenterInternal(t) {
    const e = this.targetCenter_;
    this.setCenterInternal([
      e[0] + t[0],
      e[1] + t[1]
    ]);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustResolution(t, e) {
    e = e && gt(e, this.getProjection()), this.adjustResolutionInternal(t, e);
  }
  /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  adjustResolutionInternal(t, e) {
    const n = this.getAnimating() || this.getInteracting(), s = this.getViewportSize_(this.getRotation()), r = this.constraints_.resolution(
      this.targetResolution_ * t,
      0,
      s,
      n
    );
    e && (this.targetCenter_ = this.calculateCenterZoom(r, e)), this.targetResolution_ *= t, this.applyTargetState_();
  }
  /**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  adjustZoom(t, e) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -t), e);
  }
  /**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   * @api
   */
  adjustRotation(t, e) {
    e && (e = gt(e, this.getProjection())), this.adjustRotationInternal(t, e);
  }
  /**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   */
  adjustRotationInternal(t, e) {
    const n = this.getAnimating() || this.getInteracting(), s = this.constraints_.rotation(
      this.targetRotation_ + t,
      n
    );
    e && (this.targetCenter_ = this.calculateCenterRotate(s, e)), this.targetRotation_ += t, this.applyTargetState_();
  }
  /**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */
  setCenter(t) {
    this.setCenterInternal(
      t && gt(t, this.getProjection())
    );
  }
  /**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */
  setCenterInternal(t) {
    this.targetCenter_ = t, this.applyTargetState_();
  }
  /**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */
  setHint(t, e) {
    return this.hints_[t] += e, this.changed(), this.hints_[t];
  }
  /**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */
  setResolution(t) {
    this.targetResolution_ = t, this.applyTargetState_();
  }
  /**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */
  setRotation(t) {
    this.targetRotation_ = t, this.applyTargetState_();
  }
  /**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */
  setZoom(t) {
    this.setResolution(this.getResolutionForZoom(t));
  }
  /**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [forceMoving] Apply constraints as if the view is moving.
   * @private
   */
  applyTargetState_(t, e) {
    const n = this.getAnimating() || this.getInteracting() || e, s = this.constraints_.rotation(
      this.targetRotation_,
      n
    ), r = this.getViewportSize_(s), o = this.constraints_.resolution(
      this.targetResolution_,
      0,
      r,
      n
    ), a = this.constraints_.center(
      this.targetCenter_,
      o,
      r,
      n,
      this.calculateCenterShift(
        this.targetCenter_,
        o,
        s,
        r
      )
    );
    this.get($.ROTATION) !== s && this.set($.ROTATION, s), this.get($.RESOLUTION) !== o && (this.set($.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)), (!a || !this.get($.CENTER) || !ae(this.get($.CENTER), a)) && this.set($.CENTER, a), this.getAnimating() && !t && this.cancelAnimations(), this.cancelAnchor_ = void 0;
  }
  /**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [duration] The animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  resolveConstraints(t, e, n) {
    t = t !== void 0 ? t : 200;
    const s = e || 0, r = this.constraints_.rotation(this.targetRotation_), o = this.getViewportSize_(r), a = this.constraints_.resolution(
      this.targetResolution_,
      s,
      o
    ), l = this.constraints_.center(
      this.targetCenter_,
      a,
      o,
      !1,
      this.calculateCenterShift(
        this.targetCenter_,
        a,
        r,
        o
      )
    );
    if (t === 0 && !this.cancelAnchor_) {
      this.targetResolution_ = a, this.targetRotation_ = r, this.targetCenter_ = l, this.applyTargetState_();
      return;
    }
    n = n || (t === 0 ? this.cancelAnchor_ : void 0), this.cancelAnchor_ = void 0, (this.getResolution() !== a || this.getRotation() !== r || !this.getCenterInternal() || !ae(this.getCenterInternal(), l)) && (this.getAnimating() && this.cancelAnimations(), this.animateInternal({
      rotation: r,
      center: l,
      resolution: a,
      duration: t,
      easing: ys,
      anchor: n
    }));
  }
  /**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(dt.INTERACTING, 1);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */
  endInteraction(t, e, n) {
    n = n && gt(n, this.getProjection()), this.endInteractionInternal(t, e, n);
  }
  /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */
  endInteractionInternal(t, e, n) {
    this.getInteracting() && (this.setHint(dt.INTERACTING, -1), this.resolveConstraints(t, e, n));
  }
  /**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */
  getConstrainedCenter(t, e) {
    const n = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(
      t,
      e || this.getResolution(),
      n
    );
  }
  /**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */
  getConstrainedZoom(t, e) {
    const n = this.getResolutionForZoom(t);
    return this.getZoomForResolution(
      this.getConstrainedResolution(n, e)
    );
  }
  /**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */
  getConstrainedResolution(t, e) {
    e = e || 0;
    const n = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(t, e, n);
  }
}
function te(i, t) {
  setTimeout(function() {
    i(t);
  }, 0);
}
function Ks(i) {
  if (i.extent !== void 0) {
    const e = i.smoothExtentConstraint !== void 0 ? i.smoothExtentConstraint : !0;
    return _n(i.extent, i.constrainOnlyCenter, e);
  }
  const t = ke(i.projection, "EPSG:3857");
  if (i.multiWorld !== !0 && t.isGlobal()) {
    const e = t.getExtent().slice();
    return e[0] = -1 / 0, e[2] = 1 / 0, _n(e, !1, !1);
  }
  return gs;
}
function Ws(i) {
  let t, e, n, o = i.minZoom !== void 0 ? i.minZoom : Te, a = i.maxZoom !== void 0 ? i.maxZoom : 28;
  const l = i.zoomFactor !== void 0 ? i.zoomFactor : 2, h = i.multiWorld !== void 0 ? i.multiWorld : !1, c = i.smoothResolutionConstraint !== void 0 ? i.smoothResolutionConstraint : !0, u = i.showFullExtent !== void 0 ? i.showFullExtent : !1, d = ke(i.projection, "EPSG:3857"), f = d.getExtent();
  let g = i.constrainOnlyCenter, _ = i.extent;
  if (!h && !_ && d.isGlobal() && (g = !1, _ = f), i.resolutions !== void 0) {
    const p = i.resolutions;
    e = p[o], n = p[a] !== void 0 ? p[a] : p[p.length - 1], i.constrainResolution ? t = fs(
      p,
      c,
      !g && _,
      u
    ) : t = mn(
      e,
      n,
      c,
      !g && _,
      u
    );
  } else {
    const R = (f ? Math.max(O(f), V(f)) : (
      // use an extent that can fit the whole world if need be
      360 * Ge.degrees / d.getMetersPerUnit()
    )) / Xe / Math.pow(2, Te), m = R / Math.pow(2, 28 - Te);
    e = i.maxResolution, e !== void 0 ? o = 0 : e = R / Math.pow(l, o), n = i.minResolution, n === void 0 && (i.maxZoom !== void 0 ? i.maxResolution !== void 0 ? n = e / Math.pow(l, a) : n = R / Math.pow(l, a) : n = m), a = o + Math.floor(
      Math.log(e / n) / Math.log(l)
    ), n = e / Math.pow(l, a - o), i.constrainResolution ? t = _s(
      l,
      e,
      n,
      c,
      !g && _,
      u
    ) : t = mn(
      e,
      n,
      c,
      !g && _,
      u
    );
  }
  return {
    constraint: t,
    maxResolution: e,
    minResolution: n,
    minZoom: o,
    zoomFactor: l
  };
}
function Vs(i) {
  if (i.enableRotation !== void 0 ? i.enableRotation : !0) {
    const e = i.constrainRotation;
    return e === void 0 || e === !0 ? Rs() : e === !1 ? pn : typeof e == "number" ? ps(e) : pn;
  }
  return ms;
}
function Hs(i) {
  return !(i.sourceCenter && i.targetCenter && !ae(i.sourceCenter, i.targetCenter) || i.sourceResolution !== i.targetResolution || i.sourceRotation !== i.targetRotation);
}
function xe(i, t, e, n, s) {
  const r = Math.cos(-s);
  let o = Math.sin(-s), a = i[0] * r - i[1] * o, l = i[1] * r + i[0] * o;
  a += (t[0] / 2 - e[0]) * n, l += (e[1] - t[1] / 2) * n, o = -o;
  const h = a * r - l * o, c = l * r + a * o;
  return [h, c];
}
class Bs extends Li {
  /**
   * @param {Options<SourceType>} options Layer options.
   */
  constructor(t) {
    const e = Object.assign({}, t);
    delete e.source, super(e), this.on, this.once, this.un, this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, this.renderer_ = null, this.sourceReady_ = !1, this.rendered = !1, t.render && (this.render = t.render), t.map && this.setMap(t.map), this.addChangeListener(
      w.SOURCE,
      this.handleSourcePropertyChange_
    );
    const n = t.source ? (
      /** @type {SourceType} */
      t.source
    ) : null;
    this.setSource(n);
  }
  /**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   * @override
   */
  getLayersArray(t) {
    return t = t || [], t.push(this), t;
  }
  /**
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   * @override
   */
  getLayerStatesArray(t) {
    return t = t || [], t.push(this.getLayerState()), t;
  }
  /**
   * Get the layer source.
   * @return {SourceType|null} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */
  getSource() {
    return (
      /** @type {SourceType} */
      this.get(w.SOURCE) || null
    );
  }
  /**
   * @return {SourceType|null} The source being rendered.
   */
  getRenderSource() {
    return this.getSource();
  }
  /**
   * @return {import("../source/Source.js").State} Source state.
   * @override
   */
  getSourceState() {
    const t = this.getSource();
    return t ? t.getState() : "undefined";
  }
  /**
   * @private
   */
  handleSourceChange_() {
    this.changed(), !(this.sourceReady_ || this.getSource().getState() !== "ready") && (this.sourceReady_ = !0, this.dispatchEvent("sourceready"));
  }
  /**
   * @private
   */
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ && (it(this.sourceChangeKey_), this.sourceChangeKey_ = null), this.sourceReady_ = !1;
    const t = this.getSource();
    t && (this.sourceChangeKey_ = mt(
      t,
      st.CHANGE,
      this.handleSourceChange_,
      this
    ), t.getState() === "ready" && (this.sourceReady_ = !0, setTimeout(() => {
      this.dispatchEvent("sourceready");
    }, 0))), this.changed();
  }
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */
  getFeatures(t) {
    return this.renderer_ ? this.renderer_.getFeatures(t) : Promise.resolve([]);
  }
  /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */
  getData(t) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(t);
  }
  /**
   * The layer is visible on the map view, i.e. within its min/max resolution or zoom and
   * extent, not set to `visible: false`, and not inside a layer group that is set
   * to `visible: false`.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {boolean} The layer is visible in the map view.
   * @api
   */
  isVisible(t) {
    let e;
    const n = this.getMapInternal();
    !t && n && (t = n.getView()), t instanceof Mn ? e = {
      viewState: t.getState(),
      extent: t.calculateExtent()
    } : e = t, !e.layerStatesArray && n && (e.layerStatesArray = n.getLayerGroup().getLayerStatesArray());
    let s;
    e.layerStatesArray ? s = e.layerStatesArray.find(
      (o) => o.layer === this
    ) : s = this.getLayerState();
    const r = this.getExtent();
    return qs(s, e.viewState) && (!r || Vt(r, e.extent));
  }
  /**
   * Get the attributions of the source of this layer for the given view.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {Array<string>} Attributions for this layer at the given view.
   * @api
   */
  getAttributions(t) {
    var r;
    if (!this.isVisible(t))
      return [];
    const e = (r = this.getSource()) == null ? void 0 : r.getAttributions();
    if (!e)
      return [];
    const n = t instanceof Mn ? t.getViewStateAndExtent() : t;
    let s = e(n);
    return Array.isArray(s) || (s = [s]), s;
  }
  /**
   * In charge to manage the rendering of the layer. One layer type is
   * bounded with one layer renderer.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement|null} The rendered element.
   */
  render(t, e) {
    const n = this.getRenderer();
    return n.prepareFrame(t) ? (this.rendered = !0, n.renderFrame(t, e)) : null;
  }
  /**
   * Called when a layer is not visible during a map render.
   */
  unrender() {
    this.rendered = !1;
  }
  /** @return {string} Declutter */
  getDeclutter() {
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {import("../layer/Layer.js").State} layerState Layer state.
   */
  renderDeclutter(t, e) {
  }
  /**
   * When the renderer follows a layout -> render approach, do the final rendering here.
   * @param {import('../Map.js').FrameState} frameState Frame state
   */
  renderDeferred(t) {
    const e = this.getRenderer();
    e && e.renderDeferred(t);
  }
  /**
   * For use inside the library only.
   * @param {import("../Map.js").default|null} map Map.
   */
  setMapInternal(t) {
    t || this.unrender(), this.set(w.MAP, t);
  }
  /**
   * For use inside the library only.
   * @return {import("../Map.js").default|null} Map.
   */
  getMapInternal() {
    return this.get(w.MAP);
  }
  /**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map~Map#addLayer} instead.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */
  setMap(t) {
    this.mapPrecomposeKey_ && (it(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (it(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = mt(
      t,
      jt.PRECOMPOSE,
      (e) => {
        const s = /** @type {import("../render/Event.js").default} */ e.frameState.layerStatesArray, r = this.getLayerState(!1);
        N(
          !s.some(function(o) {
            return o.layer === r.layer;
          }),
          "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both."
        ), s.push(r);
      }
    ), this.mapRenderKey_ = mt(this, st.CHANGE, t.render, t), this.changed());
  }
  /**
   * Set the layer source.
   * @param {SourceType|null} source The layer source.
   * @observable
   * @api
   */
  setSource(t) {
    this.set(w.SOURCE, t);
  }
  /**
   * Get the renderer for this layer.
   * @return {RendererType|null} The layer renderer.
   */
  getRenderer() {
    return this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_;
  }
  /**
   * @return {boolean} The layer has a renderer.
   */
  hasRenderer() {
    return !!this.renderer_;
  }
  /**
   * Create a renderer for this layer.
   * @return {RendererType} A layer renderer.
   * @protected
   */
  createRenderer() {
    return null;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.renderer_ && (this.renderer_.dispose(), delete this.renderer_), this.setSource(null), super.disposeInternal();
  }
}
function qs(i, t) {
  if (!i.visible)
    return !1;
  const e = t.resolution;
  if (e < i.minResolution || e >= i.maxResolution)
    return !1;
  const n = t.zoom;
  return n > i.minZoom && n <= i.maxZoom;
}
const ee = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};
class $s extends Bs {
  /**
   * @param {Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t), n = t.cacheSize;
    delete t.cacheSize, delete e.preload, delete e.useInterimTilesOnError, super(e), this.on, this.once, this.un, this.cacheSize_ = n, this.setPreload(t.preload !== void 0 ? t.preload : 0), this.setUseInterimTilesOnError(
      t.useInterimTilesOnError !== void 0 ? t.useInterimTilesOnError : !0
    );
  }
  /**
   * @return {number|undefined} The suggested cache size
   * @protected
   */
  getCacheSize() {
    return this.cacheSize_;
  }
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */
  getPreload() {
    return (
      /** @type {number} */
      this.get(ee.PRELOAD)
    );
  }
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */
  setPreload(t) {
    this.set(ee.PRELOAD, t);
  }
  /**
   * Deprecated.  Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */
  getUseInterimTilesOnError() {
    return (
      /** @type {boolean} */
      this.get(ee.USE_INTERIM_TILES_ON_ERROR)
    );
  }
  /**
   * Deprecated.  Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */
  setUseInterimTilesOnError(t) {
    this.set(ee.USE_INTERIM_TILES_ON_ERROR, t);
  }
  /**
   * Get data for a pixel location.  The return type depends on the source data.  For image tiles,
   * a four element RGBA array will be returned.  For data tiles, the array length will match the
   * number of bands in the dataset.  For requests outside the layer extent, `null` will be returned.
   * Data for a image tiles can only be retrieved if the source's `crossOrigin` property is set.
   *
   * ```js
   * // display layer data on every pointer move
   * map.on('pointermove', (event) => {
   *   console.log(layer.getData(event.pixel));
   * });
   * ```
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   * @api
   * @override
   */
  getData(t) {
    return super.getData(t);
  }
}
const vt = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
}, Qs = 5;
class Js extends Ut {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(t) {
    super(), this.ready = !0, this.boundHandleImageChange_ = this.handleImageChange_.bind(this), this.layer_ = t, this.staleKeys_ = new Array(), this.maxStaleKeys = Qs;
  }
  /**
   * @return {Array<string>} Get the list of stale keys.
   */
  getStaleKeys() {
    return this.staleKeys_;
  }
  /**
   * @param {string} key The new stale key.
   */
  prependStaleKey(t) {
    this.staleKeys_.unshift(t), this.staleKeys_.length > this.maxStaleKeys && (this.staleKeys_.length = this.maxStaleKeys);
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */
  getFeatures(t) {
    return G();
  }
  /**
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */
  getData(t) {
    return null;
  }
  /**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */
  prepareFrame(t) {
    return G();
  }
  /**
   * Render the layer.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   */
  renderFrame(t, e) {
    return G();
  }
  /**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(t, e, n, s, r) {
  }
  /**
   * @return {LayerType} Layer.
   */
  getLayer() {
    return this.layer_;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */
  handleFontsChanged() {
  }
  /**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */
  handleImageChange_(t) {
    const e = (
      /** @type {import("../Image.js").default} */
      t.target
    );
    (e.getState() === vt.LOADED || e.getState() === vt.ERROR) && this.renderIfReadyAndVisible();
  }
  /**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../Image.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */
  loadImage(t) {
    let e = t.getState();
    return e != vt.LOADED && e != vt.ERROR && t.addEventListener(st.CHANGE, this.boundHandleImageChange_), e == vt.IDLE && (t.load(), e = t.getState()), e == vt.LOADED;
  }
  /**
   * @protected
   */
  renderIfReadyAndVisible() {
    const t = this.getLayer();
    t && t.getVisible() && t.getSourceState() === "ready" && t.changed();
  }
  /**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  renderDeferred(t) {
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
class tr extends fe {
  /**
   * @param {import("./EventType.js").default} type Type.
   * @param {import("../transform.js").Transform} [inversePixelTransform] Transform for
   *     CSS pixels to rendered pixels.
   * @param {import("../Map.js").FrameState} [frameState] Frame state.
   * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [context] Context.
   */
  constructor(t, e, n, s) {
    super(t), this.inversePixelTransform = e, this.frameState = n, this.context = s;
  }
}
const pt = typeof navigator < "u" && typeof navigator.userAgent < "u" ? navigator.userAgent.toLowerCase() : "";
pt.includes("firefox");
const er = pt.includes("safari") && !pt.includes("chrom");
er && (pt.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(pt));
pt.includes("webkit") && pt.includes("edge");
pt.includes("macintosh");
const nr = typeof WorkerGlobalScope < "u" && typeof OffscreenCanvas < "u" && self instanceof WorkerGlobalScope, ir = typeof Image < "u" && Image.prototype.decode;
(function() {
  let i = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: function() {
        i = !0;
      }
    });
    window.addEventListener("_", null, t), window.removeEventListener("_", null, t);
  } catch {
  }
  return i;
})();
function rt(i, t, e, n) {
  let s;
  return e && e.length ? s = /** @type {HTMLCanvasElement} */
  e.shift() : nr ? s = new OffscreenCanvas(i || 300, t || 300) : s = document.createElement("canvas"), i && (s.width = i), t && (s.height = t), /** @type {CanvasRenderingContext2D} */
  s.getContext("2d", n);
}
let Ce;
function wn() {
  return Ce || (Ce = rt(1, 1)), Ce;
}
function kt(i) {
  const t = i.canvas;
  t.width = 1, t.height = 1, i.clearRect(0, 0, 1, 1);
}
class sr {
  constructor() {
    /**
     * @private
     * @param {...*} args Args.
     * @return {ZIndexContext} This.
     */
    sn(this, "pushMethodArgs_", (...t) => (this.instructions_[this.zIndex + this.offset_].push(t), this));
    this.instructions_ = [], this.zIndex = 0, this.offset_ = 0, this.context_ = /** @type {ZIndexContextProxy} */
    new Proxy(wn(), {
      get: (t, e) => {
        if (typeof /** @type {*} */
        wn()[e] == "function")
          return this.instructions_[this.zIndex + this.offset_] || (this.instructions_[this.zIndex + this.offset_] = []), this.instructions_[this.zIndex + this.offset_].push(e), this.pushMethodArgs_;
      },
      set: (t, e, n) => (this.instructions_[this.zIndex + this.offset_] || (this.instructions_[this.zIndex + this.offset_] = []), this.instructions_[this.zIndex + this.offset_].push(e, n), !0)
    });
  }
  /**
   * Push a function that renders to the context directly.
   * @param {function(CanvasRenderingContext2D): void} render Function.
   */
  pushFunction(t) {
    this.instructions_[this.zIndex + this.offset_].push(t);
  }
  /**
   * Get a proxy for CanvasRenderingContext2D which does not support getting state
   * (e.g. `context.globalAlpha`, which will return `undefined`). To set state, if it relies on a
   * previous state (e.g. `context.globalAlpha = context.globalAlpha / 2`), set a function,
   * e.g. `context.globalAlpha = (context) => context.globalAlpha / 2`.
   * @return {ZIndexContextProxy} Context.
   */
  getContext() {
    return this.context_;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   */
  draw(t) {
    this.instructions_.forEach((e) => {
      for (let n = 0, s = e.length; n < s; ++n) {
        const r = e[n];
        if (typeof r == "function") {
          r(t);
          continue;
        }
        const o = e[++n];
        if (typeof /** @type {*} */
        t[r] == "function")
          t[r](...o);
        else {
          if (typeof o == "function") {
            t[r] = o(t);
            continue;
          }
          t[r] = o;
        }
      }
    });
  }
  clear() {
    this.instructions_.length = 0, this.zIndex = 0, this.offset_ = 0;
  }
  /**
   * Offsets the zIndex by the highest current zIndex. Useful for rendering multiple worlds or tiles, to
   * avoid conflicting context.clip() or context.save()/restore() calls.
   */
  offset() {
    this.offset_ = this.instructions_.length, this.zIndex = 0;
  }
}
const ue = {
  name: "rgb",
  min: [0, 0, 0],
  max: [255, 255, 255],
  channel: ["red", "green", "blue"],
  alias: ["RGB"]
};
var k = {
  name: "xyz",
  min: [0, 0, 0],
  channel: ["X", "Y", "Z"],
  alias: ["XYZ", "ciexyz", "cie1931"]
};
k.whitepoint = {
  //1931 2°
  2: {
    //incadescent
    A: [109.85, 100, 35.585],
    // B:[],
    C: [98.074, 100, 118.232],
    D50: [96.422, 100, 82.521],
    D55: [95.682, 100, 92.149],
    //daylight
    D65: [95.045592705167, 100, 108.9057750759878],
    D75: [94.972, 100, 122.638],
    //flourescent
    // F1: [],
    F2: [99.187, 100, 67.395],
    // F3: [],
    // F4: [],
    // F5: [],
    // F6:[],
    F7: [95.044, 100, 108.755],
    // F8: [],
    // F9: [],
    // F10: [],
    F11: [100.966, 100, 64.37],
    // F12: [],
    E: [100, 100, 100]
  },
  //1964  10°
  10: {
    //incadescent
    A: [111.144, 100, 35.2],
    C: [97.285, 100, 116.145],
    D50: [96.72, 100, 81.427],
    D55: [95.799, 100, 90.926],
    //daylight
    D65: [94.811, 100, 107.304],
    D75: [94.416, 100, 120.641],
    //flourescent
    F2: [103.28, 100, 69.026],
    F7: [95.792, 100, 107.687],
    F11: [103.866, 100, 65.627],
    E: [100, 100, 100]
  }
};
k.max = k.whitepoint[2].D65;
k.rgb = function(i, t) {
  t = t || k.whitepoint[2].E;
  var e = i[0] / t[0], n = i[1] / t[1], s = i[2] / t[2], r, o, a;
  return r = e * 3.240969941904521 + n * -1.537383177570093 + s * -0.498610760293, o = e * -0.96924363628087 + n * 1.87596750150772 + s * 0.041555057407175, a = e * 0.055630079696993 + n * -0.20397695888897 + s * 1.056971514242878, r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r = r * 12.92, o = o > 31308e-7 ? 1.055 * Math.pow(o, 1 / 2.4) - 0.055 : o = o * 12.92, a = a > 31308e-7 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : a = a * 12.92, r = Math.min(Math.max(0, r), 1), o = Math.min(Math.max(0, o), 1), a = Math.min(Math.max(0, a), 1), [r * 255, o * 255, a * 255];
};
ue.xyz = function(i, t) {
  var e = i[0] / 255, n = i[1] / 255, s = i[2] / 255;
  e = e > 0.04045 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92, n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, s = s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92;
  var r = e * 0.41239079926595 + n * 0.35758433938387 + s * 0.18048078840183, o = e * 0.21263900587151 + n * 0.71516867876775 + s * 0.072192315360733, a = e * 0.019330818715591 + n * 0.11919477979462 + s * 0.95053215224966;
  return t = t || k.whitepoint[2].E, [r * t[0], o * t[1], a * t[2]];
};
const ei = {
  name: "luv",
  //NOTE: luv has no rigidly defined limits
  //easyrgb fails to get proper coords
  //boronine states no rigid limits
  //colorMine refers this ones:
  min: [0, -134, -140],
  max: [100, 224, 122],
  channel: ["lightness", "u", "v"],
  alias: ["LUV", "cieluv", "cie1976"],
  xyz: function(i, t, e) {
    var n, s, r, o, a, l, h, c, u, d, f, g, _;
    if (r = i[0], o = i[1], a = i[2], r === 0) return [0, 0, 0];
    var p = 0.0011070564598794539;
    return t = t || "D65", e = e || 2, u = k.whitepoint[e][t][0], d = k.whitepoint[e][t][1], f = k.whitepoint[e][t][2], g = 4 * u / (u + 15 * d + 3 * f), _ = 9 * d / (u + 15 * d + 3 * f), n = o / (13 * r) + g || 0, s = a / (13 * r) + _ || 0, h = r > 8 ? d * Math.pow((r + 16) / 116, 3) : d * r * p, l = h * 9 * n / (4 * s) || 0, c = h * (12 - 3 * n - 20 * s) / (4 * s) || 0, [l, h, c];
  }
};
k.luv = function(i, t, e) {
  var n, s, r, o, a, l, h, c, u, d, f, g, _, p = 0.008856451679035631, R = 903.2962962962961;
  t = t || "D65", e = e || 2, u = k.whitepoint[e][t][0], d = k.whitepoint[e][t][1], f = k.whitepoint[e][t][2], g = 4 * u / (u + 15 * d + 3 * f), _ = 9 * d / (u + 15 * d + 3 * f), l = i[0], h = i[1], c = i[2], n = 4 * l / (l + 15 * h + 3 * c) || 0, s = 9 * h / (l + 15 * h + 3 * c) || 0;
  var m = h / d;
  return r = m <= p ? R * m : 116 * Math.pow(m, 1 / 3) - 16, o = 13 * r * (n - g), a = 13 * r * (s - _), [r, o, a];
};
ei.lchuv = function(i) {
  var t = i[0], e = i[1], n = i[2], s = Math.sqrt(e * e + n * n), r = Math.atan2(n, e), o = r * 360 / 2 / Math.PI;
  return o < 0 && (o += 360), [t, s, o];
};
k.lchuv = function(i) {
  return ei.lchuv(k.luv(i));
};
const In = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
var vn = {
  red: 0,
  orange: 60,
  yellow: 120,
  green: 180,
  blue: 240,
  purple: 300
};
function rr(i) {
  var c, u;
  var t, e = [], n = 1, s;
  if (typeof i == "number")
    return { space: "rgb", values: [i >>> 16, (i & 65280) >>> 8, i & 255], alpha: 1 };
  if (typeof i == "number") return { space: "rgb", values: [i >>> 16, (i & 65280) >>> 8, i & 255], alpha: 1 };
  if (i = String(i).toLowerCase(), In[i])
    e = In[i].slice(), s = "rgb";
  else if (i === "transparent")
    n = 0, s = "rgb", e = [0, 0, 0];
  else if (i[0] === "#") {
    var r = i.slice(1), o = r.length, a = o <= 4;
    n = 1, a ? (e = [
      parseInt(r[0] + r[0], 16),
      parseInt(r[1] + r[1], 16),
      parseInt(r[2] + r[2], 16)
    ], o === 4 && (n = parseInt(r[3] + r[3], 16) / 255)) : (e = [
      parseInt(r[0] + r[1], 16),
      parseInt(r[2] + r[3], 16),
      parseInt(r[4] + r[5], 16)
    ], o === 8 && (n = parseInt(r[6] + r[7], 16) / 255)), e[0] || (e[0] = 0), e[1] || (e[1] = 0), e[2] || (e[2] = 0), s = "rgb";
  } else if (t = /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(i)) {
    var l = t[1];
    s = l.replace(/a$/, "");
    var h = s === "cmyk" ? 4 : s === "gray" ? 1 : 3;
    e = t[2].trim().split(/\s*[,\/]\s*|\s+/), s === "color" && (s = e.shift()), e = e.map(function(d, f) {
      if (d[d.length - 1] === "%")
        return d = parseFloat(d) / 100, f === 3 ? d : s === "rgb" ? d * 255 : s[0] === "h" || s[0] === "l" && !f ? d * 100 : s === "lab" ? d * 125 : s === "lch" ? f < 2 ? d * 150 : d * 360 : s[0] === "o" && !f ? d : s === "oklab" ? d * 0.4 : s === "oklch" ? f < 2 ? d * 0.4 : d * 360 : d;
      if (s[f] === "h" || f === 2 && s[s.length - 1] === "h") {
        if (vn[d] !== void 0) return vn[d];
        if (d.endsWith("deg")) return parseFloat(d);
        if (d.endsWith("turn")) return parseFloat(d) * 360;
        if (d.endsWith("grad")) return parseFloat(d) * 360 / 400;
        if (d.endsWith("rad")) return parseFloat(d) * 180 / Math.PI;
      }
      return d === "none" ? 0 : parseFloat(d);
    }), n = e.length > h ? e.pop() : 1;
  } else /[0-9](?:\s|\/|,)/.test(i) && (e = i.match(/([0-9]+)/g).map(function(d) {
    return parseFloat(d);
  }), s = ((u = (c = i.match(/([a-z])/ig)) == null ? void 0 : c.join("")) == null ? void 0 : u.toLowerCase()) || "rgb");
  return {
    space: s,
    values: e,
    alpha: n
  };
}
const Me = {
  name: "hsl",
  min: [0, 0, 0],
  max: [360, 100, 100],
  channel: ["hue", "saturation", "lightness"],
  alias: ["HSL"],
  rgb: function(i) {
    var t = i[0] / 360, e = i[1] / 100, n = i[2] / 100, s, r, o, a, l, h = 0;
    if (e === 0) return l = n * 255, [l, l, l];
    for (r = n < 0.5 ? n * (1 + e) : n + e - n * e, s = 2 * n - r, a = [0, 0, 0]; h < 3; )
      o = t + 1 / 3 * -(h - 1), o < 0 ? o++ : o > 1 && o--, l = 6 * o < 1 ? s + (r - s) * 6 * o : 2 * o < 1 ? r : 3 * o < 2 ? s + (r - s) * (2 / 3 - o) * 6 : s, a[h++] = l * 255;
    return a;
  }
};
ue.hsl = function(i) {
  var t = i[0] / 255, e = i[1] / 255, n = i[2] / 255, s = Math.min(t, e, n), r = Math.max(t, e, n), o = r - s, a, l, h;
  return r === s ? a = 0 : t === r ? a = (e - n) / o : e === r ? a = 2 + (n - t) / o : n === r && (a = 4 + (t - e) / o), a = Math.min(a * 60, 360), a < 0 && (a += 360), h = (s + r) / 2, r === s ? l = 0 : h <= 0.5 ? l = o / (r + s) : l = o / (2 - r - s), [a, l * 100, h * 100];
};
function or(i) {
  Array.isArray(i) && i.raw && (i = String.raw(...arguments)), i instanceof Number && (i = +i);
  var t, e = rr(i);
  if (!e.space) return [];
  const n = e.space[0] === "h" ? Me.min : ue.min, s = e.space[0] === "h" ? Me.max : ue.max;
  return t = Array(3), t[0] = Math.min(Math.max(e.values[0], n[0]), s[0]), t[1] = Math.min(Math.max(e.values[1], n[1]), s[1]), t[2] = Math.min(Math.max(e.values[2], n[2]), s[2]), e.space[0] === "h" && (t = Me.rgb(t)), t.push(Math.min(Math.max(e.alpha, 0), 1)), t;
}
const ar = 1024, Gt = {};
let we = 0;
function lr(i) {
  if (Gt.hasOwnProperty(i))
    return Gt[i];
  if (we >= ar) {
    let e = 0;
    for (const n in Gt)
      e++ & 3 || (delete Gt[n], --we);
  }
  const t = or(i);
  if (t.length !== 4)
    throw new Error('failed to parse "' + i + '" as color');
  for (const e of t)
    if (isNaN(e))
      throw new Error('failed to parse "' + i + '" as color');
  return hr(t), Gt[i] = t, ++we, t;
}
function Sn(i) {
  return Array.isArray(i) ? i : lr(i);
}
function hr(i) {
  return i[0] = j(i[0] + 0.5 | 0, 0, 255), i[1] = j(i[1] + 0.5 | 0, 0, 255), i[2] = j(i[2] + 0.5 | 0, 0, 255), i[3] = j(i[3], 0, 1), i;
}
let Ft = null;
function cr() {
  Ft = rt(1, 1, void 0, {
    willReadFrequently: !0
  });
}
class ur extends Js {
  /**
   * @param {LayerType} layer Layer.
   */
  constructor(t) {
    super(t), this.container = null, this.renderedResolution, this.tempTransform = se(), this.pixelTransform = se(), this.inversePixelTransform = se(), this.context = null, this.deferredContext_ = null, this.containerReused = !1, this.frameState = null;
  }
  /**
   * @param {import('../../DataTile.js').ImageLike} image Image.
   * @param {number} col The column index.
   * @param {number} row The row index.
   * @return {Uint8ClampedArray|null} The image data.
   */
  getImageData(t, e, n) {
    Ft || cr(), Ft.clearRect(0, 0, 1, 1);
    let s;
    try {
      Ft.drawImage(t, e, n, 1, 1, 0, 0, 1, 1), s = Ft.getImageData(0, 0, 1, 1).data;
    } catch {
      return Ft = null, null;
    }
    return s;
  }
  /**
   * @param {import('../../Map.js').FrameState} frameState Frame state.
   * @return {string} Background color.
   */
  getBackground(t) {
    let n = this.getLayer().getBackground();
    return typeof n == "function" && (n = n(t.viewState.resolution)), n || void 0;
  }
  /**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {string} [backgroundColor] Background color.
   */
  useContainer(t, e, n) {
    const s = this.getLayer().getClassName();
    let r, o;
    if (t && t.className === s && (!n || t && t.style.backgroundColor && bn(
      Sn(t.style.backgroundColor),
      Sn(n)
    ))) {
      const a = t.firstElementChild;
      a instanceof HTMLCanvasElement && (o = a.getContext("2d"));
    }
    if (o && o.canvas.style.transform === e ? (this.container = t, this.context = o, this.containerReused = !0) : this.containerReused ? (this.container = null, this.context = null, this.containerReused = !1) : this.container && (this.container.style.backgroundColor = null), !this.container) {
      r = document.createElement("div"), r.className = s;
      let a = r.style;
      a.position = "absolute", a.width = "100%", a.height = "100%", o = rt();
      const l = o.canvas;
      r.appendChild(l), a = l.style, a.position = "absolute", a.left = "0", a.transformOrigin = "top left", this.container = r, this.context = o;
    }
    !this.containerReused && n && !this.container.style.backgroundColor && (this.container.style.backgroundColor = n);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent Clip extent.
   * @protected
   */
  clipUnrotated(t, e, n) {
    const s = Mt(n), r = Re(n), o = pe(n), a = me(n);
    et(e.coordinateToPixelTransform, s), et(e.coordinateToPixelTransform, r), et(e.coordinateToPixelTransform, o), et(e.coordinateToPixelTransform, a);
    const l = this.inversePixelTransform;
    et(l, s), et(l, r), et(l, o), et(l, a), t.save(), t.beginPath(), t.moveTo(Math.round(s[0]), Math.round(s[1])), t.lineTo(Math.round(r[0]), Math.round(r[1])), t.lineTo(Math.round(o[0]), Math.round(o[1])), t.lineTo(Math.round(a[0]), Math.round(a[1])), t.clip();
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @protected
   */
  prepareContainer(t, e) {
    const n = t.extent, s = t.viewState.resolution, r = t.viewState.rotation, o = t.pixelRatio, a = Math.round(O(n) / s * o), l = Math.round(V(n) / s * o);
    he(
      this.pixelTransform,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / o,
      1 / o,
      r,
      -a / 2,
      -l / 2
    ), Ts(this.inversePixelTransform, this.pixelTransform);
    const h = Cs(this.pixelTransform);
    if (this.useContainer(e, h, this.getBackground(t)), !this.containerReused) {
      const c = this.context.canvas;
      c.width != a || c.height != l ? (c.width = a, c.height = l) : this.context.clearRect(0, 0, a, l), h !== c.style.transform && (c.style.transform = h);
    }
  }
  /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @private
   */
  dispatchRenderEvent_(t, e, n) {
    const s = this.getLayer();
    if (s.hasListener(t)) {
      const r = new tr(
        t,
        this.inversePixelTransform,
        n,
        e
      );
      s.dispatchEvent(r);
    }
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  preRender(t, e) {
    this.frameState = e, !e.declutter && this.dispatchRenderEvent_(jt.PRERENDER, t, e);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */
  postRender(t, e) {
    e.declutter || this.dispatchRenderEvent_(jt.POSTRENDER, t, e);
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeferredInternal(t) {
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import('../../render/canvas/ZIndexContext.js').ZIndexContextProxy} Context.
   */
  getRenderContext(t) {
    return t.declutter && !this.deferredContext_ && (this.deferredContext_ = new sr()), t.declutter ? this.deferredContext_.getContext() : this.context;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @override
   */
  renderDeferred(t) {
    t.declutter && (this.dispatchRenderEvent_(
      jt.PRERENDER,
      this.context,
      t
    ), t.declutter && this.deferredContext_ && (this.deferredContext_.draw(this.context), this.deferredContext_.clear()), this.renderDeferredInternal(t), this.dispatchRenderEvent_(
      jt.POSTRENDER,
      this.context,
      t
    ));
  }
  /**
   * Creates a transform for rendering to an element that will be rotated after rendering.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} width Width of the rendered element (in pixels).
   * @param {number} height Height of the rendered element (in pixels).
   * @param {number} offsetX Offset on the x-axis in view coordinates.
   * @protected
   * @return {!import("../../transform.js").Transform} Transform.
   */
  getRenderTransform(t, e, n, s, r, o, a) {
    const l = r / 2, h = o / 2, c = s / e, u = -c, d = -t[0] + a, f = -t[1];
    return he(
      this.tempTransform,
      l,
      h,
      c,
      u,
      -n,
      d,
      f
    );
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    delete this.frameState, super.disposeInternal();
  }
}
const T = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  /**
   * Indicates that tile loading failed
   * @type {number}
   */
  ERROR: 3,
  EMPTY: 4
};
class Be extends zn {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {Options} [options] Tile options.
   */
  constructor(t, e, n) {
    super(), n = n || {}, this.tileCoord = t, this.state = e, this.key = "", this.transition_ = n.transition === void 0 ? 250 : n.transition, this.transitionStarts_ = {}, this.interpolate = !!n.interpolate;
  }
  /**
   * @protected
   */
  changed() {
    this.dispatchEvent(st.CHANGE);
  }
  /**
   * Called by the tile cache when the tile is removed from the cache due to expiry
   */
  release() {
    this.state === T.ERROR && this.setState(T.EMPTY);
  }
  /**
   * @return {string} Key.
   */
  getKey() {
    return this.key + "/" + this.tileCoord;
  }
  /**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */
  getTileCoord() {
    return this.tileCoord;
  }
  /**
   * @return {import("./TileState.js").default} State.
   */
  getState() {
    return this.state;
  }
  /**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {import("./TileState.js").default} state State.
   * @api
   */
  setState(t) {
    if (this.state !== T.ERROR && this.state > t)
      throw new Error("Tile load sequence violation");
    this.state = t, this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */
  load() {
    G();
  }
  /**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */
  getAlpha(t, e) {
    if (!this.transition_)
      return 1;
    let n = this.transitionStarts_[t];
    if (!n)
      n = e, this.transitionStarts_[t] = n;
    else if (n === -1)
      return 1;
    const s = e - n + 1e3 / 60;
    return s >= this.transition_ ? 1 : Kn(s / this.transition_);
  }
  /**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */
  inTransition(t) {
    return this.transition_ ? this.transitionStarts_[t] !== -1 : !1;
  }
  /**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */
  endTransition(t) {
    this.transition_ && (this.transitionStarts_[t] = -1);
  }
}
function de(i) {
  return i instanceof Image || i instanceof HTMLCanvasElement || i instanceof HTMLVideoElement || i instanceof ImageBitmap ? i : null;
}
function dr(i) {
  return i instanceof Uint8Array || i instanceof Uint8ClampedArray || i instanceof Float32Array || i instanceof DataView ? i : null;
}
const gr = new Error("disposed");
let St = null;
function fr(i) {
  St || (St = rt(
    i.width,
    i.height,
    void 0,
    { willReadFrequently: !0 }
  ));
  const t = St.canvas, e = i.width;
  t.width !== e && (t.width = e);
  const n = i.height;
  return t.height !== n && (t.height = n), St.clearRect(0, 0, e, n), St.drawImage(i, 0, 0), St.getImageData(0, 0, e, n).data;
}
const _r = [256, 256];
class be extends Be {
  /**
   * @param {Options} options Tile options.
   */
  constructor(t) {
    const e = T.IDLE;
    super(t.tileCoord, e, {
      transition: t.transition,
      interpolate: t.interpolate
    }), this.loader_ = t.loader, this.data_ = null, this.error_ = null, this.size_ = t.size || null, this.controller_ = t.controller || null;
  }
  /**
   * Get the tile size.
   * @return {import('./size.js').Size} Tile size.
   */
  getSize() {
    if (this.size_)
      return this.size_;
    const t = de(this.data_);
    return t ? [t.width, t.height] : _r;
  }
  /**
   * Get the data for the tile.
   * @return {Data} Tile data.
   * @api
   */
  getData() {
    return this.data_;
  }
  /**
   * Get any loading error.
   * @return {Error} Loading error.
   * @api
   */
  getError() {
    return this.error_;
  }
  /**
   * Load the tile data.
   * @api
   * @override
   */
  load() {
    if (this.state !== T.IDLE && this.state !== T.ERROR)
      return;
    this.state = T.LOADING, this.changed();
    const t = this;
    this.loader_().then(function(e) {
      t.data_ = e, t.state = T.LOADED, t.changed();
    }).catch(function(e) {
      t.error_ = e, t.state = T.ERROR, t.changed();
    });
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.controller_ && (this.controller_.abort(gr), this.controller_ = null), super.disposeInternal();
  }
}
function mr(i, t, e) {
  const n = (
    /** @type {HTMLImageElement} */
    i
  );
  let s = !0, r = !1, o = !1;
  const a = [
    re(n, st.LOAD, function() {
      o = !0, r || t();
    })
  ];
  return n.src && ir ? (r = !0, n.decode().then(function() {
    s && t();
  }).catch(function(l) {
    s && (o ? t() : e());
  })) : a.push(re(n, st.ERROR, e)), function() {
    s = !1, a.forEach(it);
  };
}
class ni extends Be {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [options] Tile options.
   */
  constructor(t, e, n, s, r, o) {
    super(t, e, o), this.crossOrigin_ = s, this.src_ = n, this.key = n, this.image_ = new Image(), s !== null && (this.image_.crossOrigin = s), this.unlisten_ = null, this.tileLoadFunction_ = r;
  }
  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
   * @param {HTMLCanvasElement|HTMLImageElement} element Element.
   */
  setImage(t) {
    this.image_ = t, this.state = T.LOADED, this.unlistenImage_(), this.changed();
  }
  /**
   * Tracks loading or read errors.
   *
   * @private
   */
  handleImageError_() {
    this.state = T.ERROR, this.unlistenImage_(), this.image_ = pr(), this.changed();
  }
  /**
   * Tracks successful image load.
   *
   * @private
   */
  handleImageLoad_() {
    const t = (
      /** @type {HTMLImageElement} */
      this.image_
    );
    t.naturalWidth && t.naturalHeight ? this.state = T.LOADED : this.state = T.EMPTY, this.unlistenImage_(), this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   *
   * To retry loading tiles on failed requests, use a custom `tileLoadFunction`
   * that checks for error status codes and reloads only when the status code is
   * 408, 429, 500, 502, 503 and 504, and only when not too many retries have been
   * made already:
   *
   * ```js
   * const retryCodes = [408, 429, 500, 502, 503, 504];
   * const retries = {};
   * source.setTileLoadFunction((tile, src) => {
   *   const image = tile.getImage();
   *   fetch(src)
   *     .then((response) => {
   *       if (retryCodes.includes(response.status)) {
   *         retries[src] = (retries[src] || 0) + 1;
   *         if (retries[src] <= 3) {
   *           setTimeout(() => tile.load(), retries[src] * 1000);
   *         }
   *         return Promise.reject();
   *       }
   *       return response.blob();
   *     })
   *     .then((blob) => {
   *       const imageUrl = URL.createObjectURL(blob);
   *       image.src = imageUrl;
   *       setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
   *     })
   *     .catch(() => tile.setState(3)); // error
   * });
   * ```
   * @api
   * @override
   */
  load() {
    this.state == T.ERROR && (this.state = T.IDLE, this.image_ = new Image(), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)), this.state == T.IDLE && (this.state = T.LOADING, this.changed(), this.tileLoadFunction_(this, this.src_), this.unlisten_ = mr(
      this.image_,
      this.handleImageLoad_.bind(this),
      this.handleImageError_.bind(this)
    ));
  }
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), this.unlisten_ = null);
  }
}
function pr() {
  const i = rt(1, 1);
  return i.fillStyle = "rgba(0,0,0,0)", i.fillRect(0, 0, 1, 1), i.canvas;
}
class ii {
  /**
   * @param {number} [highWaterMark] High water mark.
   */
  constructor(t) {
    this.highWaterMark = t !== void 0 ? t : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  /**
   * Expire the cache.
   * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
   */
  expireCache(t) {
    for (; this.canExpireCache(); )
      this.pop();
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null;
  }
  /**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */
  containsKey(t) {
    return this.entries_.hasOwnProperty(t);
  }
  /**
   * @param {function(T, string, LRUCache<T>): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   */
  forEach(t) {
    let e = this.oldest_;
    for (; e; )
      t(e.value_, e.key_, this), e = e.newer;
  }
  /**
   * @param {string} key Key.
   * @param {*} [options] Options (reserved for subclasses).
   * @return {T} Value.
   */
  get(t, e) {
    const n = this.entries_[t];
    return N(
      n !== void 0,
      "Tried to get a value for a key that does not exist in the cache"
    ), n === this.newest_ || (n === this.oldest_ ? (this.oldest_ = /** @type {Entry} */
    this.oldest_.newer, this.oldest_.older = null) : (n.newer.older = n.older, n.older.newer = n.newer), n.newer = null, n.older = this.newest_, this.newest_.newer = n, this.newest_ = n), n.value_;
  }
  /**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */
  remove(t) {
    const e = this.entries_[t];
    return N(
      e !== void 0,
      "Tried to get a value for a key that does not exist in the cache"
    ), e === this.newest_ ? (this.newest_ = /** @type {Entry} */
    e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = /** @type {Entry} */
    e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_;
  }
  /**
   * @return {number} Count.
   */
  getCount() {
    return this.count_;
  }
  /**
   * @return {Array<string>} Keys.
   */
  getKeys() {
    const t = new Array(this.count_);
    let e = 0, n;
    for (n = this.newest_; n; n = n.older)
      t[e++] = n.key_;
    return t;
  }
  /**
   * @return {Array<T>} Values.
   */
  getValues() {
    const t = new Array(this.count_);
    let e = 0, n;
    for (n = this.newest_; n; n = n.older)
      t[e++] = n.value_;
    return t;
  }
  /**
   * @return {T} Last value.
   */
  peekLast() {
    return this.oldest_.value_;
  }
  /**
   * @return {string} Last key.
   */
  peekLastKey() {
    return this.oldest_.key_;
  }
  /**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */
  peekFirstKey() {
    return this.newest_.key_;
  }
  /**
   * Return an entry without updating least recently used time.
   * @param {string} key Key.
   * @return {T|undefined} Value.
   */
  peek(t) {
    var e;
    return (e = this.entries_[t]) == null ? void 0 : e.value_;
  }
  /**
   * @return {T} value Value.
   */
  pop() {
    const t = this.oldest_;
    return delete this.entries_[t.key_], t.newer && (t.newer.older = null), this.oldest_ = /** @type {Entry} */
    t.newer, this.oldest_ || (this.newest_ = null), --this.count_, t.value_;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  replace(t, e) {
    this.get(t), this.entries_[t].value_ = e;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  set(t, e) {
    N(
      !(t in this.entries_),
      "Tried to set a value for a key that is used already"
    );
    const n = {
      key_: t,
      newer: null,
      older: this.newest_,
      value_: e
    };
    this.newest_ ? this.newest_.newer = n : this.oldest_ = n, this.newest_ = n, this.entries_[t] = n, ++this.count_;
  }
  /**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */
  setSize(t) {
    this.highWaterMark = t;
  }
}
const si = 0.5, Rr = 10, Pn = 0.25;
class ri {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
   * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
   * @param {number} errorThreshold Acceptable error (in source units).
   * @param {?number} destinationResolution The (optional) resolution of the destination.
   */
  constructor(t, e, n, s, r, o) {
    this.sourceProj_ = t, this.targetProj_ = e;
    let a = {};
    const l = le(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(m) {
      const E = m[0] + "/" + m[1];
      return a[E] || (a[E] = l(m)), a[E];
    }, this.maxSourceExtent_ = s, this.errorThresholdSquared_ = r * r, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!s && !!this.sourceProj_.getExtent() && O(s) >= O(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? O(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? O(this.targetProj_.getExtent()) : null;
    const h = Mt(n), c = Re(n), u = pe(n), d = me(n), f = this.transformInv_(h), g = this.transformInv_(c), _ = this.transformInv_(u), p = this.transformInv_(d), R = Rr + (o ? Math.max(
      0,
      Math.ceil(
        Math.log2(
          Zt(n) / (o * o * 256 * 256)
        )
      )
    ) : 0);
    if (this.addQuad_(
      h,
      c,
      u,
      d,
      f,
      g,
      _,
      p,
      R
    ), this.wrapsXInSource_) {
      let m = 1 / 0;
      this.triangles_.forEach(function(E, x, y) {
        m = Math.min(
          m,
          E.source[0][0],
          E.source[1][0],
          E.source[2][0]
        );
      }), this.triangles_.forEach((E) => {
        if (Math.max(
          E.source[0][0],
          E.source[1][0],
          E.source[2][0]
        ) - m > this.sourceWorldWidth_ / 2) {
          const x = [
            [E.source[0][0], E.source[0][1]],
            [E.source[1][0], E.source[1][1]],
            [E.source[2][0], E.source[2][1]]
          ];
          x[0][0] - m > this.sourceWorldWidth_ / 2 && (x[0][0] -= this.sourceWorldWidth_), x[1][0] - m > this.sourceWorldWidth_ / 2 && (x[1][0] -= this.sourceWorldWidth_), x[2][0] - m > this.sourceWorldWidth_ / 2 && (x[2][0] -= this.sourceWorldWidth_);
          const y = Math.min(
            x[0][0],
            x[1][0],
            x[2][0]
          );
          Math.max(
            x[0][0],
            x[1][0],
            x[2][0]
          ) - y < this.sourceWorldWidth_ / 2 && (E.source = x);
        }
      });
    }
    a = {};
  }
  /**
   * Adds triangle to the triangulation.
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @private
   */
  addTriangle_(t, e, n, s, r, o) {
    this.triangles_.push({
      source: [s, r, o],
      target: [t, e, n]
    });
  }
  /**
   * Adds quad (points in clock-wise order) to the triangulation
   * (and reprojects the vertices) if valid.
   * Performs quad subdivision if needed to increase precision.
   *
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
   * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
   * @private
   */
  addQuad_(t, e, n, s, r, o, a, l, h) {
    const c = hn([r, o, a, l]), u = this.sourceWorldWidth_ ? O(c) / this.sourceWorldWidth_ : null, d = (
      /** @type {number} */
      this.sourceWorldWidth_
    ), f = this.sourceProj_.canWrapX() && u > 0.5 && u < 1;
    let g = !1;
    if (h > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const p = hn([t, e, n, s]);
        g = O(p) / this.targetWorldWidth_ > Pn || g;
      }
      !f && this.sourceProj_.isGlobal() && u && (g = u > Pn || g);
    }
    if (!g && this.maxSourceExtent_ && isFinite(c[0]) && isFinite(c[1]) && isFinite(c[2]) && isFinite(c[3]) && !Vt(c, this.maxSourceExtent_))
      return;
    let _ = 0;
    if (!g && (!isFinite(r[0]) || !isFinite(r[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(a[0]) || !isFinite(a[1]) || !isFinite(l[0]) || !isFinite(l[1]))) {
      if (h > 0)
        g = !0;
      else if (_ = (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) + (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) + (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) + (!isFinite(l[0]) || !isFinite(l[1]) ? 1 : 0), _ != 1 && _ != 2 && _ != 4 && _ != 8)
        return;
    }
    if (h > 0) {
      if (!g) {
        const p = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2], R = this.transformInv_(p);
        let m;
        f ? m = (bt(r[0], d) + bt(a[0], d)) / 2 - bt(R[0], d) : m = (r[0] + a[0]) / 2 - R[0];
        const E = (r[1] + a[1]) / 2 - R[1];
        g = m * m + E * E > this.errorThresholdSquared_;
      }
      if (g) {
        if (Math.abs(t[0] - n[0]) <= Math.abs(t[1] - n[1])) {
          const p = [(e[0] + n[0]) / 2, (e[1] + n[1]) / 2], R = this.transformInv_(p), m = [(s[0] + t[0]) / 2, (s[1] + t[1]) / 2], E = this.transformInv_(m);
          this.addQuad_(
            t,
            e,
            p,
            m,
            r,
            o,
            R,
            E,
            h - 1
          ), this.addQuad_(
            m,
            p,
            n,
            s,
            E,
            R,
            a,
            l,
            h - 1
          );
        } else {
          const p = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], R = this.transformInv_(p), m = [(n[0] + s[0]) / 2, (n[1] + s[1]) / 2], E = this.transformInv_(m);
          this.addQuad_(
            t,
            p,
            m,
            s,
            r,
            R,
            E,
            l,
            h - 1
          ), this.addQuad_(
            p,
            e,
            n,
            m,
            R,
            o,
            a,
            E,
            h - 1
          );
        }
        return;
      }
    }
    if (f) {
      if (!this.canWrapXInSource_)
        return;
      this.wrapsXInSource_ = !0;
    }
    _ & 11 || this.addTriangle_(t, n, s, r, a, l), _ & 14 || this.addTriangle_(t, n, e, r, a, o), _ && (_ & 13 || this.addTriangle_(e, s, t, o, l, r), _ & 7 || this.addTriangle_(e, s, n, o, l, a));
  }
  /**
   * Calculates extent of the `source` coordinates from all the triangles.
   *
   * @return {import("../extent.js").Extent} Calculated extent.
   */
  calculateSourceExtent() {
    const t = Ct();
    return this.triangles_.forEach(function(e, n, s) {
      const r = e.source;
      ie(t, r[0]), ie(t, r[1]), ie(t, r[2]);
    }), t;
  }
  /**
   * @return {Array<Triangle>} Array of the calculated triangles.
   */
  getTriangles() {
    return this.triangles_;
  }
}
let Ie;
const at = [];
function An(i, t, e, n, s) {
  i.beginPath(), i.moveTo(0, 0), i.lineTo(t, e), i.lineTo(n, s), i.closePath(), i.save(), i.clip(), i.fillRect(0, 0, Math.max(t, n) + 1, Math.max(e, s)), i.restore();
}
function ve(i, t) {
  return Math.abs(i[t * 4] - 210) > 2 || Math.abs(i[t * 4 + 3] - 0.75 * 255) > 2;
}
function yr() {
  if (Ie === void 0) {
    const i = rt(6, 6, at);
    i.globalCompositeOperation = "lighter", i.fillStyle = "rgba(210, 0, 0, 0.75)", An(i, 4, 5, 4, 0), An(i, 4, 5, 0, 5);
    const t = i.getImageData(0, 0, 3, 3).data;
    Ie = ve(t, 0) || ve(t, 4) || ve(t, 8), kt(i), at.push(i.canvas);
  }
  return Ie;
}
function Fn(i, t, e, n) {
  const s = cs(e, t, i);
  let r = dn(
    t,
    n,
    e
  );
  const o = t.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const a = i.getMetersPerUnit();
  a !== void 0 && (r /= a);
  const l = i.getExtent();
  if (!l || je(l, s)) {
    const h = dn(i, r, s) / r;
    isFinite(h) && h > 0 && (r /= h);
  }
  return r;
}
function oi(i, t, e, n) {
  const s = zt(e);
  let r = Fn(
    i,
    t,
    s,
    n
  );
  return (!isFinite(r) || r <= 0) && Yn(e, function(o) {
    return r = Fn(
      i,
      t,
      o,
      n
    ), isFinite(r) && r > 0;
  }), r;
}
function ai(i, t, e, n, s, r, o, a, l, h, c, u, d, f) {
  const g = rt(
    Math.round(e * i),
    Math.round(e * t),
    at
  );
  if (u || (g.imageSmoothingEnabled = !1), l.length === 0)
    return g.canvas;
  g.scale(e, e);
  function _(y) {
    return Math.round(y * e) / e;
  }
  g.globalCompositeOperation = "lighter";
  const p = Ct();
  l.forEach(function(y, S, I) {
    Hi(p, y.extent);
  });
  let R;
  const m = e / n, E = (u ? 1 : 1 + Math.pow(2, -24)) / m;
  if (!d || l.length !== 1 || h !== 0) {
    if (R = rt(
      Math.round(O(p) * m),
      Math.round(V(p) * m),
      at
    ), u || (R.imageSmoothingEnabled = !1), s && f) {
      const y = (s[0] - p[0]) * m, S = -(s[3] - p[3]) * m, I = O(s) * m, C = V(s) * m;
      R.rect(y, S, I, C), R.clip();
    }
    l.forEach(function(y, S, I) {
      if (y.image.width > 0 && y.image.height > 0) {
        if (y.clipExtent) {
          R.save();
          const F = (y.clipExtent[0] - p[0]) * m, A = -(y.clipExtent[3] - p[3]) * m, M = O(y.clipExtent) * m, D = V(y.clipExtent) * m;
          R.rect(
            u ? F : Math.round(F),
            u ? A : Math.round(A),
            u ? M : Math.round(F + M) - Math.round(F),
            u ? D : Math.round(A + D) - Math.round(A)
          ), R.clip();
        }
        const C = (y.extent[0] - p[0]) * m, P = -(y.extent[3] - p[3]) * m, L = O(y.extent) * m, b = V(y.extent) * m;
        R.drawImage(
          y.image,
          h,
          h,
          y.image.width - 2 * h,
          y.image.height - 2 * h,
          u ? C : Math.round(C),
          u ? P : Math.round(P),
          u ? L : Math.round(C + L) - Math.round(C),
          u ? b : Math.round(P + b) - Math.round(P)
        ), y.clipExtent && R.restore();
      }
    });
  }
  const x = Mt(o);
  return a.getTriangles().forEach(function(y, S, I) {
    const C = y.source, P = y.target;
    let L = C[0][0], b = C[0][1], F = C[1][0], A = C[1][1], M = C[2][0], D = C[2][1];
    const v = _((P[0][0] - x[0]) / r), U = _(
      -(P[0][1] - x[1]) / r
    ), B = _((P[1][0] - x[0]) / r), q = _(
      -(P[1][1] - x[1]) / r
    ), z = _((P[2][0] - x[0]) / r), X = _(
      -(P[2][1] - x[1]) / r
    ), Y = L, lt = b;
    L = 0, b = 0, F -= Y, A -= lt, M -= Y, D -= lt;
    const Rt = [
      [F, A, 0, 0, B - v],
      [M, D, 0, 0, z - v],
      [0, 0, F, A, q - U],
      [0, 0, M, D, X - U]
    ], tt = Fi(Rt);
    if (!tt)
      return;
    if (g.save(), g.beginPath(), yr() || !u) {
      g.moveTo(B, q);
      const K = 4, ht = v - B, yt = U - q;
      for (let ot = 0; ot < K; ot++)
        g.lineTo(
          B + _((ot + 1) * ht / K),
          q + _(ot * yt / (K - 1))
        ), ot != K - 1 && g.lineTo(
          B + _((ot + 1) * ht / K),
          q + _((ot + 1) * yt / (K - 1))
        );
      g.lineTo(z, X);
    } else
      g.moveTo(B, q), g.lineTo(v, U), g.lineTo(z, X);
    g.clip(), g.transform(
      tt[0],
      tt[2],
      tt[1],
      tt[3],
      v,
      U
    ), g.translate(
      p[0] - Y,
      p[3] - lt
    );
    let W;
    if (R)
      W = R.canvas, g.scale(E, -E);
    else {
      const K = l[0], ht = K.extent;
      W = K.image, g.scale(
        O(ht) / W.width,
        -V(ht) / W.height
      );
    }
    g.drawImage(W, 0, 0), g.restore();
  }), R && (kt(R), at.push(R.canvas)), c && (g.save(), g.globalCompositeOperation = "source-over", g.strokeStyle = "black", g.lineWidth = 1, a.getTriangles().forEach(function(y, S, I) {
    const C = y.target, P = (C[0][0] - x[0]) / r, L = -(C[0][1] - x[1]) / r, b = (C[1][0] - x[0]) / r, F = -(C[1][1] - x[1]) / r, A = (C[2][0] - x[0]) / r, M = -(C[2][1] - x[1]) / r;
    g.beginPath(), g.moveTo(b, F), g.lineTo(P, L), g.lineTo(A, M), g.closePath(), g.stroke();
  }), g.restore()), g.canvas;
}
class Er extends be {
  /**
   * @param {Options} options Tile options.
   */
  constructor(t) {
    super({
      tileCoord: t.tileCoord,
      loader: () => Promise.resolve(new Uint8ClampedArray(4)),
      interpolate: t.interpolate,
      transition: t.transition
    }), this.pixelRatio_ = t.pixelRatio, this.gutter_ = t.gutter, this.reprojData_ = null, this.reprojError_ = null, this.reprojSize_ = void 0, this.sourceTileGrid_ = t.sourceTileGrid, this.targetTileGrid_ = t.targetTileGrid, this.wrappedTileCoord_ = t.wrappedTileCoord || t.tileCoord, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0;
    const e = t.sourceProj, n = e.getExtent(), s = t.sourceTileGrid.getExtent();
    this.clipExtent_ = e.canWrapX() ? s ? nt(n, s) : n : s;
    const r = this.targetTileGrid_.getTileCoordExtent(
      this.wrappedTileCoord_
    ), o = this.targetTileGrid_.getExtent();
    let a = this.sourceTileGrid_.getExtent();
    const l = o ? nt(r, o) : r;
    if (Zt(l) === 0) {
      this.state = T.EMPTY;
      return;
    }
    n && (a ? a = nt(a, n) : a = n);
    const h = this.targetTileGrid_.getResolution(
      this.wrappedTileCoord_[0]
    ), c = t.targetProj, u = oi(
      e,
      c,
      l,
      h
    );
    if (!isFinite(u) || u <= 0) {
      this.state = T.EMPTY;
      return;
    }
    const d = t.errorThreshold !== void 0 ? t.errorThreshold : si;
    if (this.triangulation_ = new ri(
      e,
      c,
      l,
      a,
      u * d,
      h
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = T.EMPTY;
      return;
    }
    this.sourceZ_ = this.sourceTileGrid_.getZForResolution(u);
    let f = this.triangulation_.calculateSourceExtent();
    if (a && (e.canWrapX() ? (f[1] = j(
      f[1],
      a[1],
      a[3]
    ), f[3] = j(
      f[3],
      a[1],
      a[3]
    )) : f = nt(f, a)), !Zt(f))
      this.state = T.EMPTY;
    else {
      let g = 0, _ = 0;
      e.canWrapX() && (g = O(n), _ = Math.floor(
        (f[0] - n[0]) / g
      )), kn(
        f.slice(),
        e,
        !0
      ).forEach((R) => {
        const m = this.sourceTileGrid_.getTileRangeForExtentAndZ(
          R,
          this.sourceZ_
        ), E = t.getTileFunction;
        for (let x = m.minX; x <= m.maxX; x++)
          for (let y = m.minY; y <= m.maxY; y++) {
            const S = E(this.sourceZ_, x, y, this.pixelRatio_);
            if (S) {
              const I = _ * g;
              this.sourceTiles_.push({ tile: S, offset: I });
            }
          }
        ++_;
      }), this.sourceTiles_.length === 0 && (this.state = T.EMPTY);
    }
  }
  /**
   * Get the tile size.
   * @return {import('../size.js').Size} Tile size.
   * @override
   */
  getSize() {
    return this.reprojSize_;
  }
  /**
   * Get the data for the tile.
   * @return {import("../DataTile.js").Data} Tile data.
   * @override
   */
  getData() {
    return this.reprojData_;
  }
  /**
   * Get any loading error.
   * @return {Error} Loading error.
   * @override
   */
  getError() {
    return this.reprojError_;
  }
  /**
   * @private
   */
  reproject_() {
    const t = [];
    let e = !1;
    if (this.sourceTiles_.forEach((g) => {
      var U;
      const _ = g.tile;
      if (!_ || _.getState() !== T.LOADED)
        return;
      const p = _.getSize(), R = this.gutter_;
      let m;
      const E = dr(_.getData());
      E ? m = E : (e = !0, m = fr(de(_.getData())));
      const x = [p[0] + 2 * R, p[1] + 2 * R], y = m instanceof Float32Array, S = x[0] * x[1], I = y ? Float32Array : Uint8ClampedArray, C = new I(m.buffer), P = I.BYTES_PER_ELEMENT, L = P * C.length / S, b = C.byteLength / x[1], F = Math.floor(
        b / P / x[0]
      ), A = S * F;
      let M = C;
      if (C.length !== A) {
        M = new I(A);
        let B = 0, q = 0;
        const z = x[0] * F;
        for (let X = 0; X < x[1]; ++X) {
          for (let Y = 0; Y < z; ++Y)
            M[B++] = C[q + Y];
          q += b / P;
        }
      }
      const D = this.sourceTileGrid_.getTileCoordExtent(_.tileCoord);
      D[0] += g.offset, D[2] += g.offset;
      const v = (U = this.clipExtent_) == null ? void 0 : U.slice();
      v && (v[0] += g.offset, v[2] += g.offset), t.push({
        extent: D,
        clipExtent: v,
        data: new Uint8ClampedArray(M.buffer),
        dataType: I,
        bytesPerPixel: L,
        pixelSize: x
      });
    }), this.sourceTiles_.length = 0, t.length === 0) {
      this.state = T.ERROR, this.changed();
      return;
    }
    const n = this.wrappedTileCoord_[0], s = this.targetTileGrid_.getTileSize(n), r = typeof s == "number" ? s : s[0], o = typeof s == "number" ? s : s[1], a = this.targetTileGrid_.getResolution(n), l = this.sourceTileGrid_.getResolution(this.sourceZ_), h = this.targetTileGrid_.getTileCoordExtent(
      this.wrappedTileCoord_
    );
    let c, u;
    const d = t[0].bytesPerPixel, f = Math.ceil(d / 3);
    for (let g = f - 1; g >= 0; --g) {
      const _ = [];
      for (let y = 0, S = t.length; y < S; ++y) {
        const I = t[y], C = I.data, P = I.pixelSize, L = P[0], b = P[1], F = rt(L, b, at), A = F.createImageData(L, b), M = A.data;
        let D = g * 3;
        for (let v = 0, U = M.length; v < U; v += 4)
          M[v] = C[D], M[v + 1] = C[D + 1], M[v + 2] = C[D + 2], M[v + 3] = 255, D += d;
        F.putImageData(A, 0, 0), _.push({
          extent: I.extent,
          clipExtent: I.clipExtent,
          image: F.canvas
        });
      }
      const p = ai(
        r,
        o,
        this.pixelRatio_,
        l,
        this.sourceTileGrid_.getExtent(),
        a,
        h,
        this.triangulation_,
        _,
        this.gutter_,
        !1,
        !1,
        !1
      );
      for (let y = 0, S = _.length; y < S; ++y) {
        const C = _[y].image.getContext("2d");
        kt(C), at.push(C.canvas);
      }
      const R = p.getContext("2d"), m = R.getImageData(0, 0, p.width, p.height);
      kt(R), at.push(p), c || (u = new Uint8ClampedArray(
        d * m.width * m.height
      ), c = new t[0].dataType(u.buffer));
      const E = m.data;
      let x = g * 3;
      for (let y = 0, S = E.length; y < S; y += 4)
        E[y + 3] === 255 ? (u[x] = E[y], u[x + 1] = E[y + 1], u[x + 2] = E[y + 2]) : (u[x] = 0, u[x + 1] = 0, u[x + 2] = 0), x += d;
    }
    if (e) {
      const g = rt(r, o), _ = new ImageData(c, r);
      g.putImageData(_, 0, 0), this.reprojData_ = g.canvas;
    } else
      this.reprojData_ = c;
    this.reprojSize_ = [
      Math.round(r * this.pixelRatio_),
      Math.round(o * this.pixelRatio_)
    ], this.state = T.LOADED, this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state !== T.IDLE && this.state !== T.ERROR)
      return;
    this.state = T.LOADING, this.changed();
    let t = 0;
    this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(({ tile: e }) => {
      const n = e.getState();
      if (n !== T.IDLE && n !== T.LOADING)
        return;
      t++;
      const s = mt(e, st.CHANGE, () => {
        const r = e.getState();
        (r == T.LOADED || r == T.ERROR || r == T.EMPTY) && (it(s), t--, t === 0 && (this.unlistenSources_(), this.reproject_()));
      });
      this.sourcesListenerKeys_.push(s);
    }), t === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function({ tile: e }) {
      e.getState() == T.IDLE && e.load();
    });
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(it), this.sourcesListenerKeys_ = null;
  }
}
class li extends Be {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
   * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} gutter Gutter of the source tiles.
   * @param {FunctionType} getTileFunction
   *     Function returning source tiles (z, x, y, pixelRatio).
   * @param {number} [errorThreshold] Acceptable reprojection error (in px).
   * @param {boolean} [renderEdges] Render reprojection edges.
   * @param {import("../Tile.js").Options} [options] Tile options.
   */
  constructor(t, e, n, s, r, o, a, l, h, c, u, d) {
    super(r, T.IDLE, d), this.renderEdges_ = u !== void 0 ? u : !1, this.pixelRatio_ = a, this.gutter_ = l, this.canvas_ = null, this.sourceTileGrid_ = e, this.targetTileGrid_ = s, this.wrappedTileCoord_ = o || r, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0, this.clipExtent_ = t.canWrapX() ? t.getExtent() : void 0;
    const f = s.getTileCoordExtent(
      this.wrappedTileCoord_
    ), g = this.targetTileGrid_.getExtent();
    let _ = this.sourceTileGrid_.getExtent();
    const p = g ? nt(f, g) : f;
    if (Zt(p) === 0) {
      this.state = T.EMPTY;
      return;
    }
    const R = t.getExtent();
    R && (_ ? _ = nt(_, R) : _ = R);
    const m = s.getResolution(
      this.wrappedTileCoord_[0]
    ), E = oi(
      t,
      n,
      p,
      m
    );
    if (!isFinite(E) || E <= 0) {
      this.state = T.EMPTY;
      return;
    }
    const x = c !== void 0 ? c : si;
    if (this.triangulation_ = new ri(
      t,
      n,
      p,
      _,
      E * x,
      m
    ), this.triangulation_.getTriangles().length === 0) {
      this.state = T.EMPTY;
      return;
    }
    this.sourceZ_ = e.getZForResolution(E);
    let y = this.triangulation_.calculateSourceExtent();
    if (_ && (t.canWrapX() ? (y[1] = j(
      y[1],
      _[1],
      _[3]
    ), y[3] = j(
      y[3],
      _[1],
      _[3]
    )) : y = nt(y, _)), !Zt(y))
      this.state = T.EMPTY;
    else {
      let S = 0, I = 0;
      t.canWrapX() && (S = O(R), I = Math.floor(
        (y[0] - R[0]) / S
      )), kn(
        y.slice(),
        t,
        !0
      ).forEach((P) => {
        const L = e.getTileRangeForExtentAndZ(
          P,
          this.sourceZ_
        );
        for (let b = L.minX; b <= L.maxX; b++)
          for (let F = L.minY; F <= L.maxY; F++) {
            const A = h(this.sourceZ_, b, F, a);
            if (A) {
              const M = I * S;
              this.sourceTiles_.push({ tile: A, offset: M });
            }
          }
        ++I;
      }), this.sourceTiles_.length === 0 && (this.state = T.EMPTY);
    }
  }
  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */
  getImage() {
    return this.canvas_;
  }
  /**
   * @private
   */
  reproject_() {
    const t = [];
    if (this.sourceTiles_.forEach((e) => {
      var s;
      const n = e.tile;
      if (n && n.getState() == T.LOADED) {
        const r = this.sourceTileGrid_.getTileCoordExtent(n.tileCoord);
        r[0] += e.offset, r[2] += e.offset;
        const o = (s = this.clipExtent_) == null ? void 0 : s.slice();
        o && (o[0] += e.offset, o[2] += e.offset), t.push({
          extent: r,
          clipExtent: o,
          image: n.getImage()
        });
      }
    }), this.sourceTiles_.length = 0, t.length === 0)
      this.state = T.ERROR;
    else {
      const e = this.wrappedTileCoord_[0], n = this.targetTileGrid_.getTileSize(e), s = typeof n == "number" ? n : n[0], r = typeof n == "number" ? n : n[1], o = this.targetTileGrid_.getResolution(e), a = this.sourceTileGrid_.getResolution(
        this.sourceZ_
      ), l = this.targetTileGrid_.getTileCoordExtent(
        this.wrappedTileCoord_
      );
      this.canvas_ = ai(
        s,
        r,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        o,
        l,
        this.triangulation_,
        t,
        this.gutter_,
        this.renderEdges_,
        this.interpolate
      ), this.state = T.LOADED;
    }
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state == T.IDLE) {
      this.state = T.LOADING, this.changed();
      let t = 0;
      this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(({ tile: e }) => {
        const n = e.getState();
        if (n == T.IDLE || n == T.LOADING) {
          t++;
          const s = mt(e, st.CHANGE, (r) => {
            const o = e.getState();
            (o == T.LOADED || o == T.ERROR || o == T.EMPTY) && (it(s), t--, t === 0 && (this.unlistenSources_(), this.reproject_()));
          });
          this.sourcesListenerKeys_.push(s);
        }
      }), t === 0 ? setTimeout(this.reproject_.bind(this), 0) : this.sourceTiles_.forEach(function({ tile: e }, n, s) {
        e.getState() == T.IDLE && e.load();
      });
    }
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(it), this.sourcesListenerKeys_ = null;
  }
  /**
   * Remove from the cache due to expiry
   * @override
   */
  release() {
    this.canvas_ && (kt(this.canvas_.getContext("2d")), at.push(this.canvas_), this.canvas_ = null), super.release();
  }
}
class qe {
  /**
   * @param {number} minX Minimum X.
   * @param {number} maxX Maximum X.
   * @param {number} minY Minimum Y.
   * @param {number} maxY Maximum Y.
   */
  constructor(t, e, n, s) {
    this.minX = t, this.maxX = e, this.minY = n, this.maxY = s;
  }
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {boolean} Contains tile coordinate.
   */
  contains(t) {
    return this.containsXY(t[1], t[2]);
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Contains.
   */
  containsTileRange(t) {
    return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY;
  }
  /**
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @return {boolean} Contains coordinate.
   */
  containsXY(t, e) {
    return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Equals.
   */
  equals(t) {
    return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   */
  extend(t) {
    t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY);
  }
  /**
   * @return {number} Height.
   */
  getHeight() {
    return this.maxY - this.minY + 1;
  }
  /**
   * @return {import("./size.js").Size} Size.
   */
  getSize() {
    return [this.getWidth(), this.getHeight()];
  }
  /**
   * @return {number} Width.
   */
  getWidth() {
    return this.maxX - this.minX + 1;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Intersects.
   */
  intersects(t) {
    return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY;
  }
}
function Pt(i, t, e, n, s) {
  return s !== void 0 ? (s.minX = i, s.maxX = t, s.minY = e, s.maxY = n, s) : new qe(i, t, e, n);
}
function ge(i, t, e, n) {
  return n !== void 0 ? (n[0] = i, n[1] = t, n[2] = e, n) : [i, t, e];
}
function ye(i, t, e) {
  return i + "/" + t + "/" + e;
}
function hi(i) {
  return ye(i[0], i[1], i[2]);
}
function Tr(i) {
  return i.split("/").map(Number);
}
function xr(i) {
  return Cr(i[0], i[1], i[2]);
}
function Cr(i, t, e) {
  return (t << i) + e;
}
function Mr(i, t) {
  const e = i[0], n = i[1], s = i[2];
  if (t.getMinZoom() > e || e > t.getMaxZoom())
    return !1;
  const r = t.getFullTileRange(e);
  return r ? r.containsXY(n, s) : !0;
}
function wr(i, t, e) {
  return e === void 0 && (e = [0, 0]), e[0] = i[0] * t + 0.5 | 0, e[1] = i[1] * t + 0.5 | 0, e;
}
function _t(i, t) {
  return Array.isArray(i) ? i : (t === void 0 ? t = [i, i] : (t[0] = i, t[1] = i), t);
}
function Se(i, t, e, n) {
  return `${i},${ye(t, e, n)}`;
}
function Pe(i, t, e) {
  if (!(e in i))
    return i[e] = /* @__PURE__ */ new Set([t]), !0;
  const n = i[e], s = n.has(t);
  return s || n.add(t), !s;
}
function Ir(i, t, e) {
  const n = i[e];
  return n ? n.delete(t) : !1;
}
function On(i, t) {
  const e = i.layerStatesArray[i.layerIndex];
  e.extent && (t = nt(
    t,
    Tt(e.extent, i.viewState.projection)
  ));
  const n = (
    /** @type {import("../../source/Tile.js").default} */
    e.layer.getRenderSource()
  );
  if (!n.getWrapX()) {
    const s = n.getTileGridForProjection(i.viewState.projection).getExtent();
    s && (t = nt(t, s));
  }
  return t;
}
class vr extends ur {
  /**
   * @param {LayerType} tileLayer Tile layer.
   * @param {Options} [options] Options.
   */
  constructor(t, e) {
    super(t), e = e || {}, this.extentChanged = !0, this.renderComplete = !1, this.renderedExtent_ = null, this.renderedPixelRatio, this.renderedProjection = null, this.renderedRevision, this.renderedTiles = [], this.renderedSourceKey_, this.renderedSourceRevision_, this.tempExtent = Ct(), this.tempTileRange_ = new qe(0, 0, 0, 0), this.tempTileCoord_ = ge(0, 0, 0);
    const n = e.cacheSize !== void 0 ? e.cacheSize : 512;
    this.tileCache_ = new ii(n), this.maxStaleKeys = n * 0.5;
  }
  /**
   * @return {LRUCache} Tile cache.
   */
  getTileCache() {
    return this.tileCache_;
  }
  /**
   * Get a tile from the cache or create one if needed.
   *
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @protected
   */
  getOrCreateTile(t, e, n, s) {
    const r = this.tileCache_, a = this.getLayer().getSource(), l = Se(a.getKey(), t, e, n);
    let h;
    if (r.containsKey(l))
      h = r.get(l);
    else {
      if (h = a.getTile(
        t,
        e,
        n,
        s.pixelRatio,
        s.viewState.projection
      ), !h)
        return null;
      r.set(l, h);
    }
    return h;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @protected
   */
  getTile(t, e, n, s) {
    const r = this.getOrCreateTile(t, e, n, s);
    return r || null;
  }
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray} Data at the pixel location.
   * @override
   */
  getData(t) {
    const e = this.frameState;
    if (!e)
      return null;
    const n = this.getLayer(), s = et(
      e.pixelToCoordinateTransform,
      t.slice()
    ), r = n.getExtent();
    if (r && !je(r, s))
      return null;
    const o = e.viewState, a = n.getRenderSource(), l = a.getTileGridForProjection(o.projection), h = a.getTilePixelRatio(e.pixelRatio);
    for (let c = l.getZForResolution(o.resolution); c >= l.getMinZoom(); --c) {
      const u = l.getTileCoordForCoordAndZ(s, c), d = this.getTile(c, u[1], u[2], e);
      if (!d || d.getState() !== T.LOADED)
        continue;
      const f = l.getOrigin(c), g = _t(l.getTileSize(c)), _ = l.getResolution(c);
      let p;
      if (d instanceof ni)
        p = d.getImage();
      else if (d instanceof be) {
        if (p = de(d.getData()), !p)
          continue;
      } else
        continue;
      const R = Math.floor(
        h * ((s[0] - f[0]) / _ - u[1] * g[0])
      ), m = Math.floor(
        h * ((f[1] - s[1]) / _ - u[2] * g[1])
      ), E = Math.round(
        h * a.getGutterForProjection(o.projection)
      );
      return this.getImageData(p, R + E, m + E);
    }
    return null;
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(t) {
    const e = this.getLayer().getSource();
    if (!e)
      return !1;
    const n = this.getLayer().getSource().getRevision();
    return this.renderedRevision_ ? this.renderedRevision_ !== n && (this.renderedRevision_ = n, this.renderedSourceKey_ === e.getKey() && this.tileCache_.clear()) : this.renderedRevision_ = n, !0;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent The extent to be rendered.
   * @param {number} initialZ The zoom level.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @param {number} preload Number of additional levels to load.
   */
  enqueueTiles(t, e, n, s, r) {
    const o = t.viewState, a = this.getLayer(), l = a.getRenderSource(), h = l.getTileGridForProjection(o.projection), c = Q(l);
    c in t.wantedTiles || (t.wantedTiles[c] = {});
    const u = t.wantedTiles[c], d = a.getMapInternal(), f = Math.max(
      n - r,
      h.getMinZoom(),
      h.getZForResolution(
        Math.min(
          a.getMaxResolution(),
          d ? d.getView().getResolutionForZoom(Math.max(a.getMinZoom(), 0)) : h.getResolution(0)
        ),
        l.zDirection
      )
    );
    for (let g = n; g >= f; --g) {
      const _ = h.getTileRangeForExtentAndZ(
        e,
        g,
        this.tempTileRange_
      ), p = h.getResolution(g);
      for (let R = _.minX; R <= _.maxX; ++R)
        for (let m = _.minY; m <= _.maxY; ++m) {
          const E = this.getTile(g, R, m, t);
          if (!E || !Pe(s, E, g))
            continue;
          const y = E.getKey();
          if (u[y] = !0, E.getState() === T.IDLE && !t.tileQueue.isKeyQueued(y)) {
            const S = ge(g, R, m, this.tempTileCoord_);
            t.tileQueue.enqueue([
              E,
              c,
              h.getTileCoordCenter(S),
              p
            ]);
          }
        }
    }
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findStaleTile_(t, e) {
    const n = this.tileCache_, s = t[0], r = t[1], o = t[2], a = this.getStaleKeys();
    for (let l = 0; l < a.length; ++l) {
      const h = Se(a[l], s, r, o);
      if (n.containsKey(h)) {
        const c = n.get(h);
        if (c.getState() === T.LOADED)
          return c.endTransition(Q(this)), Pe(e, c, s), !0;
      }
    }
    return !1;
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {number} altZ The alternate zoom level.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findAltTiles_(t, e, n, s) {
    const r = t.getTileRangeForTileCoordAndZ(
      e,
      n,
      this.tempTileRange_
    );
    if (!r)
      return !1;
    let o = !0;
    const a = this.tileCache_, h = this.getLayer().getRenderSource().getKey();
    for (let c = r.minX; c <= r.maxX; ++c)
      for (let u = r.minY; u <= r.maxY; ++u) {
        const d = Se(h, n, c, u);
        let f = !1;
        if (a.containsKey(d)) {
          const g = a.get(d);
          g.getState() === T.LOADED && (Pe(s, g, n), f = !0);
        }
        f || (o = !1);
      }
    return o;
  }
  /**
   * Render the layer.
   *
   * The frame rendering logic has three parts:
   *
   *  1. Enqueue tiles
   *  2. Find alt tiles for those that are not yet loaded
   *  3. Render loaded tiles
   *
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  renderFrame(t, e) {
    this.renderComplete = !0;
    const n = t.layerStatesArray[t.layerIndex], s = t.viewState, r = s.projection, o = s.resolution, a = s.center, l = t.pixelRatio, h = this.getLayer(), c = h.getSource(), u = c.getRevision(), d = c.getTileGridForProjection(r), f = d.getZForResolution(o, c.zDirection), g = d.getResolution(f), _ = c.getKey();
    this.renderedSourceKey_ ? this.renderedSourceKey_ !== _ && (this.prependStaleKey(this.renderedSourceKey_), this.renderedSourceKey_ = _) : this.renderedSourceKey_ = _;
    let p = t.extent;
    const R = c.getTilePixelRatio(l);
    this.prepareContainer(t, e);
    const m = this.context.canvas.width, E = this.context.canvas.height, x = n.extent && Tt(n.extent);
    x && (p = nt(
      p,
      Tt(n.extent)
    ));
    const y = g * m / 2 / R, S = g * E / 2 / R, I = [
      a[0] - y,
      a[1] - S,
      a[0] + y,
      a[1] + S
    ], C = {}, P = h.getPreload();
    if (t.nextExtent) {
      const z = d.getZForResolution(
        s.nextResolution,
        c.zDirection
      ), X = On(t, t.nextExtent);
      this.enqueueTiles(t, X, z, C, P);
    }
    const L = On(t, p);
    this.enqueueTiles(t, L, f, C, 0), P > 0 && setTimeout(() => {
      this.enqueueTiles(
        t,
        L,
        f - 1,
        C,
        P - 1
      );
    }, 0);
    const b = Q(this), F = t.time;
    for (const z of C[f]) {
      const X = z.getState();
      if ((z instanceof li || z instanceof Er) && X === T.EMPTY)
        continue;
      const Y = z.tileCoord;
      if (X === T.LOADED && z.getAlpha(b, F) === 1) {
        z.endTransition(b);
        continue;
      }
      if (this.renderComplete = !1, this.findStaleTile_(Y, C)) {
        Ir(C, z, f), t.animate = !0;
        continue;
      }
      if (this.findAltTiles_(
        d,
        Y,
        f + 1,
        C
      ))
        continue;
      const tt = d.getMinZoom();
      for (let W = f - 1; W >= tt && !this.findAltTiles_(
        d,
        Y,
        W,
        C
      ); --W)
        ;
    }
    const A = g / o * l / R, M = this.getRenderContext(t);
    he(
      this.tempTransform,
      m / 2,
      E / 2,
      A,
      A,
      0,
      -m / 2,
      -E / 2
    ), n.extent && this.clipUnrotated(M, t, x), c.getInterpolate() || (M.imageSmoothingEnabled = !1), this.preRender(M, t), this.renderedTiles.length = 0;
    const D = Object.keys(C).map(Number);
    D.sort(De);
    let v;
    const U = [], B = [];
    for (let z = D.length - 1; z >= 0; --z) {
      const X = D[z], Y = c.getTilePixelSize(
        X,
        l,
        r
      ), Rt = d.getResolution(X) / g, tt = Y[0] * Rt * A, W = Y[1] * Rt * A, K = d.getTileCoordForCoordAndZ(
        Mt(I),
        X
      ), ht = d.getTileCoordExtent(K), yt = et(this.tempTransform, [
        R * (ht[0] - I[0]) / g,
        R * (I[3] - ht[3]) / g
      ]), ot = R * c.getGutterForProjection(r);
      for (const Xt of C[X]) {
        if (Xt.getState() !== T.LOADED)
          continue;
        const Je = Xt.tileCoord, tn = K[1] - Je[1], fi = Math.round(yt[0] - (tn - 1) * tt), en = K[2] - Je[2], _i = Math.round(yt[1] - (en - 1) * W), ct = Math.round(yt[0] - tn * tt), ut = Math.round(yt[1] - en * W), Ht = fi - ct, Bt = _i - ut, nn = D.length === 1;
        let Ee = !1;
        v = [ct, ut, ct + Ht, ut, ct + Ht, ut + Bt, ct, ut + Bt];
        for (let qt = 0, mi = U.length; qt < mi; ++qt)
          if (!nn && X < B[qt]) {
            const H = U[qt];
            Vt(
              [ct, ut, ct + Ht, ut + Bt],
              [H[0], H[3], H[4], H[7]]
            ) && (Ee || (M.save(), Ee = !0), M.beginPath(), M.moveTo(v[0], v[1]), M.lineTo(v[2], v[3]), M.lineTo(v[4], v[5]), M.lineTo(v[6], v[7]), M.moveTo(H[6], H[7]), M.lineTo(H[4], H[5]), M.lineTo(H[2], H[3]), M.lineTo(H[0], H[1]), M.clip());
          }
        U.push(v), B.push(X), this.drawTile(Xt, t, ct, ut, Ht, Bt, ot, nn), Ee && M.restore(), this.renderedTiles.unshift(Xt), this.updateUsedTiles(t.usedTiles, c, Xt);
      }
    }
    this.renderedRevision = u, this.renderedResolution = g, this.extentChanged = !this.renderedExtent_ || !Vi(this.renderedExtent_, I), this.renderedExtent_ = I, this.renderedPixelRatio = l, this.renderedProjection = r, this.postRender(this.context, t), n.extent && M.restore(), M.imageSmoothingEnabled = !0;
    const q = (z, X) => {
      const Y = Q(c), lt = X.wantedTiles[Y], Rt = lt ? Object.keys(lt).length : 0;
      this.updateCacheSize(Rt), this.tileCache_.expireCache();
    };
    return t.postRenderFunctions.push(q), this.container;
  }
  /**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   */
  updateCacheSize(t) {
    this.tileCache_.highWaterMark = Math.max(
      this.tileCache_.highWaterMark,
      t * 2
    );
  }
  /**
   * @param {import("../../Tile.js").default} tile Tile.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   * @protected
   */
  drawTile(t, e, n, s, r, o, a, l) {
    let h;
    if (t instanceof be) {
      if (h = de(t.getData()), !h)
        throw new Error("Rendering array data is not yet supported");
    } else
      h = this.getTileImage(
        /** @type {import("../../ImageTile.js").default} */
        t
      );
    if (!h)
      return;
    const c = this.getRenderContext(e), u = Q(this), d = e.layerStatesArray[e.layerIndex], f = d.opacity * (l ? t.getAlpha(u, e.time) : 1), g = f !== c.globalAlpha;
    g && (c.save(), c.globalAlpha = f), c.drawImage(
      h,
      a,
      a,
      h.width - 2 * a,
      h.height - 2 * a,
      n,
      s,
      r,
      o
    ), g && c.restore(), f !== d.opacity ? e.animate = !0 : l && t.endTransition(u);
  }
  /**
   * @return {HTMLCanvasElement} Image
   */
  getImage() {
    const t = this.context;
    return t ? t.canvas : null;
  }
  /**
   * Get the image from a tile.
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @protected
   */
  getTileImage(t) {
    return t.getImage();
  }
  /**
   * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import('../../Tile.js').default} tile Tile.
   * @protected
   */
  updateUsedTiles(t, e, n) {
    const s = Q(e);
    s in t || (t[s] = {}), t[s][n.getKey()] = !0;
  }
}
class Sr extends $s {
  /**
   * @param {import("./BaseTile.js").Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(t) {
    super(t);
  }
  /**
   * @override
   */
  createRenderer() {
    return new vr(this, {
      cacheSize: this.getCacheSize()
    });
  }
}
class ci extends ii {
  /**
   * @override
   */
  clear() {
    for (; this.getCount() > 0; )
      this.pop().release();
    super.clear();
  }
  /**
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   * @override
   */
  expireCache(t) {
    for (; this.canExpireCache() && !(this.peekLast().getKey() in t); )
      this.pop().release();
  }
  /**
   * Prune all tiles from the cache that don't have the same z as the newest tile.
   */
  pruneExceptNewestZ() {
    if (this.getCount() === 0)
      return;
    const t = this.peekFirstKey(), n = Tr(t)[0];
    this.forEach((s) => {
      s.tileCoord[0] !== n && (this.remove(hi(s.tileCoord)), s.release());
    });
  }
}
const Ae = {
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: "tileloadstart",
  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: "tileloadend",
  /**
   * Triggered if tile loading results in an error. Note that this is not the
   * right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
   * for details.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: "tileloaderror"
};
class Pr extends _e {
  /**
   * @param {Options} options Source options.
   */
  constructor(t) {
    super(), this.projection = J(t.projection), this.attributions_ = Ln(t.attributions), this.attributionsCollapsible_ = t.attributionsCollapsible ?? !0, this.loading = !1, this.state_ = t.state !== void 0 ? t.state : "ready", this.wrapX_ = t.wrapX !== void 0 ? t.wrapX : !1, this.interpolate_ = !!t.interpolate, this.viewResolver = null, this.viewRejector = null;
    const e = this;
    this.viewPromise_ = new Promise(function(n, s) {
      e.viewResolver = n, e.viewRejector = s;
    });
  }
  /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */
  getAttributions() {
    return this.attributions_;
  }
  /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  }
  /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default|null} Projection.
   * @api
   */
  getProjection() {
    return this.projection;
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */
  getResolutions(t) {
    return null;
  }
  /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */
  getView() {
    return this.viewPromise_;
  }
  /**
   * Get the state of the source, see {@link import("./Source.js").State} for possible states.
   * @return {import("./Source.js").State} State.
   * @api
   */
  getState() {
    return this.state_;
  }
  /**
   * @return {boolean|undefined} Wrap X.
   */
  getWrapX() {
    return this.wrapX_;
  }
  /**
   * @return {boolean} Use linear interpolation when resampling.
   */
  getInterpolate() {
    return this.interpolate_;
  }
  /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */
  refresh() {
    this.changed();
  }
  /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */
  setAttributions(t) {
    this.attributions_ = Ln(t), this.changed();
  }
  /**
   * Set the state of the source.
   * @param {import("./Source.js").State} state State.
   */
  setState(t) {
    this.state_ = t, this.changed();
  }
}
function Ln(i) {
  return i ? typeof i == "function" ? i : (Array.isArray(i) || (i = [i]), (t) => i) : null;
}
const At = [0, 0, 0], ft = 5;
class ui {
  /**
   * @param {Options} options Tile grid options.
   */
  constructor(t) {
    this.minZoom = t.minZoom !== void 0 ? t.minZoom : 0, this.resolutions_ = t.resolutions, N(
      wi(
        this.resolutions_,
        /**
         * @param {number} a First resolution
         * @param {number} b Second resolution
         * @return {number} Comparison result
         */
        (s, r) => r - s
      ),
      "`resolutions` must be sorted in descending order"
    );
    let e;
    if (!t.origins) {
      for (let s = 0, r = this.resolutions_.length - 1; s < r; ++s)
        if (!e)
          e = this.resolutions_[s] / this.resolutions_[s + 1];
        else if (this.resolutions_[s] / this.resolutions_[s + 1] !== e) {
          e = void 0;
          break;
        }
    }
    this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = t.origin !== void 0 ? t.origin : null, this.origins_ = null, t.origins !== void 0 && (this.origins_ = t.origins, N(
      this.origins_.length == this.resolutions_.length,
      "Number of `origins` and `resolutions` must be equal"
    ));
    const n = t.extent;
    n !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = Mt(n)), N(
      !this.origin_ && this.origins_ || this.origin_ && !this.origins_,
      "Either `origin` or `origins` must be configured, never both"
    ), this.tileSizes_ = null, t.tileSizes !== void 0 && (this.tileSizes_ = t.tileSizes, N(
      this.tileSizes_.length == this.resolutions_.length,
      "Number of `tileSizes` and `resolutions` must be equal"
    )), this.tileSize_ = t.tileSize !== void 0 ? t.tileSize : this.tileSizes_ ? null : Xe, N(
      !this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_,
      "Either `tileSize` or `tileSizes` must be configured, never both"
    ), this.extent_ = n !== void 0 ? n : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], this.tmpExtent_ = [0, 0, 0, 0], t.sizes !== void 0 ? this.fullTileRanges_ = t.sizes.map((s, r) => {
      const o = new qe(
        Math.min(0, s[0]),
        Math.max(s[0] - 1, -1),
        Math.min(0, s[1]),
        Math.max(s[1] - 1, -1)
      );
      if (n) {
        const a = this.getTileRangeForExtentAndZ(n, r);
        o.minX = Math.max(a.minX, o.minX), o.maxX = Math.min(a.maxX, o.maxX), o.minY = Math.max(a.minY, o.minY), o.maxY = Math.min(a.maxY, o.maxY);
      }
      return o;
    }) : n && this.calculateTileRanges_(n);
  }
  /**
   * Call a function with each tile coordinate for a given extent and zoom level.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} zoom Integer zoom level.
   * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
   * @api
   */
  forEachTileCoord(t, e, n) {
    const s = this.getTileRangeForExtentAndZ(t, e);
    for (let r = s.minX, o = s.maxX; r <= o; ++r)
      for (let a = s.minY, l = s.maxY; a <= l; ++a)
        n([e, r, a]);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {boolean} Callback succeeded.
   */
  forEachTileCoordParentTileRange(t, e, n, s) {
    let r, o, a, l = null, h = t[0] - 1;
    for (this.zoomFactor_ === 2 ? (o = t[1], a = t[2]) : l = this.getTileCoordExtent(t, s); h >= this.minZoom; ) {
      if (o !== void 0 && a !== void 0 ? (o = Math.floor(o / 2), a = Math.floor(a / 2), r = Pt(o, o, a, a, n)) : r = this.getTileRangeForExtentAndZ(
        l,
        h,
        n
      ), e(h, r))
        return !0;
      --h;
    }
    return !1;
  }
  /**
   * Get the extent for this tile grid, if it was configured.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the maximum zoom level for the grid.
   * @return {number} Max zoom.
   * @api
   */
  getMaxZoom() {
    return this.maxZoom;
  }
  /**
   * Get the minimum zoom level for the grid.
   * @return {number} Min zoom.
   * @api
   */
  getMinZoom() {
    return this.minZoom;
  }
  /**
   * Get the origin for the grid at the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {import("../coordinate.js").Coordinate} Origin.
   * @api
   */
  getOrigin(t) {
    return this.origin_ ? this.origin_ : this.origins_[t];
  }
  /**
   * Get the resolution for the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {number} Resolution.
   * @api
   */
  getResolution(t) {
    return this.resolutions_[t];
  }
  /**
   * Get the list of resolutions for the tile grid.
   * @return {Array<number>} Resolutions.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileCoordChildTileRange(t, e, n) {
    if (t[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const r = t[1] * 2, o = t[2] * 2;
        return Pt(
          r,
          r + 1,
          o,
          o + 1,
          e
        );
      }
      const s = this.getTileCoordExtent(
        t,
        n || this.tmpExtent_
      );
      return this.getTileRangeForExtentAndZ(
        s,
        t[0] + 1,
        e
      );
    }
    return null;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileRangeForTileCoordAndZ(t, e, n) {
    if (e > this.maxZoom || e < this.minZoom)
      return null;
    const s = t[0], r = t[1], o = t[2];
    if (e === s)
      return Pt(
        r,
        o,
        r,
        o,
        n
      );
    if (this.zoomFactor_) {
      const l = Math.pow(this.zoomFactor_, e - s), h = Math.floor(r * l), c = Math.floor(o * l);
      if (e < s)
        return Pt(h, h, c, c, n);
      const u = Math.floor(l * (r + 1)) - 1, d = Math.floor(l * (o + 1)) - 1;
      return Pt(h, u, c, d, n);
    }
    const a = this.getTileCoordExtent(t, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(a, e, n);
  }
  /**
   * Get a tile range for the given extent and integer zoom level.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
   * @return {import("../TileRange.js").default} Tile range.
   */
  getTileRangeForExtentAndZ(t, e, n) {
    this.getTileCoordForXYAndZ_(t[0], t[3], e, !1, At);
    const s = At[1], r = At[2];
    this.getTileCoordForXYAndZ_(t[2], t[1], e, !0, At);
    const o = At[1], a = At[2];
    return Pt(s, o, r, a, n);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {import("../coordinate.js").Coordinate} Tile center.
   */
  getTileCoordCenter(t) {
    const e = this.getOrigin(t[0]), n = this.getResolution(t[0]), s = _t(this.getTileSize(t[0]), this.tmpSize_);
    return [
      e[0] + (t[1] + 0.5) * s[0] * n,
      e[1] - (t[2] + 0.5) * s[1] * n
    ];
  }
  /**
   * Get the extent of a tile coordinate.
   *
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getTileCoordExtent(t, e) {
    const n = this.getOrigin(t[0]), s = this.getResolution(t[0]), r = _t(this.getTileSize(t[0]), this.tmpSize_), o = n[0] + t[1] * r[0] * s, a = n[1] - (t[2] + 1) * r[1] * s, l = o + r[0] * s, h = a + r[1] * s;
    return Wt(o, a, l, h, e);
  }
  /**
   * Get the tile coordinate for the given map coordinate and resolution.  This
   * method considers that coordinates that intersect tile boundaries should be
   * assigned the higher tile coordinate.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndResolution(t, e, n) {
    return this.getTileCoordForXYAndResolution_(
      t[0],
      t[1],
      e,
      !1,
      n
    );
  }
  /**
   * Note that this method should not be called for resolutions that correspond
   * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
   * @param {number} x X.
   * @param {number} y Y.
   * @param {number} resolution Resolution (for a non-integer zoom level).
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndResolution_(t, e, n, s, r) {
    const o = this.getZForResolution(n), a = n / this.getResolution(o), l = this.getOrigin(o), h = _t(this.getTileSize(o), this.tmpSize_);
    let c = a * (t - l[0]) / n / h[0], u = a * (l[1] - e) / n / h[1];
    return s ? (c = Qt(c, ft) - 1, u = Qt(u, ft) - 1) : (c = $t(c, ft), u = $t(u, ft)), ge(o, c, u, r);
  }
  /**
   * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
   * they should have separate implementations.  This method is for integer zoom
   * levels.  The other method should only be called for resolutions corresponding
   * to non-integer zoom levels.
   * @param {number} x Map x coordinate.
   * @param {number} y Map y coordinate.
   * @param {number} z Integer zoom level.
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndZ_(t, e, n, s, r) {
    const o = this.getOrigin(n), a = this.getResolution(n), l = _t(this.getTileSize(n), this.tmpSize_);
    let h = (t - o[0]) / a / l[0], c = (o[1] - e) / a / l[1];
    return s ? (h = Qt(h, ft) - 1, c = Qt(c, ft) - 1) : (h = $t(h, ft), c = $t(c, ft)), ge(n, h, c, r);
  }
  /**
   * Get a tile coordinate given a map coordinate and zoom level.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndZ(t, e, n) {
    return this.getTileCoordForXYAndZ_(
      t[0],
      t[1],
      e,
      !1,
      n
    );
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {number} Tile resolution.
   */
  getTileCoordResolution(t) {
    return this.resolutions_[t[0]];
  }
  /**
   * Get the tile size for a zoom level. The type of the return value matches the
   * `tileSize` or `tileSizes` that the tile grid was configured with. To always
   * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
   * @param {number} z Z.
   * @return {number|import("../size.js").Size} Tile size.
   * @api
   */
  getTileSize(t) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t];
  }
  /**
   * @param {number} z Zoom level.
   * @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
   */
  getFullTileRange(t) {
    return this.fullTileRanges_ ? this.fullTileRanges_[t] : this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, t) : null;
  }
  /**
   * @param {number} resolution Resolution.
   * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
   *     If 0, the nearest resolution will be used.
   *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
   *     nearest lower resolution (higher Z) will be used. Default is 0.
   *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
   *
   * For example to change tile Z at the midpoint of zoom levels
   * ```js
   * function(value, high, low) {
   *   return value - low * Math.sqrt(high / low);
   * }
   * ```
   * @return {number} Z.
   * @api
   */
  getZForResolution(t, e) {
    const n = ze(
      this.resolutions_,
      t,
      e || 0
    );
    return j(n, this.minZoom, this.maxZoom);
  }
  /**
   * The tile with the provided tile coordinate intersects the given viewport.
   * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
   * @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
   * @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
   */
  tileCoordIntersectsViewport(t, e) {
    return Jn(
      e,
      0,
      e.length,
      2,
      this.getTileCoordExtent(t)
    );
  }
  /**
   * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
   * @private
   */
  calculateTileRanges_(t) {
    const e = this.resolutions_.length, n = new Array(e);
    for (let s = this.minZoom; s < e; ++s)
      n[s] = this.getTileRangeForExtentAndZ(t, s);
    this.fullTileRanges_ = n;
  }
}
function di(i) {
  let t = i.getDefaultTileGrid();
  return t || (t = Lr(i), i.setDefaultTileGrid(t)), t;
}
function Ar(i, t, e) {
  const n = t[0], s = i.getTileCoordCenter(t), r = $e(e);
  if (!je(r, s)) {
    const o = O(r), a = Math.ceil(
      (r[0] - s[0]) / o
    );
    return s[0] += o * a, i.getTileCoordForCoordAndZ(s, n);
  }
  return t;
}
function Fr(i, t, e, n) {
  n = n !== void 0 ? n : "top-left";
  const s = gi(i, t, e);
  return new ui({
    extent: i,
    origin: qi(i, n),
    resolutions: s,
    tileSize: e
  });
}
function Or(i) {
  const t = i || {}, e = t.extent || J("EPSG:3857").getExtent(), n = {
    extent: e,
    minZoom: t.minZoom,
    tileSize: t.tileSize,
    resolutions: gi(
      e,
      t.maxZoom,
      t.tileSize,
      t.maxResolution
    )
  };
  return new ui(n);
}
function gi(i, t, e, n) {
  t = t !== void 0 ? t : bi, e = _t(e !== void 0 ? e : Xe);
  const s = V(i), r = O(i);
  n = n > 0 ? n : Math.max(r / e[0], s / e[1]);
  const o = t + 1, a = new Array(o);
  for (let l = 0; l < o; ++l)
    a[l] = n / Math.pow(2, l);
  return a;
}
function Lr(i, t, e, n) {
  const s = $e(i);
  return Fr(s, t, e, n);
}
function $e(i) {
  i = J(i);
  let t = i.getExtent();
  if (!t) {
    const e = 180 * Ge.degrees / i.getMetersPerUnit();
    t = Wt(-e, -e, e, e);
  }
  return t;
}
class br extends Pr {
  /**
   * @param {Options} options SourceTile source options.
   */
  constructor(t) {
    super({
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      projection: t.projection,
      state: t.state,
      wrapX: t.wrapX,
      interpolate: t.interpolate
    }), this.on, this.once, this.un, this.tilePixelRatio_ = t.tilePixelRatio !== void 0 ? t.tilePixelRatio : 1, this.tileGrid = t.tileGrid !== void 0 ? t.tileGrid : null;
    const e = [256, 256];
    this.tileGrid && _t(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), e), this.tileCache = new ci(t.cacheSize || 0), this.tmpSize = [0, 0], this.key_ = t.key || "", this.tileOptions = {
      transition: t.transition,
      interpolate: t.interpolate
    }, this.zDirection = t.zDirection ? t.zDirection : 0;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.tileCache.canExpireCache();
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */
  expireCache(t, e) {
    const n = this.getTileCacheForProjection(t);
    n && n.expireCache(e);
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */
  getGutterForProjection(t) {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */
  getKey() {
    return this.key_;
  }
  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */
  setKey(t) {
    this.key_ !== t && (this.key_ = t, this.changed());
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   * @override
   */
  getResolutions(t) {
    const e = t ? this.getTileGridForProjection(t) : this.tileGrid;
    return e ? e.getResolutions() : null;
  }
  /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {TileType|null} Tile.
   */
  getTile(t, e, n, s, r) {
    return G();
  }
  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
   * @api
   */
  getTileGrid() {
    return this.tileGrid;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */
  getTileGridForProjection(t) {
    return this.tileGrid ? this.tileGrid : di(t);
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   * @protected
   */
  getTileCacheForProjection(t) {
    const e = this.getProjection();
    return N(
      e === null || Nt(e, t),
      "A VectorTile source can only be rendered if it has a projection compatible with the view projection."
    ), this.tileCache;
  }
  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */
  getTilePixelRatio(t) {
    return this.tilePixelRatio_;
  }
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */
  getTilePixelSize(t, e, n) {
    const s = this.getTileGridForProjection(n), r = this.getTilePixelRatio(e), o = _t(s.getTileSize(t), this.tmpSize);
    return r == 1 ? o : wr(o, r, this.tmpSize);
  }
  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */
  getTileCoordForTileUrlFunction(t, e) {
    e = e !== void 0 ? e : this.getProjection();
    const n = this.getTileGridForProjection(e);
    return this.getWrapX() && e.isGlobal() && (t = Ar(n, t, e)), Mr(t, n) ? t : null;
  }
  /**
   * Remove all cached tiles from the source. The next render cycle will fetch new tiles.
   * @api
   */
  clear() {
    this.tileCache.clear();
  }
  /**
   * @override
   */
  refresh() {
    this.clear(), super.refresh();
  }
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  useTile(t, e, n, s) {
  }
}
class Dr extends fe {
  /**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */
  constructor(t, e) {
    super(t), this.tile = e;
  }
}
const zr = /\{z\}/g, Xr = /\{x\}/g, Gr = /\{y\}/g, jr = /\{-y\}/g;
function Nr(i, t, e, n, s) {
  return i.replace(zr, t.toString()).replace(Xr, e.toString()).replace(Gr, n.toString()).replace(jr, function() {
    if (s === void 0)
      throw new Error(
        "If the URL template has a {-y} placeholder, the grid extent must be known"
      );
    return (s - n).toString();
  });
}
function Zr(i) {
  const t = [];
  let e = /\{([a-z])-([a-z])\}/.exec(i);
  if (e) {
    const n = e[1].charCodeAt(0), s = e[2].charCodeAt(0);
    let r;
    for (r = n; r <= s; ++r)
      t.push(i.replace(e[0], String.fromCharCode(r)));
    return t;
  }
  if (e = /\{(\d+)-(\d+)\}/.exec(i), e) {
    const n = parseInt(e[2], 10);
    for (let s = parseInt(e[1], 10); s <= n; s++)
      t.push(i.replace(e[0], s.toString()));
    return t;
  }
  return t.push(i), t;
}
function Yr(i, t) {
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(e, n, s) {
      if (!e)
        return;
      let r;
      const o = e[0];
      if (t) {
        const a = t.getFullTileRange(o);
        a && (r = a.getHeight() - 1);
      }
      return Nr(i, o, e[1], e[2], r);
    }
  );
}
function kr(i, t) {
  const e = i.length, n = new Array(e);
  for (let s = 0; s < e; ++s)
    n[s] = Yr(i[s], t);
  return Ur(n);
}
function Ur(i) {
  return i.length === 1 ? i[0] : (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(t, e, n) {
      if (!t)
        return;
      const s = xr(t), r = bt(s, i.length);
      return i[r](t, e, n);
    }
  );
}
class Qe extends br {
  /**
   * @param {Options} options Image tile options.
   */
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tilePixelRatio: t.tilePixelRatio,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection
    }), this.generateTileUrlFunction_ = this.tileUrlFunction === Qe.prototype.tileUrlFunction, this.tileLoadFunction = t.tileLoadFunction, t.tileUrlFunction && (this.tileUrlFunction = t.tileUrlFunction), this.urls = null, t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url), this.tileLoadingKeys_ = {};
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */
  getTileLoadFunction() {
    return this.tileLoadFunction;
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */
  getUrls() {
    return this.urls;
  }
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */
  handleTileChange(t) {
    const e = (
      /** @type {import("../Tile.js").default} */
      t.target
    ), n = Q(e), s = e.getState();
    let r;
    s == T.LOADING ? (this.tileLoadingKeys_[n] = !0, r = Ae.TILELOADSTART) : n in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[n], r = s == T.ERROR ? Ae.TILELOADERROR : s == T.LOADED ? Ae.TILELOADEND : void 0), r != null && this.dispatchEvent(new Dr(r, e));
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */
  setTileLoadFunction(t) {
    this.tileCache.clear(), this.tileLoadFunction = t, this.changed();
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */
  setTileUrlFunction(t, e) {
    this.tileUrlFunction = t, this.tileCache.pruneExceptNewestZ(), typeof e < "u" ? this.setKey(e) : this.changed();
  }
  /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */
  setUrl(t) {
    const e = Zr(t);
    this.urls = e, this.setUrls(e);
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */
  setUrls(t) {
    this.urls = t;
    const e = t.join(`
`);
    this.generateTileUrlFunction_ ? this.setTileUrlFunction(kr(t, this.tileGrid), e) : this.setKey(e);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */
  tileUrlFunction(t, e, n) {
  }
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @override
   */
  useTile(t, e, n) {
    const s = ye(t, e, n);
    this.tileCache.containsKey(s) && this.tileCache.get(s);
  }
}
class Kr extends Qe {
  /**
   * @param {!Options} options Image tile options.
   */
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : Wr,
      tilePixelRatio: t.tilePixelRatio,
      tileUrlFunction: t.tileUrlFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate !== void 0 ? t.interpolate : !0,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection
    }), this.crossOrigin = t.crossOrigin !== void 0 ? t.crossOrigin : null, this.tileClass = t.tileClass !== void 0 ? t.tileClass : ni, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1;
  }
  /**
   * @return {boolean} Can expire cache.
   * @override
   */
  canExpireCache() {
    if (this.tileCache.canExpireCache())
      return !0;
    for (const t in this.tileCacheForProjection)
      if (this.tileCacheForProjection[t].canExpireCache())
        return !0;
    return !1;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   * @override
   */
  expireCache(t, e) {
    const n = this.getTileCacheForProjection(t);
    this.tileCache.expireCache(
      this.tileCache == n ? e : {}
    );
    for (const s in this.tileCacheForProjection) {
      const r = this.tileCacheForProjection[s];
      r.expireCache(r == n ? e : {});
    }
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   * @override
   */
  getGutterForProjection(t) {
    return this.getProjection() && t && !Nt(this.getProjection(), t) ? 0 : this.getGutter();
  }
  /**
   * @return {number} Gutter.
   */
  getGutter() {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @override
   */
  getKey() {
    let t = super.getKey();
    return this.getInterpolate() || (t += ":disable-interpolation"), t;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   * @override
   */
  getTileGridForProjection(t) {
    const e = this.getProjection();
    if (this.tileGrid && (!e || Nt(e, t)))
      return this.tileGrid;
    const n = Q(t);
    return n in this.tileGridForProjection || (this.tileGridForProjection[n] = di(t)), this.tileGridForProjection[n];
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   * @override
   */
  getTileCacheForProjection(t) {
    const e = this.getProjection();
    if (!e || Nt(e, t))
      return this.tileCache;
    const n = Q(t);
    return n in this.tileCacheForProjection || (this.tileCacheForProjection[n] = new ci(
      this.tileCache.highWaterMark
    )), this.tileCacheForProjection[n];
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!ImageTile} Tile.
   * @private
   */
  createTile_(t, e, n, s, r, o) {
    const a = [t, e, n], l = this.getTileCoordForTileUrlFunction(
      a,
      r
    ), h = l ? this.tileUrlFunction(l, s, r) : void 0, c = new this.tileClass(
      a,
      h !== void 0 ? T.IDLE : T.EMPTY,
      h !== void 0 ? h : "",
      this.crossOrigin,
      this.tileLoadFunction,
      this.tileOptions
    );
    return c.key = o, c.addEventListener(st.CHANGE, this.handleTileChange.bind(this)), c;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!(ImageTile|ReprojTile)} Tile.
   * @override
   */
  getTile(t, e, n, s, r) {
    const o = this.getProjection();
    if (!o || !r || Nt(o, r))
      return this.getTileInternal(
        t,
        e,
        n,
        s,
        o || r
      );
    const a = this.getTileCacheForProjection(r), l = [t, e, n];
    let h;
    const c = hi(l);
    a.containsKey(c) && (h = a.get(c));
    const u = this.getKey();
    if (h && h.key == u)
      return h;
    const d = this.getTileGridForProjection(o), f = this.getTileGridForProjection(r), g = this.getTileCoordForTileUrlFunction(
      l,
      r
    ), _ = new li(
      o,
      d,
      r,
      f,
      l,
      g,
      this.getTilePixelRatio(s),
      this.getGutter(),
      (p, R, m, E) => this.getTileInternal(p, R, m, E, o),
      this.reprojectionErrorThreshold_,
      this.renderReprojectionEdges_,
      this.tileOptions
    );
    return _.key = u, h ? a.replace(c, _) : a.set(c, _), _;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!ImageTile} Tile.
   * @protected
   */
  getTileInternal(t, e, n, s, r) {
    const o = ye(t, e, n), a = this.getKey();
    if (!this.tileCache.containsKey(o)) {
      const h = this.createTile_(t, e, n, s, r, a);
      return this.tileCache.set(o, h), h;
    }
    let l = this.tileCache.get(o);
    return l.key != a && (l = this.createTile_(t, e, n, s, r, a), this.tileCache.replace(o, l)), l;
  }
  /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */
  setRenderReprojectionEdges(t) {
    if (this.renderReprojectionEdges_ != t) {
      this.renderReprojectionEdges_ = t;
      for (const e in this.tileCacheForProjection)
        this.tileCacheForProjection[e].clear();
      this.changed();
    }
  }
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */
  setTileGridForProjection(t, e) {
    const n = J(t);
    if (n) {
      const s = Q(n);
      s in this.tileGridForProjection || (this.tileGridForProjection[s] = e);
    }
  }
  /**
   * @override
   */
  clear() {
    super.clear();
    for (const t in this.tileCacheForProjection)
      this.tileCacheForProjection[t].clear();
  }
}
function Wr(i, t) {
  i.getImage().src = t;
}
class Vr extends Kr {
  /**
   * @param {Options} [options] XYZ options.
   */
  constructor(t) {
    t = t || {};
    const e = t.projection !== void 0 ? t.projection : "EPSG:3857", n = t.tileGrid !== void 0 ? t.tileGrid : Or({
      extent: $e(e),
      maxResolution: t.maxResolution,
      maxZoom: t.maxZoom,
      minZoom: t.minZoom,
      tileSize: t.tileSize
    });
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      crossOrigin: t.crossOrigin,
      interpolate: t.interpolate,
      projection: e,
      reprojectionErrorThreshold: t.reprojectionErrorThreshold,
      tileGrid: n,
      tileLoadFunction: t.tileLoadFunction,
      tilePixelRatio: t.tilePixelRatio,
      tileUrlFunction: t.tileUrlFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX !== void 0 ? t.wrapX : !0,
      transition: t.transition,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection
    }), this.gutter_ = t.gutter !== void 0 ? t.gutter : 0;
  }
  /**
   * @return {number} Gutter.
   * @override
   */
  getGutter() {
    return this.gutter_;
  }
}
const Hr = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
class Br extends Vr {
  /**
   * @param {Options} [options] Open Street Map options.
   */
  constructor(t) {
    t = t || {};
    let e;
    t.attributions !== void 0 ? e = t.attributions : e = [Hr];
    const n = t.crossOrigin !== void 0 ? t.crossOrigin : "anonymous", s = t.url !== void 0 ? t.url : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    super({
      attributions: e,
      attributionsCollapsible: !1,
      cacheSize: t.cacheSize,
      crossOrigin: n,
      interpolate: t.interpolate,
      maxZoom: t.maxZoom !== void 0 ? t.maxZoom : 19,
      reprojectionErrorThreshold: t.reprojectionErrorThreshold,
      tileLoadFunction: t.tileLoadFunction,
      transition: t.transition,
      url: s,
      wrapX: t.wrapX,
      zDirection: t.zDirection
    });
  }
}
class qr extends HTMLElement {
  // private containerId: string;
  constructor(t, e, n) {
    super(), this.attachShadow({ mode: "open" }), this.shadowRoot.innerHTML = `
      <style>
        #map-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }
        #map { 
          width: 100%; 
          height: 100vh; 
        }
        .controls {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
        }
      </style>
      <div id="map-container">
        <div id="map"></div>
        <div class="controls">
          <slot name="control-slot"></slot>
        </div>
      </div>
    `, console.log(" map invoked"), this.initializeMap(t, e);
  }
  initializeMap(t, e) {
    var s;
    const n = (s = this.shadowRoot) == null ? void 0 : s.querySelector("#map");
    n ? this.map = new yi({
      target: n,
      layers: [
        new Sr({
          source: new Br()
        })
      ],
      view: new Ei({
        center: t,
        zoom: e
      })
    }) : console.error("Map container not found");
  }
  getMapInstance() {
    if (!this.map)
      throw new Error("Map instance is not initialized");
    return this.map;
  }
}
customElements.define("map-element", qr);
export {
  qr as MapElement,
  Ti as MyComponent
};
