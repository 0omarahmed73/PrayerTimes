import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { PrayersContext } from "../context/PrayersContext";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import FormAuto from "../components/Form/FormAuto";
import FormManual from "../components/Form/FormManual";
import moment from "moment";
import Footer from "../components/Footer/Footer";

const En = () => {
  const [timeI, setTimeI] = useState(
    moment().format("MMM Do YYYY | h:mm:ss")
  );
  useEffect(() => {
    const set = setTimeout(() => {
      setTimeI(moment().format("Do MMM YYYY | h:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(set);
    };
  });

  const { setLanguage, prayers, error, loading , newPrayer , setCounter , language , newTime } = useContext(PrayersContext);
  const [show, setShow] = useState({
    type: null,
    show: false,
  });

  const handleClose = () => {
    setShow({
      type: null,
      show: false,
    });
  };
  const handleShow = (type) =>
    setShow({
      type: type,
      show: true,
    });
  document.dir = "ltr";
  useEffect(() => {
    setLanguage("en");
  });
  useEffect (() => {
    const setInt = setInterval(() => setCounter() , 1000)
    return () => {
      clearInterval(setInt)
    }
  } , [language, setCounter])
  return (
    <div className="main">
      <Navbar />
      <Container className="d-flex justify-content-center mt-3 flex-column">
        <div className="select-method d-flex gap-4 flex-wrap">
          <Button onClick={() => handleShow("auto")} className="btn-blue">
            Determine location automatically
          </Button>
          <Button onClick={() => handleShow("manual")} className="btn-blue">
            Enter location manually
          </Button>
        </div>
        {loading && !error? (
          <div className="prayers d-flex flex-column justify-content-center w-100 text-center">
            <p className="text-white mt-3 mb-3">Loading...</p>
            <div className="loader m-auto mb-3"></div>
          </div>
        ) : (
          ""
        )}
        {prayers && !loading ? (
          prayers.timings ? (
            <div className="prayers d-flex flex-column justify-content-center w-100 text-center">
              <p className="text-white mb-1">{prayers.meta.timezone}</p>
              <div className="text-white mb-2">
                {" "}
                {prayers.date.hijri.weekday.en} - {prayers.date.hijri.date}
              </div>
              <div className="text-white mb-2">
                {" "}
                {timeI}
              </div>
              <Row
                lg="5"
                md="3"
                xs="1"
                sm="2"
                className="d-flex justify-content-center"
              >
                <Col>
                  <div className="img">
                    <img
                      src="https://t3.ftcdn.net/jpg/02/66/28/06/360_F_266280618_u965QoSBPyXjcZjYEoPDOraIr0YAFwW0.jpg"
                      alt=""
                    />
                  </div>
                  <p className="text-white">
                    Dhuhr : {prayers.timings.Dhuhr + " PM"}
                  </p>
                </Col>
                <Col>
                  <div className="img">
                    <img
                      src="https://as2.ftcdn.net/v2/jpg/05/73/59/09/1000_F_573590956_UHs64WKFYf2G7UOg7EV1PfL2FVDzQnyt.jpg"
                      alt=""
                    />
                  </div>
                  <p className="text-white">
                    Asr :{" "}
                    {`${prayers.timings.Asr.split(":")[0] - 12}:${
                      prayers.timings.Asr.split(":")[1]
                    } PM`}
                  </p>{" "}
                </Col>
                <Col>
                  <div className="img">
                    <img
                      src="https://i.pinimg.com/736x/ef/8d/ca/ef8dca4534714f1c652a29385e728923.jpg"
                      alt=""
                    />
                  </div>
                  <p className="text-white">
                    Maghrib :{" "}
                    {`${prayers.timings.Maghrib.split(":")[0] - 12}:${
                      prayers.timings.Maghrib.split(":")[1]
                    } PM`}
                  </p>
                </Col>
                <Col>
                  <div className="img">
                    <img
                      src="https://media.istockphoto.com/id/1221263213/photo/a-realistic-arabian-interior-miniature-with-window-and-columns-silhouette-of-muslim-praying.jpg?s=612x612&w=0&k=20&c=2cSQf-nazX447pSMy5oiTs0Ha4i8mVzk5ZlwsY2P4jo="
                      alt=""
                    />
                  </div>
                  <p className="text-white">
                    Isha :{" "}
                    {`${prayers.timings.Isha.split(":")[0] - 12}:${
                      prayers.timings.Isha.split(":")[1]
                    } PM`}
                  </p>
                </Col>
                <Col>
                  <div className="img">
                    <img
                      src="https://img.freepik.com/premium-photo/muslim-man-sitting-prayer-mat-mosque_931022-6343.jpg?w=360"
                      alt=""
                    />
                  </div>
                  <p className="text-white">
                    Fajr : {prayers.timings.Fajr + " AM"}
                  </p>
                </Col>
              </Row>
              <p className="text-white mt-1 mb-0">
                Remaining Time on {newPrayer.en}
              </p>
              <p className="text-white mt-1 mb-0">
              {newTime}
              </p>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        {error && !loading  ? (
          <div className="prayers d-flex flex-column justify-content-center w-100 text-center">
              <p className="text-danger mb-0">
                Error happened in fetching data , Please try again!
              </p>
            </div>
        ) : ''}
      </Container>
      <Modal show={show.show} centered={true} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Prayer Times</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show.type === "auto" ? (
            <FormAuto language="en" handleClose={handleClose} />
          ) : show.type === "manual" ? (
            <FormManual language="en" handleClose={handleClose} />
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
      <Footer/>
    </div>
  );
};

export default En;
