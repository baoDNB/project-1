import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
  color: #6c757d;
`;

const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .social-icons a {
    color: #6c757d;
    margin-right: 15px;
    font-size: 20px;
    transition: color 0.3s ease;
  }

  .social-icons a:hover {
    color: #007bff;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & > div {
    flex: 1;
    margin: 10px;
    min-width: 250px;
  }
`;

const FooterTitle = styled.h6`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #343a40;
  text-transform: uppercase;
`;

const FooterText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.6;
`;

const FooterLink = styled.a`
  color: #6c757d;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`;

const BottomBar = styled.div`
  text-align: center;
  padding: 15px 20px;
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 14px;

  a {
    color: #007bff;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;