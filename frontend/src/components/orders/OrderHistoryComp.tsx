import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from '../redux/api/orderApi';
import { GiHamburgerMenu } from "react-icons/gi";
import { IGetOrders } from '../redux/api/types/orderApi.types';

const OrderHistoryComp = () => {
  const { data: orderData, isLoading: isLoadingOrder, isError: isErrorOrder } = useGetOrdersQuery({});
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, orderId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleView = () => {
    if (selectedOrderId) {
      navigate(`/order-details/?id=${selectedOrderId}`);
      handleClose();
    }
  };

  const handleDelete = () => {
    // Implement your delete logic here
    handleClose();
  };

  const columns: GridColDef[] = [
    { field: 'index', headerName: 'S/N', width: 70 },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'orderDate', headerName: 'Order Date', width: 130 },
    { field: 'orderAmount', headerName: 'Order Amount', type: 'number', width: 130 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 160 },
    { field: 'orderStatus', headerName: 'Order Status', width: 160 },
    { field: 'shippingAddress', headerName: 'Shipping Address', width: 200 },
    { field: 'cartItems', headerName: 'Cart Items', width: 400 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleClick(event, params.row.id)}>
            <GiHamburgerMenu />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleView}>View & Review</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // The below is how to fix the map type issue
  const rows = Array.isArray(orderData) ? orderData.map((order: IGetOrders, index: number) => ({
  id: order._id, // Pass the order _id directly from the backend
  index: index + 1,
  orderDate: order.orderDate,
  orderAmount: order.orderAmount,
  paymentMethod: order.paymentMethod,
  orderStatus: order.orderStatus,
  shippingAddress: order.shippingAddress?.street ? `${order.shippingAddress.street}, ${order.shippingAddress.city}` : 'No shipping address',
  cartItems: order.cartItems.map((item: any) => `${item.name} (${item.brand})`).join(', '),
})) : [];

  return (
    <>
      <div className="text-xl sm:text-2xl md:text-3xl mt-3 font-bold">Your Order History</div>
      <div className="text-sm sm:text-base text-gray-600">Open an order to leave a Product Review</div>

      {isLoadingOrder ? (
        <div className="mt-5 flex justify-center">
          <CircularProgress />
        </div>
      ) : orderData && orderData.length > 0 ? (
        <div className="mt-5">
          {/* Mobile card view */}
          <div className="block md:hidden space-y-3">
            {rows.map((order: any) => (
              <div key={order.id} className="bg-white border rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Order #{order.index}</p>
                    <p className="font-semibold">{order.orderDate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-sm font-bold">₦{order.orderAmount}</p>
                <p className="text-xs text-gray-600 mt-1">{order.paymentMethod}</p>
                <p className="text-xs text-gray-500 truncate mt-1">{order.cartItems}</p>
                <button
                  onClick={() => navigate(`/order-details/?id=${order.id}`)}
                  className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
          
          {/* Desktop table view */}
          <div className="hidden md:block" style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 text-center text-gray-500">No orders found</div>
      )}
    </>
  );
}

export default OrderHistoryComp;
