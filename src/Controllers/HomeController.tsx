import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../Config";
import { IRegistryItem } from "../Interfaces/RegistryInterfaces";
import HomeView from "../Views/HomeView";

const ITEM_LIST: IRegistryItem[] = [];

const HomeController: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState(ITEM_LIST);

  const formatItems = (data: [{}]) => {
    var itemList: IRegistryItem[] = [];
    data.map((item: any) => {
      itemList.push({
        ItemId: item.ItemId,
        ItemName: item.ItemName,
        ItemDescription: item.ItemDescription,
        ItemImageURL: item.ItemImageURL,
        ItemPurchaseURL: item.ItemPurchaseURL,
        EstimatedPrice: item.EstimatedPrice,
        RawPrice: item.RawPrice,
        ItemIsFeatured: item.ItemIsFeatured,
        CategoryName: item.CategoryName || undefined,
        ItemClaims: item.ItemClaims,
        AmountDesired: item.AmountDesired,
        IsExact: item.IsExact,
      });
    });
    return itemList;
  };

  useEffect(() => {
    console.log("calling axios")
    axios.get(`${API_URL}/registry/featured_items`).then((response) => {
      setFeaturedItems(formatItems(response.data));
    });
  }, []);

  return <HomeView featuredItems={featuredItems} />;
};

export default HomeController;
