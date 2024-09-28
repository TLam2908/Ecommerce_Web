import resend from "../configs/resend";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendMail = async ({ to, subject, text, html }: Params) => {
    const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: to,
        subject,
        text,
        html
    })
    return response
};
