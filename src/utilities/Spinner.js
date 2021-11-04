import styled from "styled-components";

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3em;
  flex: 1;

  p {
    font-family: "Fira Sans", sans-serif;
    font-weight: 600;
    margin-top: 1.5em;
    color: rgb(28, 28, 28);
  }
`;

const Circle = styled.div`
    margin-bottom: 0.5em;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(25, 33, 79,.3);
  border-radius: 50%;
  border-top-color: #19214f;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }


`;

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <Circle />
      <p>Hold on, we are getting your data!</p>
    </SpinnerWrapper>
  );
}
