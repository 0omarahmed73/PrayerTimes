import React, { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { PrayersContext } from "../../context/PrayersContext";
import { useFormik } from "formik";
import * as yup from "yup";

const FormManual = ({ language, handleClose }) => {
  const { methods, handlePrayersManual, setCounter } = useContext(PrayersContext);
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      methods: "1",
      city: "",
      country: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleClose();
      handlePrayersManual(values);
      setCounter();
    },
    validationSchema: yup.object().shape({
      city: yup
        .string(
          language === "ar"
            ? "الرجاء التأكد من ادخال المدينة بشكل صحيح"
            : "Please Enter City's name correctly"
        )
        .required(
          language === "ar"
            ? "الرجاء التأكد من ادخال المدينة"
            : "Please Enter City's name"
        ),
      country: yup
        .string(
          language === "ar"
            ? "الرجاء التأكد من ادخال الدولة بشكل صحيح"
            : "Please Enter Country's name correctly"
        )
        .required(
          language === "ar"
            ? "الرجاء التأكد من ادخال الدولة"
            : "Please Enter Country's name"
        ),
    }),
  });

  return (
    <div className="form">
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <p className="text-dark text-center">{language === "ar"
                ? "ادخل العنوان يدوياً"
                : "Enter Address Manually"}</p>
          <Form.Group className="mb-3" controlId="cityName">
            <Form.Label>
              {language === "ar"
                ? "ادخل اسم المدينة بالانجليزية"
                : "Enter City's Name"}
            </Form.Label>
            <Form.Control
              name="city"
              type="text"
              isInvalid={formik.errors.city && formik.touched.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              placeholder={language === "ar" ? "اسم المدينة" : "City's Name"}
            />
            <Form.Text className="text-danger">
            {formik.errors.city && formik.touched.city ?  formik.errors.city : ''}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="countryName">
            <Form.Label>
              {language === "ar"
                ? "ادخل اسم الدولة بالانجليزية"
                : "Enter Country's Name"}
            </Form.Label>
            <Form.Control
              name="country"
              type="text"
              isInvalid={formik.errors.country && formik.touched.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              placeholder={language === "ar" ? "اسم الدولة" : "Country's Name"}
            />
            <Form.Text className="text-danger">
              {formik.errors.country && formik.touched.country ? formik.errors.country : '' }
            </Form.Text>
          </Form.Group>
          <Form.Group>
          <Form.Label>{language === 'ar' ? 'اختر طريقة القياس' : 'Measurment Method'}</Form.Label>
            <Form.Select
              onChange={formik.handleChange}
              value={formik.values.methods}
            >
              {methods.map((el, idx) => {
                return (
                  <option key={crypto.randomUUID()} value={idx + 1}>
                    {el}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Button
            className="mt-2 d-block m-auto"
            variant="outline-danger"
            type="submit"
            disabled={!formik.isValid ? true : false}
          >
            ابحث
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default FormManual;
