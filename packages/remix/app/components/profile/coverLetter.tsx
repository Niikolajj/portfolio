import type { applicationType } from "~/api/strapi";
import type { themeType } from "~/routes/profile";
import Body from "./coverletter/body";
import Header from "./coverletter/header";

export default function CoverLetter({
  application,
  theme,
}: {
  application: applicationType;
  theme: themeType;
}) {
  const { profile, recipient, coverLetter } = application;
  return (
    <>
      <Header
        personal={profile.personal}
        theme={theme}
        recipient={recipient}
        date={coverLetter.date}
      />
      <Body
        personal={profile.personal}
        coverLetter={coverLetter}
        recipient={recipient}
        theme={theme}
      />
    </>
  );
}
