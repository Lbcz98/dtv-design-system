// url=https://www.figma.com/design/gMxntdrC9PdB7qqMQMzfq4/UI-Kit?node-id=3386-10618
// source=packages/react/src/components/InsertButton/InsertButton.tsx
// component=InsertButton
import figma from "figma";

const instance = figma.selectedInstance;

const loading = instance.getEnum("Status", {
  Default: false,
  Focus: false,
  Loading: true,
  Disabled: false,
});

const disabled = instance.getEnum("Status", {
  Default: false,
  Focus: false,
  Loading: false,
  Disabled: true,
});

const iconLeft = instance.getBoolean("Icon Left");
const iconRight = instance.getBoolean("Icon Right");

export default {
  id: "insert-button",
  imports: ['import { InsertButton, Icon } from "@dtv/react"'],
  example: figma.code`<InsertButton
  leftIcon={${iconLeft} ? <Icon name="arrow-left" size="sm" /> : undefined}
  rightIcon={${iconRight} ? <Icon name="arrow-right" size="sm" /> : undefined}
  loading={${loading}}
  disabled={${disabled}}
>
  Label
</InsertButton>`,
};
