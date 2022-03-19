import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import * as Icon from "react-bootstrap-icons";

export const Filter = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, users, filterUsersMalePending, deleteUser } = useUser();

  useEffect(() => {
    filterUsersMalePending();
  }, [refetch]);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const handleModal = (user) => {
    setTitleModal(user ? `Update '${user.first_name}'` : `New user`);
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
    toast.success("User removed");
  };

  const handleModalDelete = (user) => {
    setTitleModal(`Delete '${user.first_name}' ?`);
    setContentModal(
      <Button onClick={() => onDeleteContact(user._id)}>yes</Button>
    );
    openCloseModal();
  };
  return (
    <Container>
      <Row className="justify-content-md-center mb-4 mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h1>
            User list filtered by sex and status <Icon.Person />
          </h1>
        </Col>
      </Row>
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
