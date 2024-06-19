// import React from "react";

// const Register2 = () => {
//   return (
//     <div>
//       {" "}
//       <div className="flex md:gap-2 lg:gap-10 xl:gap-10 items-center justify-between sm:block">
//         <div className="flex flex-col">
//           <label htmlFor="firstName" className="flex my-1">
//             First name{" "}
//             {errors.firstName && (
//               <div className=" text-red-800 text-[12px] flex items-center mx-2">
//                 <AiFillCloseCircle />
//                 {errors.firstName.message}
//               </div>
//             )}
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             className={`bg-gray-50 border border-gray-500 rounded-lg md:w-full w-60 sm:w-full p-2.5

//                       `}
//             placeholder="John"
//             {...register("firstName", { required: true })}
//           />
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="last_name" className="flex my-1 ml-1">
//             Last name
//             {errors.lastName && (
//               <div className=" text-red-800 text-[12px] flex items-center mx-2">
//                 <AiFillCloseCircle />
//                 {errors.lastName.message}
//               </div>
//             )}
//           </label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className={`bg-gray-50 border border-gray-500 rounded-lg p-2.5 md:w-full w-60 sm:w-full`}
//             placeholder="Doe"
//             {...register("lastName", { required: true })}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register2;
