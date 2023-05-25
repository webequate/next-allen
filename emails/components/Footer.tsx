import { MjmlSection, MjmlColumn, MjmlText, MjmlRaw } from "mjml-react";
import Link from "./Link";
import { colors, fontSize, fontWeight } from "../theme";
import assetUrl from "../util/assetUrl";
import accessibleColor from "../util/accessibleColor";

export default function Footer() {
  const fontColor = accessibleColor(
    colors.backgroundColor,
    colors.black,
    colors.gray300
  );
  return (
    <>
      <MjmlSection paddingTop={32} paddingBottom={32}>
        <MjmlColumn>
          <MjmlText
            fontSize={fontSize.xs}
            fontWeight={fontWeight.bold}
            align="center"
            color={fontColor}
          >
            <Link color={fontColor} href="https://portfolio.webequate.com">
              Unsubscribe
            </Link>
            &nbsp;&nbsp; ·&nbsp;&nbsp;
            <Link color={fontColor} href="https://portfolio.webequate.com">
              Terms & Conditions
            </Link>
          </MjmlText>
          <MjmlText fontSize={fontSize.xs} color={fontColor} align="center">
            WebEquate {new Date().getFullYear()}, All rights reserved.
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
    </>
  );
}
