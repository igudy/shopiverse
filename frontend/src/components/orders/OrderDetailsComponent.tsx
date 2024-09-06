import { useParams, useSearchParams } from "react-router-dom";
import { useGetOrderQuery } from "../redux/api/orderApi";
import { LoaderIcon } from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const OrderDetailsComponent = () => {
  // const { id } = useParams();
  // console.log("id==>", id)

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
      // html2canvas(orderDetailsRef.current).then((canvas) => {
      //   const imgData = canvas.toDataURL("image/png");
      //   const pdf = new jsPDF();
      //   pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size in mm
      //   pdf.save("order-details.pdf");
      // });

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div ref={orderDetailsRef}>
        {orderDetails ? (
          <table className="table-auto w-full text-left">
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
                <td className="border px-4 py-2 font-semibold">
                  Order Amount:
                </td>
                <td className="border px-4 py-2">{orderDetails.orderAmount}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Order Status:
                </td>
                <td className="border px-4 py-2">{orderDetails.orderStatus}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Payment Method:
                </td>
                <td className="border px-4 py-2">
                  {orderDetails.paymentMethod}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Shipping Address:
                </td>
                <td className="border px-4 py-2">
                  {orderDetails?.shippingAddress ? (
                    <>
                      {orderDetails?.shippingAddress?.street ? (
                        <>
                          {" "}
                          {orderDetails?.shippingAddress?.street},{" "}
                          {orderDetails?.shippingAddress?.city}
                        </>
                      ) : (
                        <>{orderDetails?.shippingAddress}</>
                      )}
                    </>
                  ) : (
                    "No shipping address"
                  )}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Coupon:</td>
                <td className="border px-4 py-2">
                  {orderDetails.coupon?.name}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Cart Items:</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-5">
                  {orderDetails.cartItems.map((item) => (
                    <div key={item._id} className="text-[12px] mb-4 border-2 rounded-xl p-2 w-[60%]">
                      <div className="flex gap-5">
                        <div>
                          <img
                            src={item.productImg}
                            alt={item.name}
                            className="w-32 h-32 rounded-xl object-cover mb-2"
                          />
                        </div>

                        <div>
                          <p>
                            <strong>Name:</strong> {item.name}
                          </p>
                          <p>
                            <strong>Brand:</strong> {item.brand}
                          </p>
                          <p>
                            <strong>Category:</strong> {item.category}
                          </p>
                          <p>
                            <strong>Description:</strong> {item.desc}
                          </p>
                          {/* <p><strong>Quantity:</strong> {item.quantity}</p> */}
                          <p>
                            <strong>Price:</strong> {item.price}
                          </p>
                          {/* <p><strong>False Price:</strong> {item.falsePrice}</p> */}
                          <p>
                            <strong>Cart Quantity:</strong> {item.cartQuantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                    
                    <div className="text-[12px] mb-4 border-2 rounded-xl p-2 w-[40%] 
                  flex justify-center text-center items-center">
                      <div className="bg-purple-600 p-4 rounded-lg text-white font-medium 
                      cursor-pointer hover:bg-purple-700">
                      Review Product
                      </div>  
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>No details available for this order.</div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={handleDownload}
          className="p-4 px-10 bg-purple-700 hover:bg-purple-500 rounded-xl shadow-lg text-white my-5"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;
