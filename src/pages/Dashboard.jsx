import React, { useEffect, useState } from 'react'
import Navbar2 from '../components/Product Grid/Navbar2'
import '../styles/Dashboard.css'
import Sidebar from '../components/Admin/Sidebar'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { DataGrid } from "@mui/x-data-grid";
import { Bar, Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, ArcElement} from 'chart.js';
import Heading from '../components/Product Grid/Heading';
import axios from 'axios';
import {server} from '../index'
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const Dashboard = () => {
  const[DashboardData,setDashboardData] = useState({});
  const [activeUser,setActiveUser] = useState(0);
  const [products,setProducts] = useState(0);
  const [monthEarning,setMonthEarning] = useState(0);
  const [monthWiseEarning,setMonthWiseEarning] = useState(0);
  const [totalEarning,setTotalEarning] = useState(0);
  const [stock,setStock] = useState(0);
  const [monthlySales,setMonthlySales] = useState(0);
  console.log(DashboardData)


  useEffect(()=>{
    axios.get(`${server}/admin/users/dashboard`,{
      withCredentials:true
    })
    .then((res)=>{
      setDashboardData(res.data);
      setActiveUser(res.data.activeUsers);
      setProducts(res.data.products);
      setMonthEarning(res.data.monthEarning);
      setMonthWiseEarning(res.data.monthWiseEarning);
      setTotalEarning(res.data.totalEarning);
      setStock(res.data.outOfStock);
      setMonthlySales(res.data.monthlySales);
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
    })
  },[])

  const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'];  

  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: monthWiseEarning,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const data2 = {
    labels: ['In Stock','Out of Stock'],
    datasets: [
      {
        label: 'Stock',
        data: [products-stock,stock],
        backgroundColor: [
          'rgba(130, 255, 130, 0.525)',
          'rgba(255, 130, 130, 0.442)',
        ],
        borderColor: [
          'green',
          'red',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Sales',
      },
    },
  };

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
      field: "price",
      headerName: "Price (₹)",
      headerClassName: 'AllProductsHeader',
      type: "number",
      minWidth: 100,
      flex: 0.75,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerClassName: 'AllProductsHeader',
      type: "number",
      minWidth: 100,
      flex:0.75
    },
  ];

  const rows=[];

  monthlySales && monthlySales.forEach(item => {
    item.orderItems.forEach((ele)=>{
      rows.push({
        Pid:ele.productId,
        name:ele.name,
        price:`₹${ele.price}`,
        quantity:ele.quantity
      })
    })
  });

  return (
    <>
      <Navbar2/>
      <div id="dashboard" className='adminPage'>
        <Sidebar/>
        <div className="adminMain">
          <p className="largeFont" style={{paddingLeft:'2vw'}}>Overview</p>
          <div className="dashboardCardBlock">
            <div className="dashboardCard" id="dash1">
              <div>
                <PermIdentityIcon/>
                <span>{activeUser}</span>
              </div>
              <p>Active Users</p>
            </div>
            <div className="dashboardCard" id="dash2">
              <div>
                  <ShoppingCartIcon/>
                  <span>{products}</span>
                </div>
                <p>Products</p>
              </div>
            <div className="dashboardCard" id="dash3">
              <div>
                  <CalendarMonthIcon/>
                  <span>&#8377;{monthEarning}</span>
                </div>
                <p>This Month</p>
              </div>
            <div className="dashboardCard" id="dash4">
              <div>
                  <AccountBalanceIcon/>
                  <span>&#8377;{totalEarning}</span>
                </div>
                <p>Total Earning</p>
              </div>
          </div>
          
          <div id='chartBlock'>
            <div id="barChart">
              <Bar options={options} data={data} />
            </div>
            <div id='pieChart'>
              <Doughnut data={data2} />
            </div>
          </div>

          <div id="dashGrid">
            <Heading heading={"Monthly Sales"}/>
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
      </div>
    </>
  )
}

export default Dashboard
