import React, { useState, useEffect } from 'react';
import { useGetWishListQuery, useRemoveFromWishlistMutation } from '../redux/api/cartApi';
import { CircularProgress } from '../ui/loader';
import { AllProductsCard } from '../reusable/ProductCards';
import ReactPaginate from 'react-paginate';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  const { data: wishListData, isLoading: isLoadingWishList, isError: isErrorWishList } = useGetWishListQuery({});

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = wishListData?.wishlist.slice(itemOffset, endOffset) || [];
  const pageCount = Math.ceil((wishListData?.wishlist.length || 0) / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % (wishListData?.wishlist.length || 0);
    setItemOffset(newOffset);
  };

  const [removeWish, {isLoading: isLoadingRemoveWishList, isError: isErrorRemoveWishList}] = useRemoveFromWishlistMutation()
  
  const removeWishList = async (productId: string) => {
  try {
    const res = await removeWish(productId).unwrap();
    toast.success(res?.message || "Product removed from wishlist")
    } catch (error) {
      console.error("Failed to remove item from wishlist", error);
    }
  }

  return (
    <div>
      <div className="text-2xl sm:text-3xl md:text-4xl flex justify-center font-bold text-purple-600 my-4">
        Wishlist
      </div>
      <div>
        <div className="max-w-screen-xl mx-auto px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
            {isLoadingWishList ? (
              <div className="col-span-full flex justify-center py-10">
                <CircularProgress />
              </div>
            ) : isErrorWishList ? (
              <p className="col-span-full text-center text-red-500">Error loading wishlist items</p>
            ) : currentItems.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-10">Your wishlist is empty</p>
            ) : (
              currentItems.map((item: any) => (
                <div key={item._id}>
                  <AllProductsCard
                    id={item._id}
                    title={item.name}
                    text={item.brand}
                    discountPrice={item.price}
                    rating={"5"}
                    img={item.productImg}
                    price={item.falsePrice}
                  />
                  <button 
                    className="flex justify-center text-center w-full bg-purple-600 p-2 text-white text-sm mt-3 cursor-pointer hover:bg-purple-700 shadow-md rounded-lg transition"
                    onClick={() => removeWishList(item._id)}
                  >
                    Remove from wishlist
                  </button>
                </div>
              ))
            )}
          </div>

          {pageCount > 1 && (
            <div className="flex justify-center mt-6">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName="flex gap-2 items-center"
                pageLinkClassName="px-3 py-1 rounded border text-sm"
                previousLinkClassName="px-3 py-1 rounded border text-sm"
                nextLinkClassName="px-3 py-1 rounded border text-sm"
                activeLinkClassName="bg-purple-600 text-white border-purple-600"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
