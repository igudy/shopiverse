import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetOrderQuery } from "../redux/api/orderApi";
import { LoaderIcon } from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const OrderDetailsComponent = () => {
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const orderId = urlParams.get("id");

  const {
    data: orderDetails,
    isLoading: isLoadingOrderDetails,
    isError: isErrorOrderDetails,
  } = useGetOrderQuery(orderId);

  const orderDetailsRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (orderDetailsRef.current) {
      const input = orderDetailsRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imageWidth = canvas.width;
        const imageHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
        const imgX = (pdfWidth - imageWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imageWidth * ratio,
          imageHeight * ratio
        );
        pdf.save(`order-receipt.pdf`);
      });
    }
  };

  if (isLoadingOrderDetails) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center h-20 w-20">
          <LoaderIcon />
        </div>
      </div>
    );
  }

  if (isErrorOrderDetails) {
    return <div>Error fetching order details</div>;
  }

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Order Details</h2>
      <div ref={orderDetailsRef}>
        {orderDetails ? (
          <div className="overflow-x-auto">
            {/* Mobile-friendly card layout */}
            <div className="block md:hidden space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold text-sm break-all">{orderDetails._id}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-sm">{orderDetails.orderDate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-sm">{orderDetails.orderTime}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-semibold text-sm">₦{orderDetails.orderAmount}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-sm">{orderDetails.orderStatus}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold text-sm">{orderDetails.paymentMethod}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Shipping Address</p>
                <p className="font-semibold text-sm">
                  {orderDetails?.shippingAddress ? (
                    orderDetails?.shippingAddress?.street ? (
                      `${orderDetails?.shippingAddress?.street}, ${orderDetails?.shippingAddress?.city}`
                    ) : (
                      orderDetails?.shippingAddress
                    )
                  ) : (
                    "No shipping address"
                  )}
                </p>
              </div>
              {orderDetails.coupon?.name && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Coupon</p>
                  <p className="font-semibold text-sm">{orderDetails.coupon?.name}</p>
                </div>
              )}
              
              <div className="mt-4">
                <p className="font-bold text-lg mb-3">Cart Items</p>
                <div className="space-y-4">
                  {orderDetails.cartItems.map((item: any) => (
                    <div key={item._id} className="bg-white border rounded-lg p-3 shadow-sm">
                      <div className="flex gap-3">
                        <img
                          src={item.productImg}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-sm">
                          <p className="font-bold truncate">{item.name}</p>
                          <p className="text-gray-600">{item.brand}</p>
                          <p className="text-gray-600">Qty: {item.cartQuantity}</p>
                          <p className="font-semibold">₦{item.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/review-product/${item._id}?order-details=${orderId}`)}
                        className="w-full mt-3 bg-purple-600 p-2 rounded-lg text-white text-sm font-medium cursor-pointer hover:bg-purple-800 transition"
                      >
                        Review Product
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop table layout */}
            <table className="hidden md:table table-auto w-full text-left">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Order ID:</td>
                  <td className="border px-4 py-2">{orderDetails._id}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Order Date:</td>
                  <td className="border px-4 py-2">{orderDetails.orderDate}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Order Time:</td>
                  <td className="border px-4 py-2">{orderDetails.orderTime}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Order Amount:</td>
                  <td className="border px-4 py-2">₦{orderDetails.orderAmount}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Order Status:</td>
                  <td className="border px-4 py-2">{orderDetails.orderStatus}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Payment Method:</td>
                  <td className="border px-4 py-2">{orderDetails.paymentMethod}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Shipping Address:</td>
                  <td className="border px-4 py-2">
                    {orderDetails?.shippingAddress ? (
                      orderDetails?.shippingAddress?.street ? (
                        `${orderDetails?.shippingAddress?.street}, ${orderDetails?.shippingAddress?.city}`
                      ) : (
                        orderDetails?.shippingAddress
                      )
                    ) : (
                      "No shipping address"
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Coupon:</td>
                  <td className="border px-4 py-2">{orderDetails.coupon?.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold align-top">Cart Items:</td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-col gap-5">
                      {orderDetails.cartItems.map((item: any) => (
                        <div key={item._id} className="text-sm mb-4">
                          <div className="flex gap-5">
                            <img
                              src={item.productImg}
                              alt={item.name}
                              className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl object-cover"
                            />
                            <div>
                              <p><strong>Name:</strong> {item.name}</p>
                              <p><strong>Brand:</strong> {item.brand}</p>
                              <p><strong>Category:</strong> {item.category}</p>
                              <p><strong>Description:</strong> {item.desc}</p>
                              <p><strong>Price:</strong> ₦{item.price}</p>
                              <p><strong>Cart Quantity:</strong> {item.cartQuantity}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => navigate(`/review-product/${item._id}?order-details=${orderId}`)}
                            className="mt-3 bg-purple-600 p-3 px-6 rounded-lg text-white font-medium cursor-pointer hover:bg-purple-800 transition"
                          >
                            Review Product
                          </button>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>No details available for this order.</div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={handleDownload}
          className="p-3 sm:p-4 px-6 sm:px-10 bg-purple-800 hover:bg-purple-500 rounded-xl shadow-lg text-white my-5 text-sm sm:text-base"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;
