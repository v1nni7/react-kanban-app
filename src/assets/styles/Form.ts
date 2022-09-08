import styled from "styled-components";
import { Form } from "formik";
import { Link } from "react-router-dom";

const Horizontal = styled(Form)`
  margin: 0 auto;
  width: 400px;
  padding: 8px;
  display: block;
  border-radius: 12px;
  background-color: #444;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  padding: 18px;
  text-align: center;
`;

const Group = styled.div`
  padding: 8px;
  position: relative;
`;

const FlexGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 8px;

  hr {
    padding: 4px;
    margin: 0 12px;
    border: none;
    border-radius: 50%;
    background-color: #fff;
  }
`;

const Label: any = styled.label`
  top: ${({ filled }: any) => (filled ? "24px" : "12px")};
  left: 20px;
  color: #000;
  transition: 0.1s;
  position: absolute;
  font-size: ${({ filled }: any) => (filled ? "1.1rem" : "0.9rem")};
`;

const Control = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  padding: 18px 12px 0;

  &:focus ~ label {
    top: 12px;
    font-size: 0.9rem;
  }

  &:disabled {
    color: #000;
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

const Submit = styled.button`
  border: none;
  width: 100%;
  padding: 10px;
  transition: 0.2s;
  font-size: 1.2rem;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  color: #fff;
  background-color: #7e57c2;

  &:hover {
    background-color: #673ab7;
  }
`;

const Action: any = styled(Link)`
  color: #7e57c2;
  transition: 0.2s;
  text-align: ${({ align }: any) => align || "start"};

  &:hover {
    color: #7f46e3;
  }
`;

export default {
  Horizontal,
  Title,
  Group,
  FlexGroup,
  Label,
  Control,
  Checkbox,
  Submit,
  Action,
};