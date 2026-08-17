// url=https://www.figma.com/design/lAC5ghyDT1w6MWkiZMlh43/DTV-Design-System
// source=packages/react/src/components/Input/Input.tsx
// component=Input
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  Small: "sm",
  Medium: "md",
  Large: "lg",
});

const label = instance.getString("Label");
const helperText = instance.getString("Helper text");
const error = instance.getBoolean("Error");
const errorMessage = instance.getString("Error message");
const disabled = instance.getBoolean("Disabled");
const placeholder = instance.getString("Placeholder");

export default {
  id: "input",
  imports: ['import { Input } from "@dtv/react"'],
  example: figma.code`<Input size="${size}" label="${label}" helperText="${helperText}" error={${error}} errorMessage="${errorMessage}" disabled={${disabled}} placeholder="${placeholder}" />`,
};
