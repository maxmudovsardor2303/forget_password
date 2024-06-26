import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";

const UserModal = ({ open, toggle, editCar, addCar, isEditing, currentCar }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    year: "",
    color: "",
    brand: "",
  });

  useEffect(() => {
    if (isEditing && currentCar) {
      setForm(currentCar);
    } else {
      setForm({
        name: "",
        price: "",
        year: "",
        color: "",
        brand: "",
      });
    }
  }, [isEditing, currentCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    if (isEditing) {
      editCar(form);
    } else {
      addCar(form);
    }
    toggle();
  };

  return (
    <Modal className='mt-5' isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>{isEditing ? "Edit Car" : "Add Car"}</ModalHeader>
      <ModalBody>
        <Form id="submit">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              required
              value={form.price}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="year">Year</Label>
            <Input
              type="date"
              name="year"
              id="year"
              required
              value={form.year}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="color">Color</Label>
            <Input
              type="text"
              name="color"
              id="color"
              required
              value={form.color}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="brand">Brand</Label>
            <Input
              type="text"
              name="brand"
              id="brand"
              required
              value={form.brand}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="btn btn-success"  onClick={handleSubmit}>
          Save
        </Button>
        <Button className='btn btn-danger' onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
