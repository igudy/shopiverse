import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGetTransactionsQuery } from "../redux/api/transactionApi";

const WalletTable = () => {
  const {
    data: getTransactionsData,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useGetTransactionsQuery({});

  console.log("getTransactionData==>", getTransactionsData);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    transactionId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTransactionId(transactionId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTransactionId(null);
  };

  const handleView = () => {
    if (selectedTransactionId) {
      navigate(`/transaction-details/?id=${selectedTransactionId}`);
      handleClose();
    }
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log(`Deleting transaction with ID: ${selectedTransactionId}`);
    handleClose();
  };

  const columns: GridColDef[] = [
    { field: "index", headerName: "S/N", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "transactionID", headerName: "Transaction ID", width: 160 },
    { field: "amount", headerName: "Amount", type: "number", width: 130 },
    { field: "refAccount", headerName: "Ref Account", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
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
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Map the transaction data to rows
  const rows = Array.isArray(getTransactionsData)
    ? getTransactionsData.map((transaction: any, index: number) => ({
        id: transaction._id,
        index: index + 1,
        date: new Date(transaction.createdAt).toLocaleString(),
        transactionID: transaction._id,
        amount: transaction.amount,
        refAccount: transaction.receiver,
        description: transaction.description,
        status: transaction.status,
      }))
    : [];

  return (
    <>
      <div className="text-3xl font-medium my-6">Transactions</div>

      {isLoadingTransactions ? (
        <div className="mt-5">
          <CircularProgress />
        </div>
      ) : getTransactionsData && getTransactionsData.length > 0 ? (
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
        <div className="mt-5">No transactions found</div>
      )}
    </>
  );
};

export default WalletTable;
