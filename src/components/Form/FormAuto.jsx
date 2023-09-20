import React, { useContext, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { PrayersContext } from "../../context/PrayersContext";
import { useFormik } from "formik";
import Methods from "../Methods";

const FormAuto = ({handleClose , language}) => {
  const { methods, handleLocation , location , handlePrayers , setCounter  } = useContext(PrayersContext);
  const formik = useFormik({
    initialValues : {
      methods : '1'
    }, onSubmit : (values) => {
      console.log(values);
      handleClose();
      handlePrayers(values.methods);
      setCounter()
    }
  })
  useEffect(() => {
    handleLocation()
    
  } , [handleLocation])
  return (
    <div className="form">
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <p className="text-dark text-center">{language === 'ar' ? 'تحديد العنوان تلقائياً' : 'Determine the location automatically'}</p>
          <Form.Group>
            <Form.Label>{language === 'ar' ? 'اختر طريقة القياس' : 'Measurment Method'}</Form.Label>
            <Form.Select name='methods' value={formik.values.methods} onChange={formik.handleChange}>
              {<Methods/>}
            </Form.Select>
          </Form.Group>
          <Button
            className="mt-2 d-block m-auto"
            variant="outline-danger"
            type="submit"
          >
            {language === 'ar' ? 'ابحث' : 'Search'}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default FormAuto;
