type ValueOf<T> = T[keyof T]

export const groupBy = <T>(arr: T[], prop: keyof T, returns?: keyof T) => {
  const obj: { [key: string | number]: unknown } = {}
  arr.forEach((v: T) => {
    obj[v[prop] as string | number] = returns ? v[returns] : v
  })

  return obj
}
