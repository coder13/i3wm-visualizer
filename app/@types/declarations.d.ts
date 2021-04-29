type Layout = 'tabbed' | 'splith' | 'splitv' | 'stacked' | 'dockarea' | 'output';

type Rect = {
  x: number,
  y: number,
  width: number,
  height: number,
};

type Gaps = {
  inner: number,
  outer: number,
  top: number,
  right: number,
  bottom: number,
  left: number,
}

type WindowProperties = {
  title: string,
  instance: string,
  class: string,
  window_role: string,
  machine: any,
  transient_for: number,
}

type Swallow = {
  dock: number,
  insert_where: number,
}

interface I3Node {
  id: number;
  name: string;
  type: string;
  border: 'normal' | 'none' | 'pixel';
  current_border_width: number;
  layout: Layout;
  last_split_layout: Layout;
  workspace_layout: string;

  /**
   * @deprecated by i3wm: layout should be preferred.
   */
  orientation: 'none' | 'horizontal' | 'vertical';
  percent: number | null;
  rect: Rect;
  window_rect: Rect;
  deco_rect: Rect;
  geometry: Rect;
  window: number | null;
  window_properties?: WindowProperties;
  window_type: 'undefined' | 'normal' | 'dialog' | 'utility' | 'toolbar' | 'splash' | 'menu' | 'dropdown_menu' | 'popup_menu' | 'tooltip' | 'notification' | null;
  urgent: boolean;
  marks: Array<string>;
  focused: boolean;
  focus: Array<number>;
  fullscreen_mode: number;
  floating: string;
  nodes: Array<I3Node | I3Container | I3Workspace>;
  floating_nodes: Array<any>;
  
  sticky: boolean;
  scratchpad_state: 'none';
  swallows: Array<Swallow>;
};

interface I3Container extends I3Node {
  output: string;
};

interface I3Workspace extends I3Container {
  num: number;
  gaps: Gaps;
  visible?: boolean;
};
