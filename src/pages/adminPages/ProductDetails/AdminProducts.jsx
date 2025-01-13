import { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import AdminProductModal from "./AdminProductModal";
import AdminAddModal from "./AdminAddModal";

import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPrduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../../features/productSlice";
import SpinLoader from "../../../components/Loader/SpinLoader";

const categories = [
  { CategoryId: 1, Name: "Sofas" },
  { CategoryId: 2, Name: "Living" },
  { CategoryId: 3, Name: "Bedroom" },
  { CategoryId: 4, Name: "Dining" },
  { CategoryId: 5, Name: "New Arrivals" },
  { CategoryId: 6, Name: "Office" },
  { CategoryId: 7, Name: "Kitchen" },
];
function AdminProducts() {
  const [webProduct, setWebProduct] = useState([]);
  const [editForm, setEditForm] = useState();
  const [editItem, setEditItem] = useState();
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await dispatch(fetchProducts()).unwrap();
        setWebProduct(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [dispatch]);

  const handleEdit = (item) => {
    const getCategoryIdByName = (categoryName) => {
      const category = categories.find(
        (cat) => cat.Name.toLowerCase() === categoryName.toLowerCase()
      );
      return category ? category.CategoryId : null;
    };
    const categoryId = getCategoryIdByName(item.category);
    setEditItem(item);
    setEditForm({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: null,
      rating: item.rating,
      category: categoryId,
      brand: item.brand,
      stock: item.stock,
    });
  };

  const handleAddProduct = () => {
    addToggle();
    setEditForm({
      name: "",
      price: "",
      image: null,
      rating: "",
      category: "",
      brand: "",
      stock: "",
    });
  };

  const addToggle = () => {
    setModal(!modal);
  };

  const onFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    console.log(editForm);
  };

  const toggle = () => {
    setEditForm(undefined);
    setEditItem(undefined);
  };

  const editAlert = async (item) => {
    const adminConfirmed = window.confirm("Are you sure you want to edit?");

    if (adminConfirmed) {
      await handleEditProduct(item);
    }
  };

  const addAlert = async () => {
    const adminConfirm = window.confirm(
      "Are you sure you want to Add New Product?"
    );
    if (adminConfirm) {
      await addProduct();
    }
  };

  const deleteAlert = async (item) => {
    const adminConfirmed = window.confirm(
      ` Are You Sure ,you want delete Item ${item.name}`
    );
    if (adminConfirmed) {
      await deleteAppProduct(item.productId);
      toast.success("Product Deleted");
    }
  };

  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", editForm.name);
    formData.append("price", parseFloat(editForm.price));
    formData.append("brand", editForm.brand);
    formData.append("categoryId", Number(editForm.category));
    formData.append("stock", Number(editForm.stock));
    formData.append("rating", Number(editForm.rating));

    if (editForm.image) {
      formData.append("image", editForm.image);
      try {
        const result = await dispatch(addNewPrduct(formData)).unwrap();
        console.log("Product added successfully", result);
        addToggle();
        toggle();

        setWebProduct([...webProduct, result]);
      } catch (error) {
        console.error("Failed to add product ", error);
        // Optionally show an error notification
      }
    } else {
      toast.error("Image is Required");
    }
  };

  const deleteAppProduct = async (deleteId) => {
    if (deleteId !== null) {
      try {
        const result = await dispatch(deleteProduct(deleteId)).unwrap();
        setWebProduct(webProduct.filter((item) => item.productId !== result));
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleEditProduct = async () => {
    const formData = new FormData();

    formData.append("name", editForm.name);
    formData.append("price", parseFloat(editForm.price));
    formData.append("brand", editForm.brand);
    formData.append("categoryId", Number(editForm.category));
    formData.append("stock", Number(editForm.stock));
    formData.append("rating", Number(editForm.rating));
    if (editForm.image) {
      formData.append("image", editForm.image);
    } else {
      formData.append("image", null);
    }

    try {
      await dispatch(updateProduct({ id: editForm.id, formData })).unwrap();

      const response = await dispatch(fetchProducts()).unwrap();
      setWebProduct(response);

      toggle();
    } catch (error) {
      console.log(error);
    }

    console.log(webProduct);
  };

  console.log(webProduct);

  if (loading) {
    return <SpinLoader />;
  }

  return (
    <div className="Product-Container">
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
          setEditForm={setEditForm}
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
          setEditForm={setEditForm}
          onAdd={addAlert}
        />
      )}
    </div>
  );
}

export default AdminProducts;
