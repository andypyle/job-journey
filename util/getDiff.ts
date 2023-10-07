export function getDiff<T, K extends keyof T>(
  oldObj: T,
  newObj: T
): { [key: string]: T[keyof T] } {
  const changedKeys: { [key: string]: T[keyof T] } = {}

  Object.keys(oldObj as any).forEach((key: string) => {
    if (oldObj[key as K] !== newObj[key as K]) {
      changedKeys[key] = newObj[key as K]
    }
  })

  return changedKeys
}
