import { MouseEvent, useEffect, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Pagination,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  IRegistryCategory,
  IRegistryGiftFund,
  IRegistryItem,
} from "../Interfaces/RegistryInterfaces";
// import { run as runHolder } from "holderjs/holder";
import { useHolderjs } from "use-holderjs";
import RegistryNewItemModal, {
  IRegistryNewItem,
} from "../Components/RegistryNewItemModal";
import RegistryClaimItemModal from "../Components/RegistryClaimItemModal";
import { useCookies } from "react-cookie";
import RegistryInstructionsModal from "../Components/RegistryInstructionsModal";
import MultiRangeSlider from "../Components/multiRangeSlider/MultiRangeSlider";
import { numberIsBetween } from "../Helpers";

const RegistryView: React.FC<{
  categories: IRegistryCategory[];
  giftFunds: IRegistryGiftFund[];
  items: IRegistryItem[];
  isAdmin: boolean;
  handleNewItem: any;
  handleClaim: any;
  shouldRefresh: any;
  registryStats: {
    TotalValue: number;
  };
  updateFilters: any;
}> = (props) => {
  const [categories, setCategories] = useState(props.categories);
  const [giftFunds, setGiftFunds] = useState(props.giftFunds);
  const [items, setItems] = useState(props.items);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  const [showModal, setShowModal] = useState(false); // New item modal
  const [showClaimModal, setShowClaimModal] = useState(false); // Claim item modal
  const [claimModalItem, setClaimModalItem] = useState({
    id: 0,
    url: "",
    isMaxClaimed: false,
  });
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  // const [filters, setFilters] = useState({
  //   price: "",
  //   alpha: "",
  // });
  const [sliderValues, setSliderValues] = useState({
    min: 0,
    max: 1000,
    curMin: 0,
    curMax: 1000,
  });
  const [pageData, setPageData] = useState({
    currentPage: 1,
    itemsToShow: 999,
  });

  const [searchParams, setSearchParams] = useSearchParams({});

  // const filterRef = useRef<any>(null);

  // const [cookies, setCookie] = useCookies(["clientFirstVisit"]);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    setGiftFunds(props.giftFunds);
  }, [props.giftFunds]);

  useEffect(() => {
    setItems(props.items);
    setTimeout(() => {
      if (searchParams.get("item")) {
        var item = searchParams.get("item");
        var element = document.querySelector(
          `[data-id='i_${item}']`
        ) as HTMLElement;
        if (element) {
          console.log(element);
          window.scrollTo({
            top: element.offsetTop * 0.985,
            behavior: "smooth",
          });
        }
      }
    }, 250);
  }, [props.items]);

  useEffect(() => {
    setIsAdmin(props.isAdmin);
  }, [props.isAdmin]);

  useEffect(() => {
    if (props.shouldRefresh) {
      setCategories(props.categories);
      setGiftFunds(props.giftFunds);
      setItems(props.items);
      setIsAdmin(props.isAdmin);
      setShouldRefresh(false);
    }
  }, [props.shouldRefresh]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShouldRefresh(true);
  //     if (sliderValues.curMin !== 0 || sliderValues.curMax !== 1000) {
  //       props.updateFilters(
  //         `${sliderValues.curMin}-${sliderValues.curMax}`,
  //         ""
  //       );
  //     } else {
  //       props.updateFilters("", "");
  //     }
  //   }, 600);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [sliderValues]);

  useEffect(() => {
    if (shouldRefresh) {
      props.shouldRefresh(shouldRefresh);
    }
  }, [shouldRefresh]);

  useEffect(() => {
    document.title = "Registry - Jason & Alyssa";
  }, []);

  // useEffect(() => {
  //   runHolder("card-img-top");
  // });

  const openNewItemModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handlePurchase = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    item: IRegistryItem,
    isMaxClaimed: boolean
  ) => {
    // if (cookies.clientFirstVisit) {
    //   await showInstructions();
    // }
    // gtag("event", "view_item", {
    //   currency: "USD",
    //   value: item.RawPrice,
    //   items: [
    //     {
    //       item_id: item.ItemId,
    //       item_name: item.ItemName,
    //       item_category: item.CategoryName,
    //     },
    //   ],
    // });
    setClaimModalItem({
      id: item.ItemId,
      url: item.ItemPurchaseURL,
      isMaxClaimed,
    });
    setShowClaimModal(true);
  };

  // const showInstructions = async () => {
  //   setShowInstructionsModal(true);
  // };

  const getPagination = (activePage: number) => {
    if (pageData.itemsToShow >= items.length) return;
    var pages = [];
    for (let i = 1; i <= Math.round(items.length / pageData.itemsToShow); i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === pageData.currentPage}
          onClick={() => setPageData({ ...pageData, currentPage: i })}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  // const numberIsBetween

  useHolderjs();

  return (
    <>
      <RegistryNewItemModal
        show={showModal}
        onHide={() => setShowModal(false)}
        categories={categories}
        saveNewItem={(formData: IRegistryNewItem) =>
          props.handleNewItem(formData)
        }
      />
      <RegistryClaimItemModal
        show={showClaimModal}
        onHide={() => setShowClaimModal(false)}
        item={claimModalItem}
        handleClaim={(id: number, name: string) => props.handleClaim(id, name)}
      />
      {/* <RegistryInstructionsModal
        show={showInstructionsModal}
        onHide={() => setShowInstructionsModal(false)}
      /> */}
      <Container fluid className="p-sm-5 p-3">
        <Row>
          <Col className="text-center">
            <h1>Our Wedding Registry</h1>
            <p className="lead">
              Want to support us as we start this next stage of life? Take a
              look at our registry.
              <span className="d-block fs-6">
                We appreciate <i>anything</i> and <i>everything</i> you give!
              </span>
            </p>
            <p>
              <h5>Ship to:</h5>
              <a
                href="https://www.google.com/maps/place/Mount+Vernon+Nazarene+University/@40.3753799,-82.4713082,16.25z"
                target="_blank"
                rel="noreferrer"
              >
                Box F-2318, 800 Martinsburg Rd, Mt Vernon, OH 43050
              </a>
            </p>
            {isAdmin && (
              <p className="text-muted small">
                Total Registry Value:{" "}
                {props.registryStats.TotalValue > 0
                  ? `~$${props.registryStats.TotalValue.toLocaleString()}`
                  : "Loading..."}
              </p>
            )}
          </Col>
        </Row>
        <Container fluid className="registry-container">
          <Row className="gx-2">
            {/* Sorting / Categories List */}
            <Col md={3}>
              <div className="bg-white border rounded-3 shadow-sm p-3">
                <Row className="p-2 mb-4">
                  <Col>
                    <h4>Categories</h4>
                    <hr />
                    {/* TODO: SWITCH TO DATABASE CATEGORIES */}
                    {/* <Link to="?c=1">
                    <Button variant="outline-primary">Kitchenware</Button>
                  </Link> */}
                    <Row md={1} lg={2} className="g-1">
                      <Col>
                        <Link to="">
                          <Button
                            variant="outline-secondary"
                            className="w-100 h-100"
                            onClick={() => setShouldRefresh(true)}
                          >
                            None
                          </Button>
                        </Link>
                      </Col>
                      {categories.length > 0 ? (
                        categories.map((category, _idx) => {
                          return (
                            <Col key={_idx}>
                              <Link to={"?c=" + category.CategoryId}>
                                <Button
                                  variant="outline-primary"
                                  className="w-100 h-100"
                                  onClick={() => setShouldRefresh(true)}
                                >
                                  {category.CategoryName}
                                </Button>
                              </Link>
                            </Col>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </Row>
                  </Col>
                </Row>
                <Row className="p-2">
                  <Col>
                    <h4>Filters</h4>
                    <Form>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-muted">
                          Filter by Price
                        </Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            setShouldRefresh(true);
                            props.updateFilters({ price: e.target.value });
                          }}
                        >
                          <option value="">No Sorting</option>
                          <option value="lowToHigh">Low to High</option>
                          <option value="highToLow">High to Low</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-muted">
                          Filter by Date Added
                        </Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            setShouldRefresh(true);
                            props.updateFilters({ date: e.target.value });
                          }}
                        >
                          <option value="dateNewer">Newer First</option>
                          <option value="dateOlder">Older First</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-muted">
                          Filter by Claim Status
                        </Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            setShouldRefresh(true);
                            props.updateFilters({ claimed: e.target.value });
                          }}
                          // ref={filterRef}
                        >
                          <option value="">No Sorting</option>
                          <option value="unclaimed">Unclaimed Only</option>
                          <option value="claimed">Claimed Only</option>
                          <option value="claimed_max">
                            Maximum Claimed Only
                          </option>
                        </Form.Select>
                        {/* <Form.Text className="text-danger" hidden={filterRef.current.value !== "claimed_max"}>You're viewing items that have as many claims as quantity we are asking for. Are you sure you want to sort by this filter?</Form.Text> */}
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-muted">
                          Filter by Featured Items
                        </Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            setShouldRefresh(true);
                            props.updateFilters({ featured: e.target.value });
                          }}
                          // ref={filterRef}
                        >
                          <option value="false">All Products</option>
                          <option value="true">Featured Products Only</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
                    {/* <p className="text-muted">Nothing here at the moment!</p> */}
                  </Col>
                </Row>
              </div>
            </Col>
            {/* Product List */}
            <Col>
              <div className="bg-white border rounded-3 shadow-sm p-3">
                <Row className="p-2">
                  <Col>
                    <h4>Registry Items</h4>
                    <p className="text-muted">
                      Each of the items listed in our registry will have direct
                      purchase links you can use to make your purchase. Since we
                      do not have direct access to payments through this
                      website, we've created a "claim" system that will indicate
                      how many individuals have elected to purchase any
                      particular item. For example, if you want to purchase an
                      item, you can click on its store link, purchase it, then
                      return to this page and "claim" it to indicate that you
                      have bought the item.
                      <br />
                      <span className="fst-italic small">
                        You can also see how many claims are on any claimed
                        products so that you can make the most informed buying
                        decisions!
                      </span>
                    </p>
                    <hr />
                  </Col>
                </Row>
                <Row className="mb-3 gy-2">
                  <Col md={3}>
                    <Form.Select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setPageData({
                          currentPage: 1,
                          itemsToShow: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value={999}>Show all items</option>
                      {[6, 12, 20, 30].map((value) => {
                        return (
                          <option value={value}>Show {value} items</option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Pagination className="flex-wrap">
                      {getPagination(pageData.currentPage)}
                    </Pagination>
                  </Col>
                </Row>
                <Row lg={4} md={3} sm={2} xs={1} className="p-2 g-4">
                  {/* <Col>
                  <Card>
                    <div className="imgAndPriceHolder">
                      <Card.Img
                        variant="top"
                        src="holder.js/200x150?auto=yes"
                      />
                      <div className="priceDiv">$5.99</div>
                    </div>
                    <Card.Body>
                      <Card.Title>Example Registry Item</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Purchase and claim!</Button>
                    </Card.Body>
                  </Card>
                </Col> */}
                  {/* Gift Funds List */}
                  {giftFunds.length > 0 ? (
                    giftFunds.map((fund, _idx) => {
                      var progress =
                        fund.GiftFundGoal === 0
                          ? -1
                          : Math.floor(
                              (fund.GiftFundAccrued / fund.GiftFundGoal) * 100
                            );
                      return (
                        <Col key={_idx}>
                          <Card border="success" className="h-100 shadow">
                            <Card.Header className="fv-sc fw-bold text-secondary">
                              <i className="fa-solid fa-gift fa-fw" /> Gift Fund
                              {progress !== -1 ? (
                                <ProgressBar
                                  variant="success"
                                  now={progress}
                                  label={`${progress}%`}
                                />
                              ) : (
                                <ProgressBar
                                  variant="success"
                                  now={100}
                                  label={
                                    <abbr title="This fund has no set goal. You can give as much as you want to this fund!">
                                      ${fund.GiftFundAccrued.toFixed(2)} /
                                      &infin;
                                    </abbr>
                                  }
                                  className="w-100 mt-2"
                                  style={{ height: "25px" }}
                                />
                              )}
                            </Card.Header>
                            <Card.Img
                              variant="top"
                              src="https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            />
                            <Card.Body className="d-flex flex-column align-items-baseline">
                              <Card.Title>{fund.GiftFundName}</Card.Title>
                              <Card.Text>{fund.GiftFundDescription}</Card.Text>
                              <Button
                                href={
                                  fund.GiftFundURL ||
                                  `?giveTo=${fund.GiftFundId}`
                                }
                                target={fund.GiftFundURL ?? "_blank"}
                                variant="success"
                                className="mt-auto w-100"
                              >
                                <i className="fa-solid fa-hand-holding-dollar fa-fw" />{" "}
                                Give a gift!
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })
                  ) : (
                    <></>
                  )}
                  {/* Regular Product List */}
                  {isAdmin && (
                    <Col style={{ minHeight: "250px" }}>
                      <Card className="h-100 shadow">
                        <Card.Body className="d-flex flex-column justify-content-center text-center">
                          <Button
                            variant="outline-primary"
                            className="stretched-link w-100 h-100 shadow-sm"
                            onClick={openNewItemModal}
                          >
                            <i className="fs-2 fa-solid fa-plus fa-fw" />
                            <br />
                            Add a New Item
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}
                  {items.length > 0 ? (
                    items.map((item, _idx) => {
                      if (
                        pageData.itemsToShow >= 999 ||
                        numberIsBetween(
                          _idx,
                          pageData.currentPage * pageData.itemsToShow -
                            pageData.itemsToShow,
                          pageData.currentPage * pageData.itemsToShow
                        )
                      )
                        return (
                          <Col key={_idx} data-id={`i_${item.ItemId}`}>
                            <Card
                              border={
                                searchParams.get("item") &&
                                searchParams.get("item") === item.ItemId.toString()
                                  ? "primary"
                                  : ""
                              }
                              className="h-100 shadow"
                            >
                              <div className="imgAndPriceHolder">
                                <Card.Img
                                  variant="top"
                                  src={item.ItemImageURL}
                                />
                                <div className="priceDiv">
                                  <abbr
                                    title={`An estimated price of ${item.EstimatedPrice.replace(
                                      "+",
                                      " or more"
                                    )}.`}
                                  >
                                    {item.EstimatedPrice}
                                  </abbr>
                                </div>
                              </div>
                              {item.ItemIsFeatured ? (
                                <Card.Header as="h6" className="text-primary">
                                  <i className="fa-solid fa-star fa-fw me-1" />
                                  Featured
                                  <span className="text-muted">
                                    {" "}
                                    - Highly Desirable
                                  </span>
                                </Card.Header>
                              ) : null}
                              <Card.Body className="d-flex flex-column align-items-baseline">
                                <Card.Title>
                                  {item.ItemName}
                                  {item.CategoryName ? (
                                    <span className="d-block fs-6 fw-normal text-muted">
                                      {item.CategoryName}
                                    </span>
                                  ) : undefined}
                                  <Badge bg="secondary" className="mt-1 me-1">
                                    {item.ItemClaims}
                                    {item.AmountDesired ? (
                                      <span>
                                        <span className="small"> out of</span>{" "}
                                        {item.AmountDesired}
                                      </span>
                                    ) : (
                                      <span>
                                        <span className="small"> out of</span>{" "}
                                        &infin;
                                      </span>
                                    )}{" "}
                                    claims
                                  </Badge>
                                  {item.IsExact ? (
                                    <Badge bg="info">
                                      <abbr title="We would preferably like this item exactly as listed/linked.">
                                        Exact
                                      </abbr>
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </Card.Title>
                                <Card.Text>{item.ItemDescription}</Card.Text>
                                <Button
                                  variant="primary"
                                  className="mt-auto w-100"
                                  onClick={(e) =>
                                    handlePurchase(
                                      e,
                                      item,
                                      (item.ItemClaims || 0) >=
                                        (item.AmountDesired || Infinity)
                                    )
                                  }
                                >
                                  <i className="fa-solid fa-cart-shopping fa-fw" />
                                  &nbsp;Purchase and claim!
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                    })
                  ) : (
                    <>
                      <Alert
                        variant="warning"
                        className="d-flex flex-column justify-content-center align-items-center text-center"
                      >
                        <i className="fa-solid fa-warning fa-fw" />
                        Trying to load registry items...
                        <p className="small">
                          (if you are using filters, there's a chance there are
                          no items matching your filters!)
                        </p>
                      </Alert>
                    </>
                  )}
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center mt-4">
                    <Pagination>
                      {getPagination(pageData.currentPage)}
                    </Pagination>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default RegistryView;
