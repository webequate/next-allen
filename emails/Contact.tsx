import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";
import { Template } from "mailing-core";
import Layout from "./components/Layout";
import Button from "./components/Button";
import Heading from "./components/Heading";
import Text from "./components/Text";
import { fontSize, colors } from "./theme";
import assetUrl from "./util/assetUrl";

type ContactProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: Template<ContactProps> = ({ name, email, subject, message }) => {
  return (
    <Layout>
      <MjmlSection
        backgroundColor={colors.neutral900}
        cssClass="gutter border"
        paddingTop={40}
        paddingBottom={16}
      >
        <MjmlColumn>
          <Heading
            fontSize={fontSize.lg}
            lg={{ fontSize: fontSize.lg }}
            align="left"
            maxWidth={450}
            paddingBottom={32}
          >
            Your AllensAliens.com contact form was submitted!
          </Heading>
          <Text color={colors.lightSecondary} paddingBottom={4}>
            Name:
          </Text>
          <Text color={colors.lightPrimary} paddingBottom={24}>
            {name}
          </Text>
          <Text color={colors.lightSecondary} paddingBottom={4}>
            Email:
          </Text>
          <Text color={colors.lightAccent} paddingBottom={24}>
            <a href={`mailto:${email}`} style={{ color: "inherit" }}>
              {email}
            </a>
          </Text>
          <Text color={colors.lightSecondary} paddingBottom={4}>
            Subject:
          </Text>
          <Text color={colors.lightPrimary} paddingBottom={24}>
            {subject}
          </Text>
          <Text color={colors.lightSecondary} paddingBottom={4}>
            Message:
          </Text>
          <Text color={colors.lightPrimary} paddingBottom={24}>
            {message}
          </Text>
        </MjmlColumn>
      </MjmlSection>
    </Layout>
  );
};

export default Contact;
