import { useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Instance } from "../../api";
import { ProductContext } from "../../context";

const Login = () => {
  const navigate = useNavigate()
  const { getAllUsers } = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const login = await Instance.post("auth/login", data);
      const token = login.data.token;
      if (login.data?.tipo === true) {
        localStorage.setItem("token", token);
        localStorage.setItem("url", login.data.url);
        getAllUsers();
        navigate(`/${login.data.url}`);
      }else{
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
    }
    reset();
  }

  return (
    <>
      <Card className="container p-4 mt-5 col-4">
        <Card.Title className="mb-5">Login</Card.Title>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} className="row gap-3 justify-content-center">
            <Form.Group controlId="validationCustom01">
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
            <Form.Group controlId="validationCustom02">
              <Form.Label>Password</Form.Label>
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
            <Button type="submit" className="col-5">Login</Button>
            <Link className="col-4" to="/register" relative="path">¿No tienes cuenta?</Link>
        </Form>
      </Card>
    </>
  );
};

export { Login };
