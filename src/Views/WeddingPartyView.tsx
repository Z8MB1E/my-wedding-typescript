import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Nav,
  ProgressBar,
  Row,
} from "react-bootstrap";
// import { run as runHolder } from "holderjs/holder";
import { useHolderjs } from "use-holderjs";
import { useEffect } from "react";
import { env } from "process";

const WeddingPartyView: React.FC = () => {
  useHolderjs();

  useEffect(() => {
    document.title = "Wedding Party - Jason & Alyssa";
  }, []);

  return (
    <Container fluid className="p-sm-5 p-3">
      <Row>
        <Col className="text-center">
          <h1>Our Wedding Party</h1>
          <p className="lead">
            Our wedding wouldn't have been possible without these people and the
            impact they've had in our lives. Scroll below to see just how
            impactful they've been.
          </p>
          <hr className="w-50 mx-auto" />
        </Col>
      </Row>
      <Row className="w-lg-100 w-xl-75 m-auto">
        <Col className="party-members">
          <div className="text-center m-auto mb-4">
            <i className="fa-solid fa-users fa fw" />
            <h2>The Bridal Party</h2>
          </div>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col
              md={3}
              className="d-flex justify-content-center justify-content-md-start"
            >
              {/* <img src="holder.js/250x250?auto=yes" className="rounded-3" /> */}
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/alyssa-alice.jpg"}
                className="rounded-3"
                alt="Alice Crowe"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Alice Crowe</h1>
              <p className="lead text-muted">
                Maid of Honor<i className="ms-1 fa-solid fa-award fa-fw"></i>
              </p>
              <p>
                Alice and Alyssa met in middle school at youth group and quickly
                became friends over their shared love of books, Lord of the
                Rings, and drawing. While in recent years they have been
                separated by the Michigan/Ohio state line, Alice has continued
                to be a good friend. She is graduating from Calvin College in
                Grand Rapids, MI with a poly sci degree. (And Alyssa is very
                proud of her ❤)
              </p>
            </Col>
          </Row>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3}>
              {/* <img src="holder.js/250x250?auto=yes" className="rounded" /> */}
              <img
                src={
                  process.env.PUBLIC_URL + "/Assets/Images/alyssa-katelyn.jpeg"
                }
                className="rounded"
                alt="Katelyn Grant"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Katelyn Grant</h1>
              <p className="lead text-muted">Bridesmaid</p>
              <p>
                Alyssa and Katelyn met way back in fifth grade in a church class
                where both were socially awkward introverts. The two have been
                close friends despite living what felt like forever away to
                middle schoolers (one hour) and Katelyn introduced Alyssa to her
                first Studio Ghibli movie! Katelyn is currently a very smart
                student at Miami University in Miami, OH, although she is
                currently in a semester abroad in Costa Rica (jealous).
              </p>
            </Col>
          </Row>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3}>
              {/* <img src="holder.js/250x250?auto=yes" className="rounded" /> */}
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/alyssa-taryn.jpg"}
                className="rounded"
                style={{ objectPosition: "top" }}
                alt="Taryn Waugh"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Taryn Waugh</h1>
              <p className="lead text-muted">Bridesmaid</p>
              <p>
                Out of the entire wedding party, Alyssa has known Taryn the
                longest. The two were homeschooled and attended the same co-op
                and dance studio, often finding themselves in the same classes.
                For a few years, they lost contact as their lives went their
                separate ways, however, when both took classes at MVNU, they
                rekindled their friendship! After struggling through Organic
                Chemistry together, those bonds are never gone. (Science pun.)
                Taryn is a very loyal, very awesome friend who is a pre-vet
                student at MVNU.
              </p>
            </Col>
          </Row>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3}>
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/alyssa-lb.jpg"}
                className="rounded"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Laura Beth Hurst</h1>
              <p className="lead text-muted">Bridesmaid</p>
              <p>
                While LB is Jason’s sister, Alyssa proudly claims her as her
                own. Over the past two years, LB has been a confidant and friend
                that rivals anyone else. Whether it is providing coffee and
                kitten cuddles, or playing video games or choreographing a
                musical, LB has been a consistent friend and mentor. LB is
                currently working at MVNU and is married to Joe! She and Alyssa
                are kindred spirits.
              </p>
            </Col>
          </Row>
          <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3} className="m-auto">
              <img
                src={process.env.PUBLIC_URL + "/Assets/Images/rachel-lilah.jpg"}
                className="rounded"
                style={{ height: "350px" }}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h3 className="mb-0">
                Rachel Fraley{" "}
                <span className="fs-6 fw-normal small text-muted">
                  (on left)
                </span>
              </h3>
              <p className="lead text-muted">
                Flowergirl
                <i className="ms-1 bi-flower3" />
              </p>
              <p>
                Rachel is one of Jason’s little sisters (and now Alyssa’s).
                Similar to Lilah, Rachel is very free willed and creative. With
                four younger siblings, she is very bossy but also caring.
              </p>
              <hr />
              <h3 className="mb-0">
                Lilah Van Fossen{" "}
                <span className="fs-6 fw-normal small text-muted">
                  (on right)
                </span>
              </h3>
              <p className="lead text-muted">
                Flowergirl
                <i className="ms-1 bi-flower3" />
              </p>
              <p>
                Lilah is Alyssa’s favorite little sister. She and Lilah are
                twins, nearly identical in looks and personalities. She is 9
                years old and is a spunky pipsqueak of a girl. She is very
                independent, caring, and creative.
              </p>
            </Col>
          </Row>
          {/* <Row className="bg-light rounded border-1 p-3 shadow mb-3 gy-2">
            <Col md={3}>
              <img src={process.env.PUBLIC_URL + "/Assets/Images/rachel-lilah.jpg"} className="rounded" />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h1 className="mb-0">Rachel Fraley</h1>
              <p className="lead text-muted">
                Flowergirl
                <i className="ms-1 bi-flower3" />
              </p>
              <p>
                Rachel is one of Jason’s little sisters (and now Alyssa’s).
                Similar to Lilah, Rachel is very free willed and creative. With
                four younger siblings, she is very bossy but also caring.
              </p>
            </Col>
          </Row> */}
        </Col>
      </Row>
      <Row className="w-lg-100 w-xl-75 m-auto">
        <div className="text-center m-auto my-4">
          <i className="fa-solid fa-users fa fw" />
          <h2>The Groomsmen</h2>
        </div>
        <Col className="party-members">
          <Row sm={1} md={2} className="g-2">
            <Col sm={12}>
              <div className="d-flex flex-column bg-white shadow-md rounded border-1 p-3 h-100">
                <h3 className="mb-0">Joseph Hurst</h3>
                <p className="lead text-muted">Groomsman</p>
                <p>
                  When Jason's sister Laura Beth first met Joseph Hurst during
                  the university production of Little Women, it wouldn't be long
                  before strangers became friends and friends became family.
                  Now, Jason is proud to call Joseph his brother(-in-law) as
                  much as he's proud to call him a friend. Joseph has worked
                  extra hard to make sure that Jason has a good and easy
                  wedding, and the support Joseph has given to Jason has not
                  gone unrecognized. Joseph is a light for Christ and a man
                  after God's own heart, something Jason appreciates about him
                  immensely. Joseph intends to graduate from MVNU with a degree
                  in ministry, and Jason is excited to see where God takes him.
                </p>
              </div>
            </Col>
            <Col sm={12}>
              <div className="d-flex flex-column bg-white shadow-md rounded border-1 p-3 h-100">
                <h3 className="mb-0">Noah Hill</h3>
                <p className="lead text-muted">Groomsman</p>
                <p>
                  Jason first met Noah back in 2010 as a fellow student at their
                  homeschool co-op, School on the Rock. It took 0.25 seconds
                  before they struck up a friendship that has lasted throughout
                  the years. From sharing film ideas together in the school
                  cafeteria, to joining each other for many hours of Minecraft,
                  to staying in touch through a long-running tabletop RPG game
                  with friends, Noah has always been there for Jason. He
                  recently graduated from Cedarville University with honors and
                  a Bachelor's Degree in Allied Health (this man is legitimately
                  a genius, trust me!) Jason is so proud of Noah's achievements
                  and is blessed beyond measure to be able to call Noah his
                  friend.
                </p>
              </div>
            </Col>
            <Col sm={12}>
              <div className="d-flex flex-column bg-white shadow-md rounded border-1 p-3 h-100">
                <h3 className="mb-0">Adam Beres</h3>
                <p className="lead text-muted">Groomsman</p>
                <p>
                  From the earliest days of Jason's youth up to this very
                  moment, Adam has been a constant source of encouragement,
                  guidance, and fun. As Jason's uncle, Adam has always held a
                  special place in Jason's heart. From his early days of
                  inconceivable magic tricks and lending his Xbox to Jason and
                  his cousins, to later years of mentorship, guidance, and
                  support, Adam has made an impression the likes of which Jason
                  one day wishes to replicate with his own nieces and nephews:
                  not only to be the "fun" uncle, but to love unconditionally. Adam's
                  dedication to his wife, kids, and family is a beautiful thing
                  and reflection of the character of Christ. Jason is proud to
                  have his uncle Adam as a groomsman on his special day.
                </p>
              </div>
            </Col>
            <Col sm={12}>
              <div className="d-flex flex-column bg-white shadow-md rounded border-1 p-3 h-100">
                <h3 className="mb-0">Elijah Ellis</h3>
                <p className="lead text-muted">Groomsman</p>
                <p>
                  What started out as a mutual connection around a tabletop RPG
                  game quickly blossomed over the last two years into an
                  unforeseen but truly real friendship. A crazy fact: Jason has
                  never actually met Elijah in person until this moment. Despite
                  that, Jason sees Elijah as a true friend and brother. From
                  having long midnight conversations about nerdy subjects to
                  receiving completely unnecessary but completely appreciated
                  gifts and support in all sorts of ways, Jason is more than
                  thankful for the blessing Elijah has been in his life. Plus,
                  Elijah has been there from before Jason and Alyssa were even
                  dating, and has been supportive and encouraging ever since!
                  Jason cannot wait to meet Elijah in person and finally cement
                  what he has known all along: that Elijah is a truly awesome
                  guy.
                </p>
              </div>
            </Col>
            {/* <Alert variant="warning" className="w-md-75 w-sm-100 m-auto text-center"><i className="fa-solid fa-hammer fa-fw me-1" /> The section for the party of the groom is currently under construction. The information for this section will be added in a future update.</Alert> */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default WeddingPartyView;
