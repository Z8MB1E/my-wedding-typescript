import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IRegistryNewItem } from "../Components/RegistryNewItemModal";
import { API_URL } from "../Config";
import {
  IRegistryCategory,
  IRegistryGiftFund,
  IRegistryItem,
} from "../Interfaces/RegistryInterfaces";
import RegistryView from "../Views/RegistryView";

const CATEGORY_LIST: IRegistryCategory[] = [];
const GIFT_FUND_LIST: IRegistryGiftFund[] = [];
const ITEM_LIST: IRegistryItem[] = [];

const RegistryController: React.FC = () => {
  const [categories, setCategories] = useState(CATEGORY_LIST);
  const [giftFunds, setGiftFunds] = useState(GIFT_FUND_LIST);
  const [items, setItems] = useState(ITEM_LIST);
  const [isAdmin, setIsAdmin] = useState(false);
  const [registryShouldRefresh, setRegistryShouldRefresh] = useState(false);
  const [registryStats, setRegistryStats] = useState({
    TotalValue: 0,
  });
  const [filters, setFilters] = useState({
    price: "",
    date: "",
    claimed: "",
  });

  const [searchParams] = useSearchParams();

  const formatCategories = (data: [{}]) => {
    var categoryList: IRegistryCategory[] = [];
    data.map((category: any) => {
      categoryList.push({
        CategoryId: category.CategoryId,
        CategoryName: category.CategoryName,
      });
    });

    return categoryList;
  };

  const formatGiftFunds = (data: [{}]) => {
    var fundsList: IRegistryGiftFund[] = [];
    data.map((funds: any) => {
      fundsList.push({
        GiftFundId: funds.GiftFundId,
        GiftFundName: funds.GiftFundName,
        GiftFundDescription: funds.GiftFundDescription,
        GiftFundGoal: funds.GiftFundGoal,
        GiftFundAccrued: funds.GiftFundAccrued,
        GiftFundURL: funds.GiftFundURL,
      });
    });

    return fundsList;
  };

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
        CategoryName: item.CategoryName || undefined,
        ItemClaims: item.ItemClaims,
        AmountDesired: item.AmountDesired,
        IsExact: item.IsExact,
      });
    });

    let filteredItemList = itemList;
    // Filter logic.
    //  The filters go in this order:
    //    - Date added.
    //    - Is claimed.
    //    - Price.

    switch (filters.date) {
      case "dateOlder":
        filteredItemList = filteredItemList.reverse();
        break;
      default:
        break;
    }

    switch (filters.claimed) {
      case "claimed_max":
        filteredItemList = filteredItemList.filter(
          (item) => (item.ItemClaims || 0) >= (item.AmountDesired || Infinity)
        );
        break;
      case "claimed":
        filteredItemList = filteredItemList.filter(
          (item) => (item.ItemClaims || 0) > 0
        );
        break;
      case "unclaimed":
        filteredItemList = filteredItemList.filter(
          (item) => (item.ItemClaims || 0) === 0
        );
        break;
      default:
        break;
    }

    switch (filters.price) {
      case "lowToHigh":
        filteredItemList = filteredItemList.sort(
          (a, b) => a.RawPrice - b.RawPrice
        );
        break;
      case "highToLow":
        filteredItemList = filteredItemList.sort(
          (a, b) => b.RawPrice - a.RawPrice
        );
        break;
      default:
        console.log(filters.price);
        if (filters.price === "" || typeof filters.price === "undefined") break;
        let _range = filters.price.split("-");
        filteredItemList = filteredItemList.filter(
          (item) =>
            item.RawPrice >= Number(_range[0]) &&
            item.RawPrice <= Number(_range[1])
        );
    }

    return filteredItemList;
  };

  useEffect(() => {
    axios.get(`${API_URL}/registry/get_stats`).then((response) => {
      setRegistryStats(response.data[0]);
    });
    axios.get(`${API_URL}/registry/categories`).then((response) => {
      setCategories(formatCategories(response.data));
    });
    axios.get(`${API_URL}/registry/giftfunds`).then((response) => {
      setGiftFunds(formatGiftFunds(response.data));
    });
    if (searchParams.get("c")) {
      axios
        .get(`${API_URL}/registry/items/${searchParams.get("c")}`)
        .then((response) => {
          setItems(formatItems(response.data));
        });
    } else {
      axios.get(`${API_URL}/registry/items`).then((response) => {
        setItems(formatItems(response.data));
      });
    }
    axios
      .get(`${API_URL}/auth/is_admin`)
      .then((response) => {
        setIsAdmin(response.data);
      })
      .catch(() => {
        setIsAdmin(false);
      });
  }, []);

  useEffect(() => {
    if (registryShouldRefresh) {
      setRegistryShouldRefresh(false);

      axios.get(`${API_URL}/registry/get_stats`).then((response) => {
        setRegistryStats(response.data[0]);
      });
      axios.get(`${API_URL}/registry/categories`).then((response) => {
        setCategories(formatCategories(response.data));
      });
      axios.get(`${API_URL}/registry/giftfunds`).then((response) => {
        setGiftFunds(formatGiftFunds(response.data));
      });
      if (searchParams.get("c")) {
        axios
          .get(`${API_URL}/registry/items/${searchParams.get("c")}`)
          .then((response) => {
            setItems(formatItems(response.data));
          });
      } else {
        axios.get(`${API_URL}/registry/items`).then((response) => {
          setItems(formatItems(response.data));
        });
      }
      axios
        .get(`${API_URL}/auth/is_admin`)
        .then((response) => {
          setIsAdmin(response.data);
        })
        .catch(() => {
          setIsAdmin(false);
        });
    }
  }, [registryShouldRefresh]);

  const handleNewItem = async (formData: IRegistryNewItem) => {
    console.log("Awaiting Promise resolution...");
    axios
      .post(`${API_URL}/registry/items/new`, formData)
      .then((response) => {
        console.log("Resolved!");
        axios.get(`${API_URL}/registry/items`).then((response) => {
          setItems(formatItems(response.data));
        });
        return Promise.resolve(response.data);
      })
      .catch((response) => Promise.reject(response.data));
  };

  const handleClaim = async (itemId: number, itemClaimant: string) => {
    axios
      .post(`${API_URL}/registry/claims/new`, {
        ItemId: itemId,
        GuestClaiming: itemClaimant,
      })
      .then((response) => {
        setRegistryShouldRefresh(true);
        return Promise.resolve(response.data);
      });
  };

  const handleRefresh = (refresh?: boolean) => {
    // console.log(`refresh?: ${refresh}`);
    if (refresh) {
      setRegistryShouldRefresh(true);
    }
    // console.log(`registryShouldRefresh: ${registryShouldRefresh}`);
    return refresh;
  };

  return (
    <>
      <RegistryView
        categories={categories}
        giftFunds={giftFunds}
        items={items}
        isAdmin={isAdmin}
        handleNewItem={handleNewItem}
        shouldRefresh={(refresh?: boolean) => handleRefresh(refresh)}
        handleClaim={(id: number, name: string) => handleClaim(id, name)}
        registryStats={registryStats}
        updateFilters={(args: {
          price: string;
          date: string;
          claimed: string;
        }) => {
          setFilters({ ...filters, ...args });
        }}
      />
    </>
  );
};

export default RegistryController;
