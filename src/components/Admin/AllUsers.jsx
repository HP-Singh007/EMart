import React, { useEffect, useState } from 'react'
import Navbar2 from '../Product Grid/Navbar2'
import Sidebar from './Sidebar'
import { EditIcon, Trash2 } from 'lucide-react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {server} from '../../index'

const AllUsers = () => {
    const [users,setUsers] = useState([]);
    const [isUpdated,setIsUpdated] = useState(false);

    const deleteHandler=async(id)=>{
        try{
            const {data} = await axios.delete(`${server}/admin/users/${id}`,{
                withCredentials:true
            })

            toast.success(data.message);
            setIsUpdated((val)=>!val);
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }

    const columns = [
        { 
          field: "Uid", 
          headerName: "User ID", 
          headerClassName: 'AllProductsHeader',
          minWidth: 250, 
          flex:1.5,
          sortable: false 
        },
        {
          field: "name",
          headerName: "Name",
          headerClassName: 'AllProductsHeader',
          minWidth: 300,
          flex: 2,
          editable: false,
        },
        {
          field: "email",
          headerName: "Email",
          headerClassName: 'AllProductsHeader',
          minWidth: 120,
          flex: 1.5,
          editable: false,
          sortable: false,
        },
        {
          field: "role",
          headerName: "Role",
          headerClassName: 'AllProductsHeader',
          type: "number",
          minWidth: 50,
          flex: 1,
          editable: false,
          sortable:false
        },
        {
          field: "actions",
          flex: 0.75,
          headerName: "Actions",
          minWidth: 100,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/admin/users/edit/${params.row.Uid}`} id='productEditBtn'>
                  <EditIcon />
                </Link>
    
                <button id='productDeleteBtn' onClick={()=>{deleteHandler(params.row.Uid)}}>
                  <Trash2 color="#ff0000" fill fillOpacity={0.1} />
                </button>
              </>
            );
          },
        },
      ];

      
    useEffect(()=>{
        axios.get(`${server}/admin/users/all`,{
            withCredentials:true
        })
        .then((res)=>{
            setUsers(res.data.users);
        })
        .catch((err)=>{
            toast.error(err.response.data.message);
        })
    },[isUpdated])
        
    const rows = [];

    users && users.forEach((item)=>{
        rows.push({
            Uid: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
        });
    });

  return (
    <>
        <Navbar2/>
        <div className="adminPage">
            <Sidebar/>
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
                getRowId={(row) => row.Uid}
            />
            </div>
        </div>
      
    </>
  )
}

export default AllUsers
