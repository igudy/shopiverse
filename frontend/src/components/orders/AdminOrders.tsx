import * as React from "react";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../redux/api/orderApi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IGetOrders } from "../redux/api/types/orderApi.types";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const {
    data: orderData,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
  } = useGetOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderMutation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IGetOrders | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    orderId: string
  ) => {
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

  const handleUpdate = () => {
    if (selectedOrderId && orderData) {
      const order = orderData.find(
        (order: IGetOrders) => order._id === selectedOrderId
      );
      if (order) {
        setSelectedOrder(order);
        setOrderStatus(order.orderStatus);
        setOpenModal(true);

        setSearchParams({ id: selectedOrderId });
      }
      handleClose();
    }
  };
  
  const [urlParams] = useSearchParams();
  const orderId = urlParams.get("id");

  const handleSave = async () => {
    if (orderId && orderStatus) {
      try {
        await updateOrderStatus({ id: orderId, orderStatus });
        setSelectedOrder((prev) => (prev ? { ...prev, orderStatus } : null));
        toast.success("Updated successfully");
      } catch (error) {
        console.error("Failed to update order status:", error);
        toast.error("Failed to update");
      }
    }
    setOpenModal(false);
    setSearchParams({});
  };

  const handleDelete = () => {
    handleClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Order Placed":
        return "red";
      case "Processing":
        return "orange";
      case "Successful":
        return "green";
      default:
        return "";
    }
  };

  const columns: GridColDef[] = [
    { field: "index", headerName: "S/N", width: 70 },
    { field: "id", headerName: "ID", width: 70 },
    { field: "orderDate", headerName: "Order Date", width: 130 },
    {
      field: "orderAmount",
      headerName: "Order Amount",
      type: "number",
      width: 130,
    },
    { field: "paymentMethod", headerName: "Payment Method", width: 160 },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 160,
      renderCell: (params) => (
        <Typography style={{ color: getStatusColor(params.value) }}>
          {params.value}
        </Typography>
      ),
    },
    { field: "shippingAddress", headerName: "Shipping Address", width: 200 },
    { field: "cartItems", headerName: "Cart Items", width: 400 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleClick(event, params.row.id)}>
            <GiHamburgerMenu />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleView}>View</MenuItem>
            <MenuItem onClick={handleUpdate}>Update</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const rows = Array.isArray(orderData)
    ? orderData.map((order: IGetOrders, index: number) => ({
        id: order._id,
        index: index + 1,
        orderDate: order.orderDate,
        orderAmount: order.orderAmount,
        paymentMethod: order.paymentMethod,
        orderStatus: order.orderStatus,
        shippingAddress: order.shippingAddress?.street
          ? `${order.shippingAddress.street}, ${order.shippingAddress.city}`
          : "No shipping address",
        cartItems: order.cartItems
          .map((item: any) => `${item.name} (${item.brand})`)
          .join(", "),
      }))
    : [];

  return (
    <>
      {orderData?.length > 0 ? (
        <div style={{ height: 400, width: "100%" }} className="mt-5 text-xsm">
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

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Update Order</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <TextField
                label="Order Date"
                value={selectedOrder.orderDate}
                fullWidth
                margin="dense"
                disabled
              />
              <TextField
                label="Order Amount"
                value={selectedOrder.orderAmount}
                fullWidth
                margin="dense"
                disabled
              />
              <TextField
                label="Payment Method"
                value={selectedOrder.paymentMethod}
                fullWidth
                margin="dense"
                disabled
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="order-status-label">Order Status</InputLabel>
                <Select
                  labelId="order-status-label"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value as string)}
                  label="Order Status"
                >
                  <MenuItem value="Order Placed" style={{ color: "red" }}>
                    Order Placed
                  </MenuItem>
                  <MenuItem value="Processing" style={{ color: "orange" }}>
                    Processing
                  </MenuItem>
                  <MenuItem value="Successful" style={{ color: "green" }}>
                    Successful
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Shipping Address"
                value={`${selectedOrder.shippingAddress?.street}, 
                ${selectedOrder.shippingAddress?.city}`}
                fullWidth
                margin="dense"
                disabled
              />
              <TextField
                label="Cart Items"
                value={selectedOrder.cartItems
                  .map((item: any) => `${item.name} (${item.brand})`)
                  .join(", ")}
                fullWidth
                margin="dense"
                disabled
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminOrders;
