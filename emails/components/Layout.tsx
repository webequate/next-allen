import {
  Mjml,
  MjmlBody,
  MjmlImage,
  MjmlWrapper,
  MjmlSection,
  MjmlColumn,
  MjmlHead,
  MjmlFont,
  MjmlStyle,
  MjmlAttributes,
  MjmlAll,
  MjmlText,
} from "mjml-react";
import Footer from "../components/Footer";
import Link from "../components/Link";
import {
  colors,
  fontSize,
  borderRadius,
  spacing,
  screens,
  themeDefaults,
} from "../theme";
import assetUrl from "../util/assetUrl";
import cssHelpers from "../util/cssHelpers";

export default function Layout({ children }: any) {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlFont
          name="Poppins"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800"
        />
        <MjmlStyle>{`
          table, td {
            table-layout: fixed;
          }
          .top-section {
            border-radius: ${borderRadius.base}px ${borderRadius.base}px 0 0;
            border: 1px solid ${colors.lightTertiary};
            padding-top: 24px !important;
          }
          .bottom-section {
            border-radius: 0 0 ${borderRadius.base}px ${borderRadius.base}px;
            border: 1px solid ${colors.lightTertiary};
            padding-bottom: 24px !important;
          }
          .card-gutter {
            padding-left: ${spacing.mobileGutter - 10}px !important;
            padding-right: ${spacing.mobileGutter - 10}px !important;
          }
          @media (min-width: ${screens.xs}) {
            .top-section {
              padding-top: 24px !important;
            }
            .card-gutter {
              padding-left: ${spacing.desktopGutter - 10}px !important;
              padding-right: ${spacing.desktopGutter - 10}px !important;
            }
          }

          ${cssHelpers}
      `}</MjmlStyle>
        <MjmlAttributes>
          <MjmlAll {...themeDefaults} />
        </MjmlAttributes>
      </MjmlHead>

      <MjmlBody width={640} backgroundColor={colors.black}>
        <MjmlWrapper
          fullWidth={true}
          padding="24px 16px"
          cssClass="border-ring"
        >
          <MjmlSection
            backgroundColor={colors.neutral900}
            cssClass="top-section gutter border-bottom"
            paddingBottom={24}
          >
            <MjmlColumn>
              <MjmlImage
                width="256px"
                height="45px"
                align="center"
                src={assetUrl("/assets/logo-webequate-light.png")}
              />
            </MjmlColumn>
          </MjmlSection>

          {children}

          <MjmlSection
            backgroundColor={colors.neutral900}
            cssClass="bottom-section gutter border-top"
            paddingTop={20}
          >
            <MjmlColumn>
              <MjmlText fontSize={fontSize.sm} align="center">
                <strong>Need help?</strong>{" "}
                <span className="no-wrap">We’re here for you! </span>
                <span className="no-wrap">
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://portfolio.webequate.com/contact"
                    style={{
                      color: colors.lightAccent,
                      textDecoration: "underline",
                    }}
                  >
                    Reach out
                  </a>{" "}
                  anytime.
                </span>
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <Footer />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  );
}
