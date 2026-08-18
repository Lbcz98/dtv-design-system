// url=https://www.figma.com/design/gMxntdrC9PdB7qqMQMzfq4/UI-Kit?node-id=2457-117489
// source=packages/react/src/components/MainButton/MainButton.tsx
// component=MainButton
import figma from "figma";

const instance = figma.selectedInstance;

const selected = instance.getEnum("State", {
  Default: false,
  Focus: false,
  Selected: true,
});

const live = instance.getBoolean("Ao Vivo");
const checked = instance.getBoolean("Check");

export default {
  id: "main-button",
  imports: ['import { MainButton } from "@dtv/react"'],
  example: figma.code`<MainButton overline="Overline" title="Title" subtitle="Subtitle" live={${live}} checked={${checked}} selected={${selected}} />`,
};
