// url=https://www.figma.com/design/lAC5ghyDT1w6MWkiZMlh43/DTV-Design-System
// source=packages/react/src/components/Button/Button.tsx
// component=Button
import figma from "figma";

const instance = figma.selectedInstance;

const variant = instance.getEnum("Variant", {
  Primary: "primary",
  Secondary: "secondary",
  Ghost: "ghost",
});

const size = instance.getEnum("Size", {
  Small: "sm",
  Medium: "md",
  Large: "lg",
});

const disabled = instance.getBoolean("Disabled");
const label = instance.getString("Label");

export default {
  id: "button",
  imports: ['import { Button } from "@dtv/react"'],
  example: figma.code`<Button variant="${variant}" size="${size}" disabled={${disabled}}>${label}</Button>`,
};
