import styled from "styled-components";

export const Main = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom, #fff7ee, #ffffff);
`;

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 1.5rem;
  margin: 3rem 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.header`
  text-align: left;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #ff6b00;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  color: #1f1f1f;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const Section = styled.div`
  background-color: #fffaf6;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ffe5d1;
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  color: #ff6b00;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.4rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;

  &:focus {
    border-color: #ff8a3d;
    box-shadow: 0 0 4px rgba(255, 138, 61, 0.3);
  }
`;

export const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  height: 80px;
  font-size: 0.95rem;
  outline: none;

  &:focus {
    border-color: #ff8a3d;
    box-shadow: 0 0 4px rgba(255, 138, 61, 0.3);
  }
`;

export const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  background-color: white;
  color: #333;
  outline: none;

  &:focus {
    border-color: #ff8a3d;
    box-shadow: 0 0 4px rgba(255, 138, 61, 0.3);
  }
`;

export const CampoObrigatorio = styled.span`
    color: red;
    margin-left: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #ff8533;
  }
`;
