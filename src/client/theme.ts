import { grommet } from "grommet";
import { deepMerge } from "grommet/utils";

const myTheme = {
  name: "my theme",
  rounding: 10,
  spacing: "1.5rem",
  global: {
    colors: {
      brand: {
        light: "#1ED760",
        dark: "#0A2E36",
      },
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background!": {
        light: "#111111",
        dark: "#0A2E36",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#777777",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: {
        light: "brand-secondary",
        dark: "brand-secondary",
      },
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#ef476f",
      "status-warning": "#ffd166",
      "status-ok": "#06d6a0",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "brand-secondary",
      "brand-secondary": {
        dark: "#27FB6B",
        light: "#0A2E36",
      },
      "brand-secondary!": "",
      focus: "brand-secondary",
    },
    font: {
      family: '"Lexend"',
      face: "/* vietnamese */\n@font-face {\n  font-family: 'Lexend';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/lexend/v5/wlpwgwvFAVdoq2_v9KQU82RHaBBX.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Lexend';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/lexend/v5/wlpwgwvFAVdoq2_v9aQU82RHaBBX.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Lexend';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/lexend/v5/wlpwgwvFAVdoq2_v-6QU82RHaA.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "10px",
      },
    },
    drop: {
      border: {
        radius: "10px",
      },
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
  button: {
    border: {
      radius: "10px",
    },
    primary: {},
    secondary: {},
  },
  checkBox: {
    check: {
      radius: "10px",
    },
    toggle: {
      radius: "10px",
    },
  },
  radioButton: {
    check: {
      radius: "10px",
    },
  },
} as const;

export default deepMerge(grommet, myTheme);
