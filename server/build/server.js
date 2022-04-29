#!/usr/bin/env node
"use strict";
/**============================================
 *               DB CONNECTION DATA
 *=============================================**/
// const config = require('./config.ts');
// const express = require("express");
// const session = require("express-session");
// const path = require("path");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const app = express();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const config_1 = require("./config");
const app = (0, express_1.default)();
const port = process.env.PORT || 3080;
const isWindows = process.env.ISWINDOWS || "";
const _ = undefined;
const BASENAME = "";
const API_URL = `/api`;
const adminAccess = "marryme";
// CORS to allow requests from localhost
// TODO: Figure out alternative access to server
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: "CeM8>01-L&\\xf|n9qmPs)OX<E",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 1000,
        secure: false,
    },
    genid: (req) => (0, uuid_1.v4)(),
}));
app.use(express_1.default.static(path_1.default.join(__dirname, isWindows, "client")));
// Get if user is logged in.
const isAuthenticated = (req, res, next) => {
    var _a;
    if ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
        return next();
    }
    else {
        // return res.redirect('/coming-soon');
        return res.status(401).send("Unauthorized").end();
    }
};
app.listen(port, () => {
    console.log(`⚡ Listening on port ${port}...`);
    console.log(`Press Ctrl-C to exit.`);
});
// app.get("/", (req, res) => {
//   // res.send("Hello from the server!")
//   req.session.views ? req.session.views++ : (req.session.views = 1);
//   res.setHeader("Content-Type", "text/html");
//   res.write("<p>Hello from the server!</p>");
//   res.write(
//     `<p>Session expires in: ${(
//       (req.session.cookie.maxAge || 0) /
//       60 /
//       1000
//     ).toFixed(2)} hours.</p>`
//   );
//   res.write(`<p>You've seen this page ${req.session.views} times.`);
//   res.write(`<p>Admin access: ${req.session.user?.isAdmin || false}`);
//   res.end();
// });
/**--------------------------------------------
 *              USER AUTHENTICATION
 *---------------------------------------------**/
app.post(API_URL + "/auth/login", (req, res, next) => {
    // TODO: No DB query - do it using the secret key thing
    try {
        if (req.body.accessCode === adminAccess) {
            res.locals.isAdmin = true;
            next();
        }
        else {
            console.warn(`-- Admin login attempt failed with code '${req.body.accessCode}'! --`);
            res.status(401).send("Admin access denied.").end();
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("It's that doggone error again.");
    }
}, (req, res) => {
    req.session.user = {
        isAdmin: res.locals.isAdmin,
    };
    // console.log(req.session);
    console.log("-- Admin logged in! --");
    res.send("Admin access granted.").end();
});
app.post(API_URL + "/auth/logout", (req, res) => {
    req.session.destroy(() => { });
    res.status(200).end();
});
app.get(API_URL + "/auth/is_admin", isAuthenticated, (req, res) => {
    res.send(true).end();
    // res.send(true).end();
});
/**--------------------------------------------
 *               WEDDING REGISTRY
 *---------------------------------------------**/
app.get(API_URL + "/registry/categories", (req, res) => {
    config_1.DB.query("SELECT * FROM registrycategories", (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        return res.send(results).end();
    });
});
app.get(API_URL + "/registry/items", (req, res) => {
    config_1.DB.query(`select r.*, c.CategoryName, (select count(*) from registryclaims cl where cl.ItemId = r.ItemId) as ItemClaims from registryitems r left join registrycategories c on r.CategoryId = c.CategoryId where ItemIsHidden=0 order by r.ItemId desc`, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        return res.send(results).end();
    });
});
app.get(API_URL + "/registry/get_stats", (req, res) => {
    config_1.DB.query("select sum(RawPrice) as TotalValue from registryitems", (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        return res.send(results).end();
    });
});
app.get(API_URL + "/registry/items/:id", (req, res) => {
    config_1.DB.query("select r.*, c.CategoryName, ( select count(*) from registryclaims cl where cl.ItemId = r.ItemId) as ItemClaims from registryitems r left join registrycategories c on r.CategoryId = c.CategoryId where r.CategoryId = ? and r.ItemIsHidden=0  order by r.ItemId desc", [req.params.id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        return res.send(results).end();
    });
});
app.get(API_URL + "/registry/item/:id", (req, res) => {
    config_1.DB.query("SELECT * FROM registryitems WHERE ItemId = ?", [req.params.id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        return res.send(results).end();
    });
});
app.post(API_URL + "/registry/items/new", isAuthenticated, (req, res) => {
    console.log("New item request received...");
    config_1.DB.query("INSERT INTO registryitems SET ?", {
        ItemName: req.body.name,
        ItemDescription: req.body.description,
        ItemImageURL: req.body.imageURL,
        ItemPurchaseURL: req.body.purchaseURL,
        EstimatedPrice: "$" +
            Number(req.body.estimatedPrice).toFixed(2) +
            (req.body.priceOrMore === true ? "+" : ""),
        CategoryId: req.body.category,
        AmountDesired: req.body.amountDesired,
        IsExact: req.body.isExact,
    }, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        console.log("Item insert successful.");
        return res.send("Inserted successfully.").end();
    });
});
app.get(API_URL + "/registry/featured_items", (req, res) => {
    config_1.DB.query(
    // `select * from registryitems r where ItemIsFeatured=1 limit 5;`,
    `select r.*, c.CategoryName, (select count(*) from registryclaims cl where cl.ItemId = r.ItemId) as ItemClaims from registryitems r left join registrycategories c on r.CategoryId = c.CategoryId where ItemIsFeatured=1 and ItemIsHidden=0 order by r.RawPrice desc`, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        if (results.length === 0) {
            console.warn("A request to view featured items failed as there are no featured items in the database.");
            return res.status(400).end();
        }
        console.log("Retrieved Top 5 featured items.");
        return res.send(results).end();
    });
});
app.get(API_URL + "/registry/giftfunds", (req, res) => {
    config_1.DB.query("SELECT * FROM registrygiftfunds", (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        return res.send(results).end();
    });
});
app.post(API_URL + "/registry/claims/new", (req, res) => {
    config_1.DB.query("INSERT INTO registryclaims SET ?", {
        ItemId: req.body.ItemId,
        GuestClaiming: req.body.GuestClaiming,
    }, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        console.log(`Item #${req.body.ItemId} claimed successfully.`);
        return res.send("Claimed successfully.").end();
    });
});
/**--------------------------------------------
 *              RSVP FOR WEDDING
 *---------------------------------------------**/
