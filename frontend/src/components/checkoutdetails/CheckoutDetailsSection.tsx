import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { checkout_details } from "../validation-schema/checkout-schema";
import CheckoutSummary from "./CheckoutSummary";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../redux/slices/checkout/checkoutSlice";

const CheckoutDetailsSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(checkout_details),
  });

  const navigate = useNavigate();

  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLoading(true);
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data && data.address) {
              // const address = `${data.address.road || ""} ${data.address.city || ""} ${data.address.state || ""} ${data.address.country || ""}`;
              const address = data?.display_name;
              setValue("biller_address_line_1", address);
              setLocationError("");
            } else {
              setLocationError("Unable to retrieve address");
            }
          } catch (error) {
            setLocationError("Error fetching address");
          }
          setLoading(false);
        },
        (error) => {
          setLocationError("Unable to retrieve your location");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser");
    }
  };

  const onSubmit = async (data: any) => {
    const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod") as string) || "";

    const shippingAddress = data?.address_line_1;
    const billingAddress = data?.biller_address_line_1;

    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    localStorage.setItem("billingAddress", JSON.stringify(billingAddress));

    if (paymentMethod === "stripe") {
      navigate("/checkout-stripe");
    } else if (paymentMethod === "flutterwave") {
      navigate("/checkout-flutterwave");
    } else if (paymentMethod === "paypal") {
      navigate("/checkout-paypal");
    } else {
      navigate("/checkout-wallet");
    }
  };

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-between">
        <div className="flex flex-col p-3 sm:p-4 md:p-5 my-4 lg:my-7 shadow-2xl rounded-lg w-full lg:w-1/2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-purple-500 mt-4 sm:mt-6 lg:mt-10">
              Checkout Details
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold underline mt-2">
                  Shipping Address
                </h1>
                {/* Recipient name */}
                <label htmlFor="name" className="flex">
                  Name
                  {errors?.name && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors?.name?.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="name"
                  className={`input-box `}
                  placeholder="igudy"
                  {...register("name", { required: true })}
                />

                <label htmlFor="address_line_1" className="flex mt-4">
                  Address Line 1{" "}
                  {errors.address_line_1 && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.address_line_1.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="address_line_1"
                  className={`input-box `}
                  placeholder="No, 1 Brave street."
                  {...register("address_line_1", { required: true })}
                />

                {/* <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="mt-2 p-2 bg-purple-500 text-white rounded"
                >
                  Use Current Location
                </button> */}
                {/* {locationError && (
                  <div className="text-red-800 text-[12px] mt-2">
                    {locationError}
                  </div>
                )} */}

                {/* Address Line 2 */}
                <label htmlFor="address" className="flex mt-4">
                  Address Line 2{" "}
                  {errors.address_line_2 && (
                    <div className=" text-red-800 text-[12px] 
                    flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.address_line_2.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="address_line_2"
                  className={`input-box `}
                  placeholder="No, 1 Unbrave street."
                  {...register("address_line_2", { required: true })}
                />

                {/* City */}
                <label htmlFor="city" className="flex mt-4">
                  City{" "}
                  {errors.city && (
                    <div className=" text-red-800 text-[12px] 
                    flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.city.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="city"
                  className={`input-box `}
                  placeholder="Benin City"
                  {...register("city", { required: true })}
                />

                {/* State */}
                <label htmlFor="address" className="flex mt-4">
                  State
                  {errors.state && (
                    <div className=" text-red-800 text-[12px] flex 
                    items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.state.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="state"
                  className={`input-box `}
                  placeholder="Edo State"
                  {...register("state", { required: true })}
                />

                {/* Postal Code */}
                <label htmlFor="address" className="flex mt-4">
                  Postal Code{" "}
                  {errors.postal_code && (
                    <div className=" text-red-800 text-[12px] flex
                     items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.postal_code.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="postal_code"
                  className={`input-box `}
                  placeholder="101121"
                  {...register("postal_code", { required: true })}
                />

                {/* Country Dropdown */}
                {/* <CountryDropdown
                className={}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              /> */}

                {/* Phone */}
                <label htmlFor="address" className="flex mt-4">
                  Phone{" "}
                  {errors.phone && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.phone.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="phone"
                  className={`input-box `}
                  placeholder="+2348108251628"
                  {...register("phone", { required: true })}
                />
              </div>

              {/* SHIPPING ADDRESS */}
              <div className="my-3">
                <h1 className="text-lg sm:text-xl md:text-2xl mt-5 font-bold underline">
                  Billing Address
                </h1>

                {/* Name */}
                <label htmlFor="biller_name" className="flex">
                  Name{" "}
                  {errors?.biller_name && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors?.biller_name?.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="biller_name"
                  className={`input-box `}
                  placeholder="igudy"
                  {...register("biller_name", { required: true })}
                />

                <label htmlFor="biller_address_line_1" className="flex mt-4">
                  Address Line 1{" "}
                  {errors.biller_address_line_1 && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.biller_address_line_1.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="biller_address_line_1"
                  className={`input-box `}
                  placeholder="No, 1 Brave street."
                  {...register("biller_address_line_1", { required: true })}
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="mt-2 p-2 bg-purple-500 text-white rounded"
                >
                  Use Current Location
                </button>
                {locationError && (
                  <div className="text-red-800 text-[12px] mt-2">
                    {locationError}
                  </div>
                )}

                {/* Address Line 2 */}
                <label htmlFor="biller_address_line_2" className="flex mt-4">
                  Address Line 2{" "}
                  {errors.biller_address_line_2 && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.biller_address_line_2.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="biller_address_line_2"
                  className={`input-box `}
                  placeholder="No, 1 Unbrave street."
                  {...register("biller_address_line_2", { required: true })}
                />

                {/* City */}
                <label htmlFor="biller_city" className="flex mt-4">
                  City{" "}
                  {errors.biller_city && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.biller_city.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="biller_city"
                  className={`input-box `}
                  placeholder="Benin City"
                  {...register("biller_city", { required: true })}
                />

                {/* State */}
                <label htmlFor="biller_state" className="flex mt-4">
                  State
                  {errors.biller_state && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.biller_state.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="biller_state"
                  className={`input-box `}
                  placeholder="Edo State"
                  {...register("biller_state", { required: true })}
                />

                {/* Postal Code */}
                <label htmlFor="biller_postal_code" className="flex mt-4">
                  Postal Code{" "}
                  {errors.biller_postal_code && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.biller_postal_code.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="biller_postal_code"
                  className={`input-box `}
                  placeholder="101121"
                  {...register("biller_postal_code", { required: true })}
                />

                {/* Country Dropdown */}
                {/* <CountryDropdown
                className={}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              /> */}

                {/* Phone */}
                <label htmlFor="biller_phone" className="flex mt-4">
                  Phone{" "}
                  {errors.biller_phone && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
                      <AiFillCloseCircle />
                      {errors.biller_phone.message as string}
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  id="biller_phone"
                  className={`input-box `}
                  placeholder="+2348108251628"
                  {...register("biller_phone", { required: true })}
                />
              </div>
              <button type="submit" className="submit">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col p-3 sm:p-4 md:p-5 my-4 lg:my-7 shadow-2xl rounded-lg w-full lg:w-1/2">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsSection;
