import { css } from '@emotion/css';

export const Wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  background-color: #fafafa;
  padding: 1rem;

  .header {
    display: flex;
  }

  .tab-list {
    display: flex;
    gap: 0.5rem;
    width: 80%;
  }
  
  .actions {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  .tab {
    cursor: pointer;
    display: flex;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 0.375rem;
    border-style: none;
    background-color: hsla(204, 10%, 100%, 0%);
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    color: hsl(204, 10%, 10%);
  }
  
  .tab:hover {
    background-color: hsla(204, 10%, 87%, 50%);
  }
  
  .tab:focus-visible,
  .tab[data-focus-visible] {
    outline: 2px solid hsl(204, 100%, 40%);
    outline-offset: 2px;
  }
  
  .tab[aria-disabled="true"] {
    opacity: 0.5;
  }
  
  .tab[aria-selected="true"] {
    background-color: hsl(204, 100%, 40%);
    color: hsl(0, 0%, 100%);
  }
  
  .tab:hover[aria-selected="true"] {
    background-color: hsl(204, 100%, 32%);
  }  
`;
