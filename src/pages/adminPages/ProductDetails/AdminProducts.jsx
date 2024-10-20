import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductTable from "./ProductTable";
import AdminProductModal from "./AdminProductModal";
import AdminAddModal from "./AdminAddModal";
import { AdminContext } from "../../../Provider/AdminContext";

import { toast, ToastContainer } from "react-toastify";

function AdminProducts() {
  const [webProduct, setWebProduct] = useState([]);
  const [editForm, setEditForm] = useState();
  const [editItem, setEditItem] = useState();
  const [modal, setModal] = useState(false);
  const { checkAdmin } = useContext(AdminContext);

  const handleEdit = (item) => {
    setEditItem(item);
    setEditForm({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      rating: item.rating,
      category: item.category,
      brand: item.brand,
    });
  };

  const handleAddProduct = () => {
    addToggle();
    setEditForm({
      name: "",
      price: "",
      image: "",
      rating: "",
      category: "",
      brand: "",
    });
  };

  const addToggle = () => {
    setModal(!modal);
  };

  const onFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const toggle = () => {
    setEditForm(undefined);
    setEditItem(undefined);
  };

  // edit alert to ensure edit befor save
  const editAlert = () => {
    const adminConfirmed = window.confirm("Are you sure you want to edit?");

    if (adminConfirmed) {
      editWebProduct();
    }
  };

  const addAlert = () => {
    const adminConfirm = window.confirm(
      "Are you sure you want to Add New Product?"
    );
    if (adminConfirm) {
      addWebProduct();
      addToggle();
    }
  };

  const deleteAlert = (item) => {
    const adminConfirmed = window.confirm(
      ` Are You Sure ,you want delete Item ${item.name}`
    );
    if (adminConfirmed) {
      deleteWebProduct(item.id);
    }
  };
  const addWebProduct = async () => {
    try {
      const AddResponse = await axios.post(`http://localhost:5000/products`, {
        ...editForm,
        price: Number(editForm.price),
        rating: Number(editForm.rating),
      });
      if (AddResponse.status >= 200) {
        setWebProduct([...webProduct, AddResponse.data]);
        toast.success("New Product Added ✅");
      }
    } catch (err) {
      console.error("Add New Products Failed:", err);
    }
  };
  const editWebProduct = async () => {
    try {
      const editResponse = await axios.patch(
        `http://localhost:5000/products/${editForm.id}`,
        {
          name: editForm.name,
          price: Number(editForm.price),
          image: editForm.image,
          rating: Number(editForm.rating),
          category: editForm.category,
          brand: editForm.brand,
        }
      );
      if (editResponse.status >= 200) {
        const editedlist = webProduct.map((val) => {
          if (val.id == editResponse.data.id) {
            return editResponse.data;
          } else {
            return val;
          }
        });

        setWebProduct(editedlist);

        toggle();
      }
    } catch (err) {
      console.error("Edit product Details failed:", err);
    }
  };

  const deleteWebProduct = async (id) => {
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/products/${id}`
      );

      if (deleteResponse.status >= 200) {
        const deletelist = webProduct.filter(
          (val) => val.id !== deleteResponse.data.id
        );
        setWebProduct(deletelist);
      }
    } catch (err) {
      console.error("Delete Products Failed:", err);
    }
  };

  useEffect(() => {
    const fetchWebProduct = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");

        if (response.status >= 200) {
          setWebProduct(response.data);
        }
      } catch (err) {
        console.error("fetch Product details failed:", err);
      }
    };
    fetchWebProduct();
  }, []);

  if (!webProduct.length) {
    return null;
  }
  if (!checkAdmin) {
    return null;
  }

  return (
    <div>
      <ToastContainer />
      <ProductTable
        products={webProduct}
        handleEdit={handleEdit}
        handleAddProduct={handleAddProduct}
        onDelete={deleteAlert}
      ></ProductTable>
      {!!editItem && (
        <AdminProductModal
          item={editItem}
          toggle={toggle}
          editForm={editForm}
          onFormChange={onFormChange}
          onSave={editAlert}
        />
      )}
      {modal && (
        <AdminAddModal
          modal={modal}
          toggle={addToggle}
          onFormChange={onFormChange}
          editForm={editForm}
          onAdd={addAlert}
        />
      )}
    </div>
  );
}

export default AdminProducts;
