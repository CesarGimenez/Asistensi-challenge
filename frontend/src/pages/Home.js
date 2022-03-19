import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AddEditUserForm } from "../components/AddEditUserForm";
import { CustomModal } from "../components/CustomModal";
import { ModalDelete } from "../components/ModalDelete";
import { TableUsers } from "../components/TableUsers";
import { useUser } from "../hooks/useUser";
import {
  Container,
  Row,
  Col,
  Button,
  Stack,
  Spinner,
  FormControl,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import * as Icon from "react-bootstrap-icons";

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");

  const { loading, users, getUsers, deleteUser } = useUser();

  useEffect(() => {
    getUsers();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const handleModal = (user) => {
    setTitleModal(user ? `Actualizar '${user.first_name}'` : `Nuevo contacto`);
    setContentModal(
      <AddEditUserForm
        user={user}
        onRefetch={onRefetch}
        openCloseModal={openCloseModal}
      />
    );
    openCloseModal();
  };

  const onDeleteContact = async (id) => {
    await deleteUser(id);
    onRefetch();
    openCloseModal();
    toast.success("Contacto eliminado");
  };

  const handleModalDelete = (user) => {
    setTitleModal(`Esta seguro de eliminar al contacto '${user.first_name}'`);
    setContentModal(
      <Button onClick={() => onDeleteContact(user._id)}>Si</Button>
    );
    openCloseModal();
  };

  return (
    <Container>
      <Row className="justify-content-md-center mb-4 mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h1>
            Lista de Usuaerios <Icon.Person />
          </h1>
        </Col>
      </Row>
      <Stack className="mt-2 mb-2" gap="3" direction="horizontal">
        <Button onClick={() => openCloseModal()}>
          <Icon.PersonPlus /> Agregar nuevo
        </Button>
      </Stack>
      {loading ? (
        <Spinner animation="border" variant="success" translate="center" />
      ) : users?.length < 1 ? (
        <Alert variant="primary">Aun no tienes usuarios, registra alguno</Alert>
      ) : (
        <TableUsers
          users={users}
          handleModal={handleModal}
          handleModalDelete={handleModalDelete}
        />
      )}

      <CustomModal
        show={showModal}
        onHide={openCloseModal}
        title={titleModal}
        content={contentModal}
      ></CustomModal>
      <ModalDelete
        show={showModal}
        onHide={openCloseModal}
        title={titleModal}
        content={contentModal}
      ></ModalDelete>
    </Container>
  );
};
