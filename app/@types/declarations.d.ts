type Split = 'splith' | 'splitv';

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

interface I3Node {
  id: number;
  type: string;
  orientation: 'none' | 'horizontal' | 'vertical';
  scratchpad_state: 'none';
  percent: number | null;
  urgent: boolean;
  marks: Array<any>;
  focused: boolean;
  layout: Split;
  workspace_layout: string;
  last_split_layout: Split;
  border: string;
  current_border_width: number;
  rect: Rect;
  deco_rect: Rect;
  window_rect: Rect;
  geometry: Rect;
  name: string;
  window: number | null;
  window_type: string | null;
  nodes: Array<I3Node | I3Container | I3Workspace>;
  floating_nodes: Array<any>;
  focus: Array<number>;
  fullscreen_mode: number;
  sticky: boolean;
  floating: string;
  swallows: Array<any>;
};

interface I3Container extends I3Node {
  output: string;
};

interface I3Workspace extends I3Container {
  num: number,
  gaps: Gaps
};
