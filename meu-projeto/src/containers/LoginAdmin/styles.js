import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5dc; /* bege */
`;

export const Card = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 28rem;
`;

export const IconWrapper = styled.div`
background: linear-gradient(135deg, #f97316, #facc15);
  padding: 1rem;
  border-radius: 50px 50px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #ffffffff;
  margin-bottom: 0.5rem;
  border-radius: 10px 10px;
  background: linear-gradient(90deg, #0e7600ff, #36a100ff);
`;

export const Subtitle = styled.p`
  color: #ffffffff;
  text-align: center;
  margin-bottom: 1.5rem;
  border-radius: 10px 10px;
  background: linear-gradient(90deg, #b80f0fff, #f60808ff);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #623200ff;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: linear-gradient(90deg, #623200ff, #bb4f02ff);
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: #ffffffff;
  background: linear-gradient(90deg, #623300ff, #bb4f02ff)
`;

export const Button = styled.button`
background: linear-gradient(135deg, #f97316, #facc15);
  color: white;
  padding: 0.5rem 0;
  border-radius: 10px 10px 50px 50px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(20deg, #e8701bff, #ad8b00ff);
  }

  &:disabled {
    opacity: 10;
    cursor: not-allowed;
  }
`;

export const TestCredentials = styled.div`
  margin-top: 1.5rem;
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563;
`;
