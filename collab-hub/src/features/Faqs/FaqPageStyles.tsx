import styled from 'styled-components';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px;
`;

export const InfoContainer = styled.div`
  width: 80%;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  color: #212529;
  margin-bottom: 20px;
  text-align: center;
`;

export const Text = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
`;

export const FaqContainer = styled.div`
  margin-top: 20px;
`;

export const FaqItem = styled.div`
  margin-bottom: 15px;
`;

export const Question = styled.h2`
  font-size: 1.5rem;
  color: #495057;
`;

export const Answer = styled.p`
  font-size: 1rem;
  color: #6c757d;
`;

