import resend from "../configs/resend";
import React from  "react";

type Params = {
  to: string;
  subject: string;
  text: string;
  react: React.ReactElement;
};

export const sendMail = async ({ to, subject, text, react }: Params) => 
    await resend.emails.send({
        from: "AutoPart Ecommerce <no-reply@autopart-ecommerce.me>",
        to: to,
        subject,
        text,
        react
    })

