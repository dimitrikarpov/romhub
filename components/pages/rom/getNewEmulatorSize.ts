/**
 * Calculates new emulator width and height
 * depending on container's dimensions
 * to achieve max emaulator's area with saving aspect ration
 *
 * @param cw containerWidth
 * @param ch containerHeight
 * @returns [width, height]
 */
export const getNewEmulatorSize = ({
  cw,
  ch,
}: {
  cw: number
  ch: number
}): [width: number, height: number] => {
  const aspect = 800 / 600

  const possibleHeight = Math.floor(cw / aspect)
  const possibleWidth = Math.floor(ch * aspect)

  const isPossibleWidthWillFitContainerHeight = possibleHeight < ch

  return isPossibleWidthWillFitContainerHeight
    ? [cw, possibleHeight]
    : [possibleWidth, ch]
}
