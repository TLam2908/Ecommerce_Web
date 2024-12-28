// "dev": "next dev",
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ReceiptProps {
  cartEmail: {
    id: number;
    user: string;
    email: string;
    address: string;
    phone: string;
    date: string;
    items: {
      name: string;
      quantity: number;
      price: number;
      img: string;
    }[];
    total: number;
  };

  // other properties
}

export const Receipt: React.FC<ReceiptProps> = ({cartEmail}) => (
    <Html>
      <Head />
      <Preview>Your AutoPart Order Confirmation #{String(cartEmail.id)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={global.heading}>AutoPart</Heading>
          </Section>
  
          <Hr style={global.hr} />
  
          <Section style={message}>
            <Heading as="h2" style={global.subheading}>
              Thank You For Your Order!
            </Heading>
            <Text style={global.text}>
              We're processing your order and will send you another email when it
              ships. Your estimated delivery date is in 3-5 business days.
            </Text>
          </Section>
  
          <Hr style={global.hr} />
  
          <Section style={global.defaultPadding}>
            <Text style={addressTitle}>Shipping to:</Text>
            <Text style={global.text}>
              {cartEmail.user}
              <br />
              {cartEmail.address}
            </Text>
          </Section>
  
          <Hr style={global.hr} />
  
          {cartEmail.items.map((item, index) => (
            <Section key={index} style={itemContainer}>
              <Row>
                <Column style={{ width: "100px" }}>
                  <Img
                    src={item.img}
                    width="80"
                    height="80"
                    alt={item.name}
                    style={itemImage}
                  />
                </Column>
                <Column>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemPrice}>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </Text>
                </Column>
              </Row>
            </Section>
          ))}
  
          <Hr style={global.hr} />
  
          <Section style={global.defaultPadding}>
            <Row>
              <Column style={{ width: "50%" }}>
                <Text style={global.label}>Order Number</Text>
                <Text style={global.value}>{cartEmail.id}</Text>
              </Column>
              <Column style={{ width: "50%" }}>
                <Text style={global.label}>Order Date</Text>
                <Text style={global.value}>{cartEmail.date}</Text>
              </Column>
            </Row>
          </Section>
  
          <Section style={summary}>
            <Row>
              <Column style={{ width: "60%" }}>
                <Text style={totalLabel}>Total</Text>
              </Column>
              <Column style={{ width: "40%" }}>
                <Text style={totalValue}>${cartEmail.total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>
  
          <Hr style={global.hr} />
  
          <Section style={footer}>
            <Text style={footer.text}>
              Questions about your order? Visit our Help Center 
            </Text>
            <Text style={footer.text}>
              © 2024 AutoPart, Inc. All Rights Reserved.
            </Text>
            <Text style={footer.text}>
              AutoPart, Km 10 Nguyen Trai Street, Mo Lao Ward,
              <br />
              Ha Dong District, Hanoi, Vietnam
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default Receipt;
  
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    backgroundColor: "#ffffff",
    margin: "24px auto",
    width: "600px",
    maxWidth: "100%",
    border: "1px solid #e6e6e6",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  };
  
  const header = {
    backgroundColor: "#f8f9fa",
    padding: "24px",
  };
  
  const message = {
    padding: "32px 40px",
    textAlign: "center",
  } as React.CSSProperties;
  
  const itemContainer = {
    padding: "20px 40px",
  };
  
  const itemImage = {
    borderRadius: "4px",
    border: "1px solid #e6e6e6",
  };
  
  const summary = {
    padding: "24px 40px",
    backgroundColor: "#f8f9fa",
  };
  
  const footer = {
    padding: "32px 40px",
    backgroundColor: "#f8f9fa",
    text: {
      margin: "8px 0",
      color: "#6b7280",
      fontSize: "12px",
      textAlign: "center",
      lineHeight: "16px",
    } as React.CSSProperties,
  };
  
  const global = {
    hr: {
      borderColor: "#e6e6e6",
      margin: "0",
    },
    heading: {
      fontSize: "24px",
      lineHeight: "1",
      fontWeight: "600",
      textAlign: "center",
      margin: "0",
      color: "#374151",
    } as React.CSSProperties,
    subheading: {
      fontSize: "20px",
      lineHeight: "1.4",
      fontWeight: "600",
      textAlign: "center",
      margin: "0",
      color: "#374151",
    } as React.CSSProperties,
    text: {
      fontSize: "14px",
      lineHeight: "24px",
      color: "#4b5563",
      margin: "16px 0",
    },
    label: {
      fontSize: "14px",
      color: "#6b7280",
      margin: "8px 0",
    },
    value: {
      fontSize: "14px",
      color: "#374151",
      fontWeight: "500",
      margin: "8px 0",
    },
    defaultPadding: {
      padding: "24px 40px",
    },
  };
  
  const addressTitle = {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "600",
    margin: "0 0 8px 0",
  };
  
  const itemName = {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
    margin: "0 0 4px 0",
  };
  
  const itemSpecs = {
    fontSize: "12px",
    color: "#6b7280",
    margin: "0 0 8px 0",
  };
  
  const itemPrice = {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
    margin: "0",
  };
  
  const totalLabel = {
    fontSize: "16px",
    color: "#374151",
    fontWeight: "600",
    margin: "16px 0 8px 0",
  };
  
  const totalValue = {
    fontSize: "16px",
    color: "#374151",
    fontWeight: "600",
    margin: "16px 0 8px 0",
  };
  