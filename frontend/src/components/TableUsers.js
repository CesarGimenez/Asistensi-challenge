import React, { useState } from "react";
import { map } from "lodash";
import * as Icon from "react-bootstrap-icons";
import { Button, Stack, Table } from "react-bootstrap";
import { toast } from "react-toastify";

export const TableUsers = ({ users, handleModal, handleModalDelete }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>dni</th>
            <th>Status</th>
            <th>Sex</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {map(users?.users, (user, index) => (
            <tr key={index}>
              <td>{user.first_name + " " + user?.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dni}</td>
              <td>{user?.status}</td>
              <td>{user?.sex}</td>
              <td>
                {
                  <Actions
                    handleModal={handleModal}
                    user={user}
                    handleModalDelete={handleModalDelete}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Actions = ({ handleModal, user, handleModalDelete }) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <Button variant="outline-success" onClick={() => handleModal(user)}>
        <Icon.Pencil />
      </Button>
      <Button variant="outline-danger" onClick={() => handleModalDelete(user)}>
        <Icon.Trash />
      </Button>
    </Stack>
  );
};
