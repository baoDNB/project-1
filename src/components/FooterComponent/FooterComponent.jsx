import React from 'react';
import styled from 'styled-components';
import { FacebookOutlined, GithubOutlined, HomeFilled, HomeOutlined, MailFilled, MailOutlined, PhoneFilled, PhoneOutlined } from '@ant-design/icons'
const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
  color: #6c757d;
  font-size: 13px;
`;

const Section = styled.section`
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .social-icons {
    display: flex;
    gap: 15px; /* Thêm gap để cách nhau các icon */
  }

  .social-icons a {
    color: #6c757d;
    font-size: 16px;
    transition: color 0.3s ease;
  }

  .social-icons a:hover {
    color: #007bff;
  }
`;



const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & > div {
    flex: 1;
    margin: 5px;
    min-width: 200px;
  }
`;

const FooterTitle = styled.h6`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #343a40;
  text-transform: uppercase;
`;

const FooterText = styled.p`
  font-size: 12px;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const FooterLink = styled.a`
  color: #6c757d;
  text-decoration: none;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`;

const BottomBar = styled.div`
  text-align: center;
  padding: 10px 0;
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 12px;

  a {
    color: #007bff;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Footer() {
    return (
        <FooterWrapper>
            <Section>
                <div>Liên hệ mình qua các nền tảng:</div>
                <div className="social-icons">
                    <a href="https://web.facebook.com/daongocbao2003" target="_blank" rel="noreferrer">
                        <FacebookOutlined />
                    </a>
                    <a href="mailto:baopa0805@gmail.com">
                        <MailOutlined />
                    </a>
                    <a href="https://github.com/baoDNB" target="_blank" rel="noreferrer">
                        <GithubOutlined />
                    </a>
                </div>
            </Section>

            <Container>
                <Row>
                    <div>
                        <FooterTitle>Đồ án tốt nghiệp hệ cử nhân</FooterTitle>
                        <FooterText>
                            Đồ án được thực hiện bởi Đào Ngọc Bảo - 0180966 sinh viên lớp
                            66CNPM, Khoa Công Nghệ Thông Tin, Trường Đại Học Xây Dựng Hà Nội
                        </FooterText>
                    </div>

                    <div>
                        <FooterTitle>Thông tin liên hệ</FooterTitle>
                        <FooterText>Địa chỉ: Số 55 đường Giải Phóng, Hai Bà Trưng, Hà Nội</FooterText>
                        <FooterText>Điện thoại: (024) 38 696 397</FooterText>
                        <FooterText>Email: dhxaydung@huce.edu.vn</FooterText>
                        <FooterText>Fax: 024.38.691.684</FooterText>
                    </div>

                    <div>
                        <FooterTitle>Cá nhân</FooterTitle>
                        <FooterText >
                            <HomeFilled style={{ padding: '0px 10px 0px 0px' }} />
                            Trương Định, Hai Bà Trưng, Hà Nội
                        </FooterText>
                        <FooterText>
                            <MailFilled style={{ padding: '0px 10px 0px 0px' }} />
                            baopa0805@gmail.com
                        </FooterText>
                        <FooterText>
                            <PhoneFilled style={{ padding: '0px 10px 0px 0px' }} />
                            (+89) 356 298 131
                        </FooterText>
                    </div>
                </Row>
            </Container>

            <BottomBar>
                © 2021 Copyright:
                <a href="https://huce.edu.vn/" target="_blank" rel="noreferrer">
                    Đại Học Xây Dựng Hà Nội
                </a>
            </BottomBar>
        </FooterWrapper>
    );
}
