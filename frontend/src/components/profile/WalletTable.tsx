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
  } = useGetTransactionsQuery();

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
      <div className="text-xl sm:text-2xl md:text-3xl font-medium my-4 sm:my-6">Transactions</div>

      {isLoadingTransactions ? (
        <div className="mt-5 flex justify-center">
          <CircularProgress />
        </div>
      ) : getTransactionsData && getTransactionsData.length > 0 ? (
        <>
          {/* Mobile card view */}
          <div className="block md:hidden space-y-3 mt-4">
            {rows.map((transaction: any) => (
              <div key={transaction.id} className="bg-white border rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-gray-500">#{transaction.index}</p>
                    <p className="text-sm font-medium">{transaction.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    transaction.status === 'success' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
                <p className="text-lg font-bold text-purple-600">₦{transaction.amount?.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1 truncate">{transaction.description}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">Ref: {transaction.refAccount}</p>
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
        </>
      ) : (
        <div className="mt-5 text-center text-gray-500">No transactions found</div>
      )}
    </>
  );
};

export default WalletTable;
