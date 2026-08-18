// url=https://www.figma.com/design/gMxntdrC9PdB7qqMQMzfq4/UI-Kit?node-id=2518-124026
// source=packages/react/src/components/Menu/Menu.tsx
// component=Menu
import figma from "figma";

export default {
  id: "main-menu",
  imports: ['import { Menu, MenuItem, HomeLogo, Icon } from "@dtv/react"'],
  example: figma.code`<Menu
  start={
    <>
      <MenuItem icon={<Icon name="clock" />} aria-label="Perfil" />
      <MenuItem icon={<Icon name="clock" />} aria-label="Programação" />
      <MenuItem
        icon={<Icon name="clock" />}
        title="Previsão do tempo"
        subtitle="São Paulo, SP"
        aria-label="Previsão do tempo"
      />
    </>
  }
  end={
    <>
      <MenuItem
        align="end"
        icon={<Icon name="clock" />}
        title="Copa do Mundo: Equador x Argentina"
        subtitle="A seguir Central da Copa"
        aria-label="Programa ao vivo"
      />
      <HomeLogo src="" aria-label="Início" />
    </>
  }
/>`,
};
