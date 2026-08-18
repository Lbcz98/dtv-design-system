// url=https://www.figma.com/design/gMxntdrC9PdB7qqMQMzfq4/UI-Kit?node-id=2968-9213
// source=packages/react/src/components/ContentTrail/ContentTrail.tsx
// component=ContentTrail
import figma from "figma";

const instance = figma.selectedInstance;

const side = instance.getEnum("Side", {
  Left: "start",
  Right: "end",
});

export default {
  id: "content-trail",
  imports: ['import { ContentTrail, MainButton } from "@dtv/react"'],
  example: figma.code`<ContentTrail side="${side}">
  <MainButton title="Title" />
  <MainButton title="Title" />
  <MainButton title="Title" />
  <MainButton title="Title" />
</ContentTrail>`,
};
