import React, { useEffect, useState } from "react";
import Navbar2 from "../Product Grid/Navbar2";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import "../../styles/AllProducts.css";
import axios from "axios";
import { server } from "../../index";
import toast from "react-hot-toast";
import { EditIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isDeleted,setIsDeleted] = useState(false);

  const deleteHandler = async(Pid)=>{
    try{
      const {data} = await axios.delete(`${server}/products/${Pid}`,{
        withCredentials:true
      })
      toast.success(data.message);
      setIsDeleted((val)=>!val);

    }catch(err){
      toast.error(err.response.data.message);
    }    
  }

  useEffect(() => {
    axios
      .get(`${server}/admin/users/products/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [isDeleted]);

  const columns = [
    { 
      field: "Pid", 
      headerName: "ID", 
      headerClassName: 'AllProductsHeader',
      minWidth: 250, 
      flex:1.5,
      sortable: false 
    },
    {
      field: "name",
      headerName: "Product",
      headerClassName: 'AllProductsHeader',
      minWidth: 300,
      flex: 2,
      editable: false,
    },
    {
      field: "category",
      headerName: "Category",
      headerClassName: 'AllProductsHeader',
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
    },
    {
      field: "stock",
      headerName: "Stock",
      headerClassName: 'AllProductsHeader',
      type: "number",
      minWidth: 50,
      flex: 0.5,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price (₹)",
      headerClassName: 'AllProductsHeader',
      type: "number",
      minWidth: 100,
      flex: 0.75,
    },
    {
      field: "discount",
      headerName: "Discount (₹)",
      headerClassName: 'AllProductsHeader',
      type: "number",
      minWidth: 100,
      flex:0.75
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/products/edit/${params.row.Pid}`} id='productEditBtn'>
              <EditIcon />
            </Link>

            <button id='productDeleteBtn' onClick={()=>{deleteHandler(params.row.Pid)}}>
              <Trash2 color="#ff0000" fill fillOpacity={0.1} />
            </button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        Pid: item._id,
        name: item.name,
        category: item.category,
        stock: item.stock,
        price: item.price,
        discount: `${item.discount}%`,
      });
    });

  return (
    <>
      <Navbar2 />
      <div className="adminPage">
        <Sidebar />
        <div className="adminMain">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination:{
                paginationModel:{
                  pageSize:10
                }
              }
            }}
            disableSelectionOnClick
            autoHeight
            getRowId={(row) => row.Pid}
          />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
