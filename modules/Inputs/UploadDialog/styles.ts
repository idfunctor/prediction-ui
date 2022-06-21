import { css, cx } from '@emotion/css';

export const uploadedItemList = css`
  margin: 0.5rem 0;
  display: flex;
  width: 100%;
  max-height: 480px;
  overflow-y: auto;
  div {
    display: flex;
    width: 65px;
    height: 65px;
    margin: 0 2px;

    img {
      object-fit: cover; 
      height: auto;
      width:100%;
    }
  }
`; 

const shared = css`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`;

export const dropzone = cx(css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: 8px;
  height: 120px;
  background: #f7fafe;
  transition: all .15s linear;
  border: 1px dashed rgb(102, 149, 243);
  border-radius: 4px;
  font-size: 1rem;
  color: #195aff;
  cursor: pointer;
`, shared);

export const clearButtonWrapper = cx(css`
  button {
    width: 100%;
  }
`, shared);
