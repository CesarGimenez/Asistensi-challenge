import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { useUser } from "../hooks/useUser";

export const AddEditUserForm = ({ user, onRefetch, openCloseModal }) => {
  const [validated, setValidated] = useState(false);
  const { addUser, updateUser } = useUser();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object().shape(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (!user) {
        await addUser(formValue);
        // toast.success("User created succesfully");
        onRefetch();
      } else {
        await updateUser(user._id, formValue);
      }
      setValidated(true);
      onRefetch();
      openCloseModal();
    },
  });
  console.log(formik.values);
  return (
    <Form onSubmit={formik.handleSubmit} noValidate validated={validated}>
      <Form.Group className="mb-2">
        <Form.Label>first name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Write name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.errors.first_name}
        />
        {formik.errors.first_name && (
          <span className="text-danger">{formik.errors.first_name}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Write the last name"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.errors.last_name}
        />
        {formik.errors.last_name && (
          <span className="text-danger">{formik.errors.last_name}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Escriba el email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <span className="text-danger">{formik.errors.email}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="write password"
          name="password"
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <span className="text-danger">{formik.errors.password}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>DNI</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Insert DNI"
          name="dni"
          value={formik.values.dni}
          onChange={formik.handleChange}
        />
        {formik.errors.dni && (
          <span className="text-danger">{formik.errors.dni}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Insert phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.errors.dni && (
          <span className="text-danger">{formik.errors.dni}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Sex</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => formik.setFieldValue("sex", e.target.value)}
          value={formik.values.sex}
        >
          <option>Select a sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Select>
        {formik.errors.sex && (
          <span className="text-danger">{formik.errors.sex}</span>
        )}
      </Form.Group>

      {user && (
        <Form.Group className="mb-2">
          <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => formik.setFieldValue("status", e.target.value)}
            value={formik.values.status || "Active"}
          >
            <option>Select a status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </Form.Select>
        </Form.Group>
      )}

      <Button variant="primary" type="submit" className="mt-3">
        {user ? `Update user` : `Create user`}
      </Button>
    </Form>
  );
};

const initialValues = (user) => {
  return {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: user?.password || "",
    phone: user?.phone || "",
    dni: user?.dni || "",
    sex: user?.sex || "",
    status: user?.status || "Active",
  };
};

const newValidationSchema = () => {
  return {
    // first_name: Yup.string().required("first name is required"),
    // last_name: Yup.string().required("last name is required"),
    // email: Yup.string().email("Email is invalid").required("Email is required"),
    // phone: Yup.number("Only numbers").required("Phone is required"),
    // sex: Yup.string().required("Sex is required"),
    // status: Yup.boolean(),
  };
};
