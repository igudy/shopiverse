import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { checkout_details } from "../validation-schema/checkout-schema";

const CheckoutDetailsSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(checkout_details),
  });

   const [locationError, setLocationError] = useState("");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // You can use an API to get the address based on latitude and longitude
          // For simplicity, we'll just set the lat and long as the address here
          setValue("address_line_1", `Lat: ${latitude}, Long: ${longitude}`);
          setLocationError("");
        },
        (error) => {
          setLocationError("Unable to retrieve your location");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser");
    }
  };

  // // Data coming from the refine section
  const onSubmit = async (data: any) => {
    await console.log("Logged In", data);
  };

  return (
    <div>
      <div
        className="flex sm:block gap-5 justify-between 
      mx-16 xsm:mx-2 sm:mx-2"
      >
        {/* <div className='bg-gradient-to-t 
        from-purple-500 to-purple-300 h-10 
        sm:w-full'></div> */}
        <div
          className="flex flex-col mx-10 sm:mx-2 xsm:mx-2 p-5 
        my-7 shadow-2xl right-0  min-w-xl w-full"
        >
          <div>
            <h1 className="text-2xl font-bold text-purple-500 xsm:text-xl sm:text-xl mt-10 md:text-xl sm:mt-1">
              Checkout Details
            </h1>
            <h1 className="text-xl font-bold underline xsm:text-xl sm:text-xl mt-2 md:text-2xl sm:mt-1">
              Shipping Address
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-3">
                {/* Recipient name */}
                <label htmlFor="name" className="flex">
                  Name{" "}
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
 
                {/* Address Line 1 */}
                {/* <label htmlFor="address" className="flex mt-4">
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
                /> */}

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
                <button type="button" onClick={getCurrentLocation} className="mt-2 p-2 bg-purple-500 text-white rounded">
                  Use Current Location
                </button>
                {locationError && (
                  <div className="text-red-800 text-[12px] mt-2">
                    {locationError}
                  </div>
                )}

                {/* Address Line 2 */}
                <label htmlFor="address" className="flex mt-4">
                  Address Line 2{" "}
                  {errors.address_line_2 && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
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
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
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
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
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

                {/* postal code, country dropdown and phone number */}
                {/* Postal Code */}
                <label htmlFor="address" className="flex mt-4">
                  Postal Code{" "}
                  {errors.postal_code && (
                    <div className=" text-red-800 text-[12px] flex items-center mx-2">
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
              <button type="submit" className="submit">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div
          // basis-1/2 md:justify-center
          // xsm:justify-center justify-center flex flex-col
          // xsm:hidden sm:hidden md:hidden lg:hidden
          // sm:justify-center left-0
          className="
        flex flex-col mx-10 sm:mx-2 xsm:mx-2 p-5 
        my-7 shadow-2xl right-0  min-w-xl w-full
        "
        >
          <div>
            <h1 className="text-2xl font-bold px-2 text-purple-500 xsm:text-xl sm:text-xl mt-10 md:text-xl sm:mt-1">
              Checkout Summary
            </h1>
            <div className="flex flex-col">
              <div className="grid gap-2 p-2">
                <div className="flex justify-between">
                  <div className="">Cart Item(s):</div>
                  <div className="font-bold">1</div>
                </div>
                <div className="flex justify-between">
                  <div>Subtotal</div>
                  <div className="font-bold">1300.0</div>
                </div>
              </div>

              <div className="border-2 mt-2 border-purple-500 rounded-xl p-3 text-sm shadow-md bg-gray-100">
                <div className="font-bold">Sony playstation 5(PS5) Console</div>
                <div className="font-medium">- Standard Edition</div>
                <div className="grid gap-2 p-2">
                  <div className="flex justify-between">
                    <div className="text-left">Quantity:</div>
                    <div className="text-right font-bold">200</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-left">Unit Price:</div>
                    <div className="text-right font-bold">$1300</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-left">Set Price:</div>
                    <div className="text-right font-bold">$1300</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsSection;
