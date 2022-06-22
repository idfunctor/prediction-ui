// https://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
export function generateId() {
  const firstPart = (Math.random() * 46656) | 0
  const secondPart = (Math.random() * 46656) | 0
  return ("000" + firstPart.toString(36)).slice(-3) + ("000" + secondPart.toString(36)).slice(-3)
}
