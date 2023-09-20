import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { PrayersContext } from "../../context/PrayersContext";

const Footer = () => {
  const { prayers, language } = useContext(PrayersContext);
  return (
    <footer className="footer pb-3">
      <Container>
        {prayers ? (
          prayers.length ? (
            <p className="text-white text-center my-2">
              {language === "ar"
                ? `جميع الحقوق محظفوظة لدى عمر احمد سعيد ${
                    prayers.date.hijri.date.split("-")[3]
                  }`
                : language === "en"
                ? `All copyright reserved Omar Ahmed ${
                    prayers.date.hijri.date.split("-")[3]
                  }`
                : ""}
            </p>
          ) : (
            <p className="text-white text-center  my-2">
              {" "}
              {language === "ar"
                ? `جميع الحقوق محظفوظة لدى عمر احمد سعيد 1444`
                : language === "en"
                ? `All copyright reserved Omar Ahmed 1444`
                : ""}{" "}
            </p>
          )
        ) : (
          ""
        )}
      </Container>
    </footer>
  );
};

export default Footer;
