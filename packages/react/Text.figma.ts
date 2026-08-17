// url=https://www.figma.com/design/lAC5ghyDT1w6MWkiZMlh43/DTV-Design-System
// source=packages/react/src/components/Text/Text.tsx
// component=Text
import figma from "figma";

const instance = figma.selectedInstance;

const variant = instance.getEnum("Style", {
  Display: "display",
  "Heading 1": "heading1",
  "Heading 2": "heading2",
  "Heading 3": "heading3",
  "Heading 4": "heading4",
  "Body Large": "body-lg",
  "Body Medium": "body-md",
  "Body Small": "body-sm",
  Label: "label",
  Caption: "caption",
});

const weight = instance.getEnum("Weight", {
  Regular: "regular",
  Medium: "medium",
  Semibold: "semibold",
  Bold: "bold",
});

const content = instance.getString("Content");

export default {
  id: "text",
  imports: ['import { Text } from "@dtv/react"'],
  example: figma.code`<Text variant="${variant}" weight="${weight}">${content}</Text>`,
};
