import { spacing, colors, screens } from "../theme";

const cssHelpers = `
  /* Utility classes */
  .gutter {
    padding-left: ${spacing.mobileGutter}px !important;
    padding-right: ${spacing.mobileGutter}px !important;
  }
  .border-top {
    border-top: 1px solid ${colors.lightTertiary};
  }
  .border-bottom {
    border-bottom: 1px solid ${colors.lightTertiary};
  }
  .border {
    border-left: 1px solid ${colors.lightTertiary};
    border-right: 1px solid ${colors.lightTertiary};
  }
  .no-wrap {
    white-space: nowrap;
  }
  .hidden {
    display: none;
    max-width: 0px;
    max-height: 0px;
    overflow: hidden;
    mso-hide: all;
  }
  .lg-hidden {
    display: none;
    max-width: 0px;
    max-height: 0px;
    overflow: hidden;
    mso-hide: all;
  }

  @media (min-width: ${screens.xs}) {
    /* Utility classes */
    .gutter {
      padding-left: ${spacing.desktopGutter}px !important;
      padding-right: ${spacing.desktopGutter}px !important;
    }
    .sm-hidden {
      display: none;
      max-width: 0px;
      max-height: 0px;
      overflow: hidden;
      mso-hide: all;
    }
    .lg-hidden {
      display: block !important;
      max-width: none !important;
      max-height: none !important;
      overflow: visible !important;
      mso-hide: none !important;
    }
  }
  `;

export default cssHelpers;
