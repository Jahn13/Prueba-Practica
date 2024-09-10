import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Instance } from "../../api";

const Register = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const register = await Instance.post("usuarios", data);
      console.log(register);
        navigate("/login")
        reset()
    } catch (error) {
      console.log(error);
    }
    // reset();
  };

  return (
    <>
      <Card className="container p-4 mt-5 col-4">
        <Card.Title className="mb-5">Registro</Card.Title>
        <Form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="row gap-3 justify-content-center"
        >
          <Form.Group controlId="validationCustom01">
            <Form.Label className="text-start">Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name"
              {...register("nombre", { required: "Name is required" })}
              isInvalid={errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre && errors.nombre.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label className="text-start">Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom03">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
              isInvalid={errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom04">
            <Form.Label>Confirmación de Contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password confirmation"
              {...register("password_confirmation", {
                required: "Password confirmation is required",
              })}
              isInvalid={errors.password_confirmation}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password_confirmation &&
                errors.password_confirmation.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="col-5">
            Registro
          </Button>
          <Link to="/login">Volver</Link>
        </Form>
      </Card>
    </>
  );
};

export { Register };
