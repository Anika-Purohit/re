import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN } from "./Config";
import useRestaurant from "../utils/useRestaurant";
import {Shimmer} from "./Shimmer";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { removeItem} from "../utils/cartSlice";


const RestaurantMenu = () => {
  const { id} = useParams();

  const restaurant = useRestaurant(id);

  const dispatch = useDispatch();

  const handleAddItem = (itemCards) =>{
    dispatch(addItem(itemCards));
  };
  const handleRemoveItem = (itemCards) =>{
    dispatch(removeItem(itemCards));
  };
  
  const recData =
    restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
      (items) => items?.card?.card?.title == "Recommended"
    );

  console.log(recData);

  // .find(items => items.card.card.title=="Recommended")

  return !recData ? (<Shimmer />) :(
          <>
          <div data-testid="menu" className="menu-items-container">
            <div className="menu-title-wrap">
              <h3 className="text-2xl font-semibold">BEST SELLERS</h3>
              <p className="text-xl ">
                {Object?.keys(recData?.card?.card?.itemCards).length} ITEMS
              </p>
            </div>
            
                  
            <div className="menu-items-list">
              {Object.values(recData?.card?.card?.itemCards).map(
                (itemCards) => (
                  
                  <div className="flex">
                    <div className="menu-img-wrapper">
                      {itemCards?.card?.info?.imageId && (
                        <img
                          className="w-52"
                          src={IMG_CDN + itemCards?.card?.info?.imageId}
                          alt={itemCards?.card?.info?.description}
                        />
                      )}
                     
                    </div>
                    <div className="flex">
                      <h3 className="font-bold m-3 flex">
                        {itemCards?.card?.info?.name}
                      </h3>
                      <p className="flex m-3 ">
                        {itemCards?.card?.info?.price > 0
                          ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(itemCards?.card?.info?.price / 100)
                          : " "}
                      </p>
                      </div>
                      <button data-testid="addBtn" className = "bg-red-500 w-16 h-7"onClick={()=>handleAddItem(itemCards?.card?.info)}>
                      Add</button>
                      <button className = "bg-red-500 w-16 h-7"onClick={()=>handleRemoveItem(itemCards?.card?.info)}>
                      Remove</button>
                  </div>
                )
              )}
            </div>
          </div>
    
    </>
  );
}

export default RestaurantMenu;
