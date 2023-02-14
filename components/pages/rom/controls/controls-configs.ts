type TControlIconData = {
  path: string
  tooltip: string
}

export type TControlIcons = {
  [key: string]: TControlIconData
}

type TControlMark = {
  top: string
  left: string
}

type TControlElement = {
  name: string
  mark: TControlMark
  icons: TControlIcons
}

export type TControlsConfig = {
  image: string
  elements: TControlElement[]
}

type TConfigIcons = {
  [key: string]: {
    [key: string]: {
      path: string
      tooltip: string
    }
  }
}

/* icons downloaded from https://greatdocbrown.itch.io/gamepad-ui?download */
const configIcons: TConfigIcons = {
  keyboard: {
    up: { path: "/assets/controls/k-up.png", tooltip: "UP ARROW" },
    down: {
      path: "/assets/controls/k-down.png",
      tooltip: "DOWN ARROW",
    },
    left: {
      path: "/assets/controls/k-left.png",
      tooltip: "LEFT ARROW",
    },
    right: {
      path: "/assets/controls/k-right.png",
      tooltip: "RIGHT ARROW",
    },
    space: { path: "/assets/controls/k-space.png", tooltip: "space" },
    enter: { path: "/assets/controls/k-enter.png", tooltip: "enter" },
    z: { path: "/assets/controls/k-z.png", tooltip: "Z" },
    x: { path: "/assets/controls/k-x.png", tooltip: "X" },
  },
  ps: {
    dpadUp: { path: "/assets/controls/ps-up.png", tooltip: "D-PAD UP" },
    dpadDown: { path: "/assets/controls/ps-down.png", tooltip: "D-PAD DOWN" },
    dpadLeft: { path: "/assets/controls/ps-left.png", tooltip: "D-PAD LEFT" },
    dpadRight: {
      path: "/assets/controls/ps-right.png",
      tooltip: "D-PAD RIGHT",
    },
    options: {
      path: "/assets/controls/ps-options.png",
      tooltip: "ps options",
    },
    share: { path: "/assets/controls/ps-share.png", tooltip: "ps share" },
    cross: { path: "/assets/controls/ps-cross.png", tooltip: "ps cross" },
    circle: { path: "/assets/controls/ps-circle.png", tooltip: "ps circle" },
  },
  xbox: {
    dpadUp: { path: "/assets/controls/ps-up.png", tooltip: "D-PAD UP" },
    dpadDown: { path: "/assets/controls/ps-down.png", tooltip: "D-PAD DOWN" },
    dpadLeft: { path: "/assets/controls/ps-left.png", tooltip: "D-PAD LEFT" },
    dpadRight: {
      path: "/assets/controls/ps-right.png",
      tooltip: "D-PAD RIGHT",
    },
    options: {
      path: "/assets/controls/x-options.png",
      tooltip: "xbox options",
    },
    share: { path: "/assets/controls/x-share.png", tooltip: "xbox share" },
    a: { path: "/assets/controls/x-a.png", tooltip: "xbox A" },
    b: { path: "/assets/controls/x-b.png", tooltip: "xbox B" },
  },
}

export const nesControlsConfig: TControlsConfig = {
  image: "/assets/controls/nes-controller.png",
  elements: [
    {
      name: "up",
      mark: {
        top: "80",
        left: "73",
      },
      icons: {
        keyboard: { path: "/assets/controls/k-up.png", tooltip: "UP ARROW" },
        ps: { path: "/assets/controls/ps-up.png", tooltip: "D-PAD UP" },
        xbox: { path: "/assets/controls/ps-up.png", tooltip: "D-PAD UP" },
      },
    },
    {
      name: "down",
      mark: { top: "135", left: "73" },
      icons: {
        keyboard: {
          path: "/assets/controls/k-down.png",
          tooltip: "DOWN ARROW",
        },
        ps: { path: "/assets/controls/ps-down.png", tooltip: "D-PAD DOWN" },
        xbox: { path: "/assets/controls/ps-down.png", tooltip: "D-PAD DOWN" },
      },
    },
    {
      name: "left",
      mark: { top: "106", left: "46" },
      icons: {
        keyboard: {
          path: "/assets/controls/k-left.png",
          tooltip: "LEFT ARROW",
        },
        ps: { path: "/assets/controls/ps-left.png", tooltip: "D-PAD LEFT" },
        xbox: { path: "/assets/controls/ps-left.png", tooltip: "D-PAD LEFT" },
      },
    },
    {
      name: "right",
      mark: { top: "106", left: "100" },
      icons: {
        keyboard: {
          path: "/assets/controls/k-right.png",
          tooltip: "RIGHT ARROW",
        },
        ps: {
          path: "/assets/controls/ps-right.png",
          tooltip: "D-PAD RIGHT",
        },
        xbox: {
          path: "/assets/controls/ps-right.png",
          tooltip: "D-PAD RIGHT",
        },
      },
    },
    {
      name: "select",
      mark: { top: "126", left: "174" },
      icons: {
        keyboard: { path: "/assets/controls/k-space.png", tooltip: "space" },
        ps: {
          path: "/assets/controls/ps-options.png",
          tooltip: "ps options",
        },
        xbox: {
          path: "/assets/controls/x-options.png",
          tooltip: "xbox options",
        },
      },
    },
    {
      name: "start",
      mark: { top: "126", left: "238" },
      icons: {
        keyboard: { path: "/assets/controls/k-enter.png", tooltip: "enter" },
        ps: { path: "/assets/controls/ps-share.png", tooltip: "ps share" },
        xbox: { path: "/assets/controls/x-share.png", tooltip: "xbox share" },
      },
    },
    {
      name: "b",
      mark: { top: "107", left: "309" },
      icons: {
        keyboard: { path: "/assets/controls/k-z.png", tooltip: "Z" },
        ps: { path: "/assets/controls/ps-cross.png", tooltip: "ps cross" },
        xbox: { path: "/assets/controls/x-a.png", tooltip: "xbox A" },
      },
    },
    {
      name: "a",
      mark: { top: "107", left: "369" },
      icons: {
        keyboard: { path: "/assets/controls/k-x.png", tooltip: "X" },
        ps: { path: "/assets/controls/ps-circle.png", tooltip: "ps circle" },
        xbox: { path: "/assets/controls/x-b.png", tooltip: "xbox B" },
      },
    },
  ],
}
