import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Fade,
  Form,
  Row,
} from "react-bootstrap";
import { IRSVPInviteeData } from "../Controllers/RSVPController";

const RSVPView: React.FC<{
  inviteeData: IRSVPInviteeData;
  getRSVPData: any;
  handleSaveData: any;
  handleOnlineGuest: any;
  handleUpdateNotice: any;
}> = (props) => {
  const [inviteCode, setInviteCode] = useState({});
  const [codeIsValid, setCodeIsValid] = useState(false);
  const [UIData, setUIData] = useState({
    showBadge: false,
    badgeBg: "secondary",
    badgeIcon: <i className="fa-solid fa-spin fa-circle-notch fa-fw" />,
    badgeText: "Checking...",
    disableInputs: false,
    isValidCode: false,
    unsavedData: false,
    onlineGuestDataSubmitted: false,
  });
  const [inviteeData, setInviteeData] = useState<IRSVPInviteeData>(
    props.inviteeData
  );
  const [onlineGuestData, setOnlineGuestData] = useState({
    isAnonymous: false,
    firstName: "",
    lastName: "",
    bestWishes: "",
    displayPermitted: false,
  });
  // const [RSVPData, setRSVPData] = useState({
  //   hasChanged: false,
  //   guests: {}
  // });

  useEffect(() => {
    setInviteeData(props.inviteeData);
    // console.log(inviteeData);
  }, [props.inviteeData]);

  // Element references
  const codeInput1 = useRef<any>(null);
  const codeInput2 = useRef<any>(null);
  const codeInput3 = useRef<any>(null);
  const codeInput4 = useRef<any>(null);

  useEffect(() => {
    if (Object.keys(inviteCode).length === 4 && !UIData.disableInputs) {
      setUIData({
        showBadge: true,
        badgeBg: "secondary",
        badgeIcon: <i className="fa-solid fa-spin fa-circle-notch fa-fw" />,
        badgeText: "Checking...",
        disableInputs: true,
        isValidCode: false,
        unsavedData: false,
        onlineGuestDataSubmitted: UIData.onlineGuestDataSubmitted,
      });

      setTimeout(() => {
        props
          .getRSVPData(Object.values(inviteCode).join(""))
          .then(() => {
            setUIData({
              showBadge: true,
              badgeBg: "success",
              badgeIcon: <i className="fa-solid fa-check fa-fw" />,
              badgeText: "Validated!",
              disableInputs: true,
              isValidCode: true,
              unsavedData: false,
              onlineGuestDataSubmitted: UIData.onlineGuestDataSubmitted,
            });

            setTimeout(() => {
              setUIData({
                showBadge: false,
                badgeBg: "success",
                badgeIcon: <i className="fa-solid fa-check fa-fw" />,
                badgeText: "Validated!",
                disableInputs: true,
                isValidCode: true,
                unsavedData: false,
                onlineGuestDataSubmitted: UIData.onlineGuestDataSubmitted,
              });
            }, 3000);
          })
          .catch(() => {
            codeInput1.current.value = null;
            codeInput2.current.value = null;
            codeInput3.current.value = null;
            codeInput4.current.value = null;
            setInviteCode({});
            setUIData({
              showBadge: true,
              badgeBg: "danger",
              badgeIcon: <i className="fa-solid fa-xmark fa-fw" />,
              badgeText: "Invalid code.",
              disableInputs: false,
              isValidCode: false,
              unsavedData: false,
              onlineGuestDataSubmitted: UIData.onlineGuestDataSubmitted,
            });
          });
      }, 500);
    }
  }, [inviteCode]);

  const handleCodeChange = (e: React.ChangeEvent<any>, id: number) => {
    var _index = parseInt(e.target.id.split("Code")[1]);
    setInviteCode({ ...inviteCode, [e.target.id]: e.target.value });
    e.target.value = e.target.value.toLocaleUpperCase();
    if (_index === 4) return;
    switch (_index) {
      case 1:
        codeInput2.current.focus();
        codeInput2.current.select();
        break;
      case 2:
        codeInput3.current.focus();
        codeInput3.current.select();
        break;
      case 3:
        codeInput4.current.focus();
        codeInput4.current.select();
        break;
      default:
        break;
    }
    return;
  };

  const handleGuestDataChange = (
    e: React.ChangeEvent<any>,
    index: number,
    id?: number
  ) => {
    if (inviteeData) {
      var guestData = inviteeData;
      // guestData.guests.map((guest, _idx) => {
      //   if (_idx === index) {
      //     console.log({ ...guest, [e.target.name]: e.target.value });
      //     console.log(`${_idx} - ${e.target.name}: ${e.target.value}`);
      //     return { ...guest, [e.target.name]: e.target.value };
      //   } else return guest;
      // });
      guestData.guests[index] = {
        ...guestData.guests[index],
        [e.target.name]: e.target.value,
      };
      // console.log(guestData);
      setUIData({ ...UIData, unsavedData: true });
      setInviteeData((prevState) => {
        return { ...prevState, guestData };
      });
    }
  };

  const handleOnlineGuestDataChange = (e: React.ChangeEvent<any>) => {
    if (
      e.target.name === "isAnonymous" ||
      e.target.name === "displayPermitted"
    ) {
      setOnlineGuestData({
        ...onlineGuestData,
        [e.target.name]: e.target.checked,
      });
      return;
    }
    setOnlineGuestData({ ...onlineGuestData, [e.target.name]: e.target.value });
  };

  const submitOnlineGuestData = async () => {
    props.handleOnlineGuest(onlineGuestData).then(() => {
      setTimeout(() => {
        setUIData({ ...UIData, onlineGuestDataSubmitted: true });
      }, 500);
    });
  };

  const handleSaveData = (inviteeData: IRSVPInviteeData) => {
    props.handleSaveData(inviteeData).then(() => {
      setUIData({ ...UIData, unsavedData: false });
    });
  };

  return (
    <Container fluid className="p-sm-5 p-3">
      <Row>
        <Col className="text-center">
          <h1>RSVP</h1>
          <p className="lead">
            Let us know your plans to attend by RSVP-ing below!
          </p>
        </Col>
      </Row>
      <Row sm={1} md={UIData.isValidCode ? 1 : 2} className="gy-2">
        <Col>
          <Row
            className={`text-center p-3 ${
              !UIData.isValidCode ? "bg-white shadow" : ""
            } mx-2 rounded`}
          >
            <Col>
              <div>
                <i className="fa-solid fa-users fa-fw" />
              </div>
              <h2>Attending In Person</h2>
              <p className="lead">
                If you received a physical invite, please enter the four-letter
                code that was attached to the invite in the input box under
                "Attending In Person".
              </p>
              <Alert
                variant="warning"
                hidden={UIData.badgeText !== "Invalid code."}
              >
                <i className="fa-solid fa-warning fa-fw me-1" />
                Received a physical invite but your code comes back invalid?
                Contact us directly for assistance or wait at least one day and
                try again.
              </Alert>
              <Form>
                <Form.Group>
                  <Form.Label>Physical Invite Code</Form.Label>
                  <Row
                    className={
                      (UIData.isValidCode ? "w-lg-25" : "w-lg-50") + " m-auto"
                    }
                    xs={4}
                  >
                    {/* {[codeInput1, codeInput2, codeInput3, codeInput4].map(
                      (input, _idx) => {
                        <Col>
                          <Form.Control
                            id={`inviteCode${_idx + 1}`}
                            name={`inviteCode${_idx + 1}`}
                            ref={input}
                            size="lg"
                            className="text-center"
                            maxLength={1}
                            onChange={(e) => handleChange(e, _idx)}
                            disabled={UIData.disableInputs}
                          />
                        </Col>;
                      }
                    )} */}
                    <Col>
                      <Form.Control
                        id="inviteCode1"
                        name="inviteCode1"
                        ref={codeInput1}
                        size="lg"
                        className="text-center"
                        maxLength={1}
                        onChange={(e) => handleCodeChange(e, 0)}
                        disabled={UIData.disableInputs}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        id="inviteCode2"
                        name="inviteCode2"
                        ref={codeInput2}
                        size="lg"
                        className="text-center"
                        maxLength={1}
                        onChange={(e) => handleCodeChange(e, 1)}
                        disabled={UIData.disableInputs}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        id="inviteCode3"
                        name="inviteCode3"
                        ref={codeInput3}
                        size="lg"
                        className="text-center"
                        maxLength={1}
                        onChange={(e) => handleCodeChange(e, 2)}
                        disabled={UIData.disableInputs}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        id="inviteCode4"
                        name="inviteCode4"
                        ref={codeInput4}
                        size="lg"
                        className="text-center"
                        maxLength={1}
                        onChange={(e) => handleCodeChange(e, 3)}
                        disabled={UIData.disableInputs}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="my-2 fs-5">
                      <Fade in={UIData.showBadge}>
                        <Badge pill={true} bg={UIData.badgeBg}>
                          {UIData.badgeIcon} {UIData.badgeText}
                        </Badge>
                      </Fade>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row
            className="w-md-50 mb-5 align-content-center justify-content-center m-auto shadow"
            hidden={inviteeData.noChildrenUnderstood || !UIData.isValidCode}
          >
            <Col className="p-3 text-center bg-white rounded">
              <span className="fs-3">
                <i className="fa-solid fa-feather-pointed fa-fw" />
              </span>
              <h2 className="mb-0">A Note for our Guests</h2>
              <div className="text-muted small mb-3">
                &darr; Scroll down once you've finished reading! &darr;
              </div>
              <p>
                Thank you so much for joining us for our important day! A few
                important things to note: we know you love your children, and we
                probably love your children too. However, we are looking to keep
                our wedding small. The Hayner Center has also requested that the
                only children present are those essential for the wedding. So
                please, take this as an opportunity to enjoy the day out without
                children!
              </p>
              {/* <p>
                We are also looking into streaming options for all of our
                friends and families who are unable to attend. If this is what
                you think you will be doing, please leave that in the comment
                section of the RSVP form so that we can have a decent head count
                as to who will be online or in person. 🙂 Further information on
                this will be released as we get closer to the date.
              </p> */}
              <p>
                We would also ask that if someone was not listed on the
                invitation list, you wouldn’t bring them along. The venue is
                small and we want it to be an intimate wedding and even if we
                like your grandmother’s sister’s best friend, we ask that you
                don’t bring them if they are not <i>explicitly mentioned </i>in your
                invitation.
              </p>
              <p>
                Thank you for reading this note and our requests, however odd or
                unfavorable they may seem. We want this day to be very special
                and enjoyable for everyone, and we believe this is the way we
                want to do it. Your understanding is appreciated immensely. We
                love you all. ❤
              </p>
              <p className="small text-muted">- Jason &amp; Alyssa</p>
              <div>
                <Button
                  onClick={() => {
                    props
                      .handleUpdateNotice(Object.values(inviteCode).join(""))
                      .then(() =>
                        setInviteeData({
                          ...inviteeData,
                          noChildrenUnderstood: true,
                        })
                      );
                  }}
                >
                  <i className="fa-solid fa-check fa-fw me-1" />
                  Understood, close this notice!
                </Button>
              </div>
            </Col>
          </Row>
          <Row
            className="w-md-75 m-auto bg-white my-2 border rounded-3 p-3 shadow-lg"
            hidden={!UIData.isValidCode}
          >
            <Col className="m-auto text-center">
              <div>
                <i className="fa-solid fa-list-check fa-fw" />
              </div>
              <h3>Guest List</h3>
              <p className="text-muted">
                {inviteeData.guests.length > 1
                  ? `Hello to the ${inviteeData.guests[0].last} family!`
                  : `Hello, ${inviteeData.guests[0].first}!`}
                <br />
                Let us know your intent to attend by RSVPing below (as well as
                any additional information!)
              </p>
              <Row className="pt-2 pb-3">
                <Col>
                  <Button
                    disabled={!UIData.unsavedData}
                    onClick={() => handleSaveData(inviteeData)}
                  >
                    <i className="fa-solid fa-save fa-fw me-1" />
                    Save Changes
                  </Button>
                </Col>
              </Row>
              <Form>
                {inviteeData &&
                  inviteeData.guests.map((guest, _idx) => {
                    return (
                      <Row
                        md={4}
                        xs={1}
                        key={_idx}
                        className="mb-3 border-bottom pb-3"
                      >
                        <Col>
                          <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              id="firstName"
                              name="firstName"
                              readOnly={true}
                              value={guest.first}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              id="lastName"
                              name="lastName"
                              readOnly={true}
                              value={guest.last}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Intent to Attend</Form.Label>
                            <Form.Select
                              id="intent"
                              name="intent"
                              // defaultValue={guest.intent}
                              value={guest.intent}
                              onChange={(e) => {
                                // guest.intent = e.target.value;
                                // setInviteeData(inviteeData);
                                handleGuestDataChange(e, _idx, guest.id);
                              }}
                            >
                              <option value="YES" className="text-success">
                                Yes
                              </option>
                              <option value="MAYBE">Maybe</option>
                              <option value="NO" className="text-danger">
                                No
                              </option>
                            </Form.Select>
                            <Form.Text>
                              <Badge
                                bg={
                                  guest.intent === "YES"
                                    ? "success"
                                    : guest.intent === "MAYBE"
                                    ? "secondary"
                                    : "danger"
                                }
                              >
                                {guest.intent === "YES" ? (
                                  <i className="fa-solid fa-check fa-fw me-1" />
                                ) : guest.intent === "MAYBE" ? (
                                  <i className="fa-solid fa-question fa-fw me-1" />
                                ) : (
                                  <i className="fa-solid fa-xmark fa-fw me-1" />
                                )}
                                {guest.first}{" "}
                                {guest.intent === "YES"
                                  ? "plans to attend!"
                                  : guest.intent === "MAYBE"
                                  ? "may or may not attend."
                                  : "will not attend."}
                                {/* {guest.first} plans to attend! */}
                              </Badge>
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Food Restrictions</Form.Label>
                            <Form.Control
                              as="textarea"
                              id="foodRestrictions"
                              name="foodRestrictions"
                              defaultValue={guest.foodRestrictions}
                              onChange={(e) =>
                                handleGuestDataChange(e, _idx, guest.id)
                              }
                            />
                          </Form.Group>
                        </Col>
                        {/* <Col className="d-flex flex-column align-content-center align-items-center justify-content-center p-3">
                          <Button disabled>
                            <i className="fa-solid fa-save fa-fw me-1" />
                            Save
                          </Button>
                        </Col> */}
                        {/* <Col>
                          <Form.Group>
                            <Form.Label>Comments</Form.Label>
                            <Form.Control as="textarea" value={guest.comments} />
                          </Form.Group>
                        </Col> */}
                      </Row>
                    );
                  })}
              </Form>

              {/* <Table>
                <thead>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Intent to Attend</th>
                  <th>Food Restrictions</th>
                  <th>Comments</th>
                </thead>
                <tbody>
                  {inviteeData && inviteeData.guests.map(guest => {
                    return (<tr>
                      <td>{guest.first}</td>
                      <td>{guest.last}</td>
                      <td>{guest.intent}</td>
                      <td>{guest.foodRestrictions}</td>
                      <td>{guest.comments}</td>
                    </tr>)
                  })}
                </tbody>
              </Table> */}
            </Col>
          </Row>
        </Col>
        <Col hidden={UIData.isValidCode}>
          <Row className="text-center p-3 bg-white shadow mx-2 rounded">
            <Col>
              <div>
                <i className="fa-solid fa-video fa-fw" />
              </div>
              <h2>Attending Online</h2>
              <p className="lead">
                If you did not receive a physical invite, please enter your
                first and last name in the "Attending Online" form to indicate
                your intent to watch online.
              </p>
              <p className="lead fw-bold">
                The livestream will begin at 2:00 PM, May 15, and will last the
                duration of the ceremony.
              </p>
              <p className="text-muted small">
                Note that this RSVP-ing this way is not required and is just a
                way for you to indicate that you watched or intend to watch our
                ceremony online. If you'd like, you may also leave us a "best
                wishes" message which we may display during our reception!
              </p>
              {/* <Alert variant='danger'>
                <i className='fa-solid fa-warning fa-fw me-1' />
                This section is still under construction.
              </Alert> */}
              <Form>
                <Row className="mb-2">
                  <Col>
                    <Form.Group>
                      <Form.Label>
                        Would you like to remain anonymous?
                      </Form.Label>
                      <Form.Switch
                        id="isAnonymous"
                        name="isAnonymous"
                        defaultChecked={false}
                        onChange={handleOnlineGuestDataChange}
                        disabled={UIData.onlineGuestDataSubmitted}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2" hidden={onlineGuestData.isAnonymous}>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        id="firstName"
                        name="firstName"
                        disabled={
                          onlineGuestData.isAnonymous ||
                          UIData.onlineGuestDataSubmitted
                        }
                        onChange={handleOnlineGuestDataChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        id="lastName"
                        name="lastName"
                        disabled={
                          onlineGuestData.isAnonymous ||
                          UIData.onlineGuestDataSubmitted
                        }
                        onChange={handleOnlineGuestDataChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Group>
                      <Form.Label>
                        Wishes for the Couple{" "}
                        <span className="text-muted small">(optional)</span>
                      </Form.Label>
                      <Form.Control
                        id="bestWishes"
                        name="bestWishes"
                        as="textarea"
                        maxLength={255}
                        onChange={handleOnlineGuestDataChange}
                        placeholder="255 characters max."
                        disabled={UIData.onlineGuestDataSubmitted}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label
                        className={
                          onlineGuestData.bestWishes === "" ? "text-muted" : ""
                        }
                      >
                        May we show your message during our reception?
                      </Form.Label>
                      <Form.Switch
                        id="displayPermitted"
                        name="displayPermitted"
                        defaultChecked={false}
                        disabled={
                          onlineGuestData.bestWishes === "" ||
                          UIData.onlineGuestDataSubmitted
                        }
                        onChange={handleOnlineGuestDataChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Button
                      onClick={submitOnlineGuestData}
                      disabled={UIData.onlineGuestDataSubmitted}
                    >
                      <i className="fa-solid fa-paper-plane fa-fw me-1" />
                      Submit
                    </Button>
                  </Col>
                </Row>
                <Row hidden={!UIData.onlineGuestDataSubmitted}>
                  <Col>
                    <Alert>
                      <div>
                        <i className="fa-solid fa-heart fa-fw fs-4 me-1" />
                      </div>
                      <div>
                        Thank you for your submission! We truly appreciate your
                        desire to participate in this incredible day!
                        {onlineGuestData.displayPermitted
                          ? " We also appreciate your permission to display your message during our reception."
                          : null}{" "}
                        Thank you!
                      </div>
                    </Alert>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RSVPView;
