import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { ProductContext } from "../../context";
import { useForm } from "react-hook-form";

const Home = () => {
  const [cvUrl, setCvUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const { dataUsers, getTokenFromLocalStorage, removeTokenFromLocalStorage } = useContext(ProductContext);
  const url = localStorage.getItem("url");
  const {
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Obtener el CV del usuario
  const fetchCv = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await axios.get(
        "https://candidates-exam.herokuapp.com/api/v1/usuarios/mostrar_cv",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCvUrl(response.data.url); // Actualiza con la URL del CV
    } catch (error) {
      console.log("Error fetching CV:", error);
    }
  };

  // Manejar la subida del CV
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
      setUploadError("");
    } else {
      setUploadError("El archivo debe ser .pdf y no mayor a 5MB.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const token = getTokenFromLocalStorage();

    const formData = new FormData();
    formData.append("curriculum", selectedFile);

    try {
      await axios.post(
        `https://candidates-exam.herokuapp.com/api/v1/usuarios/${url}/cargar_cv`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("CV subido correctamente.");
      fetchCv();
      reset();
    } catch (error) {
      console.log("Error uploading CV:", error);
    }
  };

  useEffect(() => {
    fetchCv();
  }, []);

  return (
    <>
    <Col md={1} className="row">
        <Button onClick={() => removeTokenFromLocalStorage()} className="m-5" variant="outline-success">Cerrar Sesión</Button>
    </Col>
    <div className="container-sm mt-5 w-50">
      <Card>
        <Card.Body>
          {dataUsers ? (
            <Card.Title>¡Hola, {dataUsers?.nombre}, Bienvenido!</Card.Title>
          ) : (
            <Spinner animation="border" variant="success" />
          )}
        </Card.Body>
      </Card>

      <div className="mt-5">
        <h3>Subir CV</h3>
        <Form>
          <Form.Group>
            <Form.Label>Subir CV (solo .pdf y máximo 5MB)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
            {uploadError && <p className="text-danger">{uploadError}</p>}
          </Form.Group>
          <Button
            className="mt-3"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Subir CV
          </Button>
        </Form>
      </div>

      {cvUrl && (
        <div className="mt-5">
          <h3>Visualizar CV</h3>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer">
            Ver CV
          </a>
        </div>
      )}
    </div>
    </>
  );
};

export { Home };
