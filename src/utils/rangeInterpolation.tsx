const lerp = (x, y, a) => x * (1 - a) + y * a
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a))
const invlerp = (x, y, a) => clamp((a - x) / (y - x))
export const rangeInterpolation = (x1, y1, x2, y2, a) =>
    Math.round(lerp(x2, y2, invlerp(x1, y1, a)))
