import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;

export const BoardArea = styled.div`
  border: 1px solid #e3e4e6;
  min-height: 300px;
  min-width: 200px;
  width: 15vw;
  max-width: 300px;
  overflow: hidden;
  font-family: "Fira Sans", sans-serif;
  margin-right: 10px;
  height: auto;
  display: flex;
  margin-bottom: 15px;
  flex-direction: column;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    text-align: center;
    font-weight: 600;
    position: relative;
    margin: 1em 0;

    &:before {
      content: "";
      position: absolute;
      left: -20px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: ${(props) => (props.dotColor ? props.dotColor : "")};
    }
    &:after {
      content: "";
      position: absolute;
      left: -16px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #f5f6f8;
    }
  }
`;

export const Cards = styled.div`
  position: relative;
  margin: 10px 15px;

  .emptyboard {
    margin: 0 auto;
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 1em 0;
    color: #636363;
  }
`;

export const NewTask = styled.div`
  position: relative;
  margin: 0 15px;
`;
