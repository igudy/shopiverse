import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
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
    // console.log(`Deleting order with ID: ${selectedOrderId}`);
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
            <MenuItem onClick={handleView}>View</MenuItem>
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
  shippingAddress: order.shippingAddress?.street ? `${order.shippingAddress.street}, ${order.shippingAddress.city}` : 'NO shipping address',
  cartItems: order.cartItems.map((item: any) => `${item.name} (${item.brand})`).join(', '),
})) : [];

  return (
    <>
      <div className='text-3xl mt-3'>Your Order History</div>
      <div className='text-md'>
        Open an order to leave a Product Review
      </div>

      {orderData?.length > 0 ? (
        <div style={{ height: 400, width: '100%' }} className='mt-5 text-xsm'>
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
      ) : (
        <h1>No data found</h1>
      )}
    </>
  );
}

export default OrderHistoryComp;
