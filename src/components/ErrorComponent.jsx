import { XCircle } from "lucide-react";
import React from "react";
import { styled } from "styled-components";

function ErrorComponent({ errorMessage }) {
  return (
    <Div>
      <XCircle size={200} color="#263a29" />
      <p className=" md:text-4xl text-xl font-bold mt-4">{errorMessage}</p>
    </Div>
  );
}
const Div = styled.div`
  height: calc(100vh - (104px));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ErrorComponent;
