// url=https://www.figma.com/design/lAC5ghyDT1w6MWkiZMlh43/DTV-Design-System
// source=packages/react/src/components/Icon/Icon.tsx
// component=Icon
import figma from "figma";

const instance = figma.selectedInstance;

const name = instance.getEnum("Icon", {
  Plus: "plus",
  X: "x",
  Check: "check",
  "Chevron Down": "chevron-down",
  Search: "search",
  "Alert Circle": "alert-circle",
  Info: "info",
});

const size = instance.getEnum("Size", {
  Small: "sm",
  Medium: "md",
  Large: "lg",
});

export default {
  id: "icon",
  imports: ['import { Icon } from "@dtv/react"'],
  example: figma.code`<Icon name="${name}" size="${size}" />`,
};
