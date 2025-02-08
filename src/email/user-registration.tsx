import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface UserRegistrationEmailProps {
  username: string
  loginUrl: string
}

export const UserRegistrationEmail = ({
  username = 'there',
  loginUrl = 'https://gimmedoc.com/login',
}: UserRegistrationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to GimmeDoc - Your Account is Ready</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logo}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>GimmeDoc</Text>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            Welcome to GimmeDoc! We&apos;re excited to have you on board. Your account has been
            successfully created and is ready to use.
          </Text>
          <Text style={paragraph}>With GimmeDoc, you can now:</Text>
          <Text style={listItem}>• Create and manage legal documents</Text>
          <Text style={listItem}>• Collaborate with clients</Text>
          <Text style={listItem}>• Track document progress</Text>
          <Section style={buttonContainer}>
            <Button style={button} href={loginUrl}>
              Get Started
            </Button>
          </Section>
          <Text style={paragraph}>
            If you have any questions or need assistance, our support team is here to help.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>© {new Date().getFullYear()} GimmeDoc. All rights reserved.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const logo = {
  padding: '32px 48px',
}

const content = {
  padding: '0 48px',
}

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const listItem = {
  ...paragraph,
  marginLeft: '20px',
}

const buttonContainer = {
  padding: '32px 0',
}

const button = {
  backgroundColor: '#0f172a',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 20px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}

export default UserRegistrationEmail
