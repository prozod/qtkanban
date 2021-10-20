import styled from "styled-components";

const BasicButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: fit-content;

  button {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 22px;
    font-size: 0.75;
    font-weight: 600;
    color: #2e2e2e;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #e3e4e6;
    position: relative;
    width: 100%;

    span {
      margin-right: 5px;
      position: relative;
      top: 1px;
    }

    &:hover {
      background-color: #e3e4e6;
    }
  }
`;

export default function Button({ children, icon, onClick, type, id }) {
  return (
    <BasicButton>
      <button onClick={onClick} type={type} id={id}>
        <span>{icon}</span>
        {children}
      </button>
    </BasicButton>
  );
}
