//Author : Jainish Patel

import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px;
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  color: #212529;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;

export const LeftTextSection = styled.div`
  width: 30%;
  padding-right: 70px;
  margin-top: 100px;
`;

export const Text = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  text-align: left;
`;

export const InfoContainer = styled.div`
  width: 40%;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  height: 100px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
