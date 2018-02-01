export interface messageData {
  state?: messageState
}

export interface messageState {
  name?: string,
  value?: any,
  runByTag?: string
}
