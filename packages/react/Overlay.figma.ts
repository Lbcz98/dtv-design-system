// url=https://www.figma.com/design/Mp1o4SNOrxCTfEiRQg15vc/?node-id=21873-1201
// source=packages/react/src/components/Overlay/Overlay.tsx
// component=Overlay
import figma from "figma";

const instance = figma.selectedInstance;

const variant = instance.getEnum("Property 1", {
  Home: "home",
  "Home + Notificação": "homeNotification",
  "Home - Botões Direita": "homeButtonsEnd",
  "Home - Botões Esquerda": "homeButtonsStart",
  "Interatividades Botões - Direita": "interactivityButtonsEnd",
  "Interatividades Botões - Esquerda": "interactivityButtonsStart",
  "Interatividades Cards - Direita": "interactivityCardsEnd",
  "Interatividades Cards - Esquerda": "interactivityCardsStart",
  Notificação: "notification",
});

export default {
  id: "overlay",
  imports: ['import { Overlay } from "@dtv/react"'],
  example: figma.code`<Overlay variant="${variant}" />`,
};
