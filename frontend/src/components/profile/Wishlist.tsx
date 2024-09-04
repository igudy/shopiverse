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
      <div className="text-4xl flex justify-center font-bold text-purple-600 my-4">Wishlist</div>
      {/* <div className='w-full rounded-md h-[.5px] bg-gray-500'></div> */}
      <div>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 grid-cols-4 gap-4 w-full">
            {isLoadingWishList ? (
              <CircularProgress />
            ) : isErrorWishList ? (
              <p>Error loading wishlist items</p>
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
                  <div className='flex justify-center text-center 
                  bg-purple-600 p-1 text-white mt-3
                  cursor-pointer hover:shadow-lg shadow-md
                  rounded-lg' onClick={() => removeWishList(item._id)}>Remove from wishlist</div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="Prev"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="activePage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
