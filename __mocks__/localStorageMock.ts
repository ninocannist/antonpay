const localStorageMock = (function () {
  let store = {}
  return {
    getItem: function (key: any): any {
      return store[key as keyof typeof store] || null
    },
    setItem: function (key: string, value: any): any {
      //@ts-ignore
      store[key] = value.toString()
    },
    clear: function () {
      store = {}
    },
    removeItem: function (key: string): any {
      delete store[key as keyof typeof store]
    },
  }
})()
export default Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
