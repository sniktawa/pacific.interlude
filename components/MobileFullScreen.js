import { use100vh } from 'react-div-100vh'

export const MobileFullScreen = ({ children }) => {
  const height = use100vh()
  const halfHeight = height ? height - 30 : '95vh'
  return <div style={{ height: halfHeight }}>{children}</div>
}