app.get(API_URL + "/rsvp/get/:code", (req, res) => {
    setTimeout(() => {
        config_1.DB.query("select * from rsvpguestlist g join rsvpinvitecodes c on g.GuestInviteCode = c.InviteCodeId where c.InviteCode = ?", [req.params.code], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).end();
            }
            if (results.length === 0)
                return setTimeout(() => {
                    res.status(404).end();
                }, 1000);
            console.log(`Someone accessed the RSVP code '${req.params.code.toUpperCase()}'.`);
            // console.log(results);
            return res.send(results).end();
        });
    }, 500);
});
app.post(API_URL + "/rsvp/update/:code/:guest", (req, res) => {
    setTimeout(() => {
        var _a;
        config_1.DB.query(`update rsvpguestlist g inner join rsvpinvitecodes c on g.GuestInviteCode = c.InviteCodeId set ? where GuestId = ${req.body.id} and c.InviteCode = '${req.params.code}'`, {
            GuestIntent: req.body.intent,
            GuestFoodRestrictions: (_a = req.body.foodRestrictions) !== null && _a !== void 0 ? _a : "None",
        }, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).end();
            }
            if (results.rowsAffected === 0)
                return res.status(400).end();
            console.log(`Guest '${req.body.first} ${req.body.last}' has had their RSVP information updated.`);
            // console.log(results);
            return res.send("SAVED").end();
        });
    }, 500);
});
app.post(API_URL + "/rsvp/updateInvite/:code/notice", (req, res) => {
    config_1.DB.query(`update rsvpinvitecodes set InviteViewedNotice=1 where InviteCode = '${req.params.code.toUpperCase()}'`, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        if (results.rowsAffected === 0)
            return res.status(400).end();
        console.log(`Invitees with code ${req.params.code.toUpperCase()} have seen and understood the invite notice.`);
        // console.log(results);
        return res.send("SUCCESS").end();
    });
});
app.post(API_URL + "/rsvp/online/new", (req, res) => {
    config_1.DB.query("INSERT INTO rsvponlineguests SET ?", {
        OnlineGuestFirstName: req.body.isAnonymous === true ? "" : req.body.firstName,
        OnlineGuestLastName: req.body.isAnonymous === true ? "" : req.body.lastName,
        OnlineGuestIsAnonymous: req.body.isAnonymous,
        OnlineGuestBestWishes: req.body.bestWishes,
        OnlineGuestAllowDisplay: req.body.displayPermitted,
    }, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).end();
        }
        console.log(`Someone has RSVP-ed online.`);
        return res.send("Successfully RSVP-ed online.").end();
    });
});
/**--------------------------------------------
 *            SEND TO REACT ROUTER
 *---------------------------------------------**/
// app.get(
//   "/coming-soon",
//   (req, res) => {
//     res.sendFile(path.join(__dirname + "/build/client/coming-soon.html"));
//   }
// )
app.get(BASENAME + "/*", 
// (req, res, next) => {},
(req, res) => {
    res.sendFile(path_1.default.join(__dirname, isWindows, "/client/index.html"));
});
