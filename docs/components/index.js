import { css } from '@emotion/css'

const flex = css`
  display: flex;
  margin-bottom: 24px;
`

const butt = css`
  padding: 8px;
  background: rgb(254, 224, 64);
  border-radius: 4px;
  margin-right: 8px;
  border: none;
  font-size: 15px;
  cursor: pointer;
  margin-top: 16px;
`

export const Flex = (props) => (
  <div className={flex} {...props} />
)

export const Button = (props) => (
  <button className={butt} {...props} />
)