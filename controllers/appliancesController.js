// const router = require('express').Router();

// const { isAuth } = require('../middlewares/authMiddleware');
// const applianceService = require('../services/applianceService');
// const { getErrorMessage } = require('../utils/errorUtils');
// const { getPaymentMethodViewData } = require('../utils/viewData')


// router.get('/catalog', async (req, res) => {
//     const appliance = await applianceService.getAll().lean();

//     res.render('appliances/catalog', { appliance })
// });

// router.get('/search', async (req,res)=>{
//     const {name, paymentMethod} = req.query;
//     const appliance = await applianceService.search(name, paymentMethod);
//     const paymentMethods = getPaymentMethodViewData(paymentMethod);

//     res.render('appliances/search', {appliance, paymentMethods, name})
// })


// router.get('/:appliancesId/details', async (req, res) => {
//     const appliance = await applianceService.getOne(req.params.appliancesId).lean();

//     // // const isOwner = appliance.owner == req.user?._id;
//     // const isBuyer = appliance.buyers && appliance.buyers.some(id => id == req.user?._id);

//     res.render('appliances/details', { appliance })
// });


// router.get('/:appliancesId/buy', isAuth, async (req, res) => {
//     try {
//         await applianceService.buy(req.user._id, req.params.applianceId);
//         res.redirect(`/appliances/${req.params.applianceId}/details`)     
//     } catch (error) {
//         return res.status(400).render('home/404', { error: getErrorMessage(error) })
//     }

// });

// router.get('/:appliancesId/edit', isAuth, async (req, res) => {
//     const appliance = await applianceService.getOne(req.params.applianceId);

//     const paymentMethods = getPaymentMethodViewData(appliance.paymentMethod);

//     res.render('appliances/edit', { appliance, paymentMethods })
// });

// router.post('/:appliancesId/edit', isAuth, async (req, res) => {
//     const applianceData = req.body;

//     const appliance = await applianceService.edit(req.params.applianceId, applianceData);


//     res.redirect(`/appliances/${req.params.applianceId}/details`)
// });

// router.get('/:appliancesId/delete', isAuth, async (req, res) => {
//     await applianceService.delete(req.params.applianceId);

//     res.redirect('/appliances/catalog');
// })


// router.get('/create', isAuth, (req, res) => {
//     res.render('appliances/create')
// });

// router.post('/create', isAuth, async (req, res) => {
//     const applianceData = req.body;

//     try {
//         await applianceService.create(req.user._id, applianceData);
//     } catch (error) {
//         return res.status(400).render('appliances/create', { error: getErrorMessage(error) });
//     }

//     res.redirect('/appliances/catalog')
// });


// module.exports = router;

const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const app = express();
router.use(express.static("public"));
router.use(express.json());
app.use(express.static("public"));
app.use(express.json());
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const applianceService = require('../services/applianceService');
const { getErrorMessage } = require('../utils/errorUtils');
const { getPaymentMethodViewData } = require('../utils/viewData');
const clientID = "AWKLqownphob_f3hn6DQia7oFXKiIN-jG1PNqC9MPEZ2vQHrHe4TlDUJU1xz5KGPdDyhbTefacyc9P8H";
const clientSecret = "EDp-cHfOReiZKHwC1Pg5BjnVRRHOENLFuiXi2VQf5TiAfFG9w71AQC0smZSdqkL8Z6ei94C0u9X7K3lz";
router.get('/catalog', async (req, res) => {
    const appliance = await applianceService.getAll().lean();

    res.render('appliances/catalog', { appliance })
});

router.get('/search', async (req, res) => {
    const { name, paymentMethod } = req.query;
    const appliance = await applianceService.search(name, paymentMethod);
    const paymentMethods = getPaymentMethodViewData(paymentMethod);

    res.render('appliances/search', { appliance, paymentMethods, name })
})


router.get('/:appliancesId/details', async (req, res) => {
    const appliance = await applianceService.getOne(req.params.appliancesId).lean();

    // // const isOwner = appliance.owner == req.user?._id;
    // const isBuyer = appliance.buyers && appliance.buyers.some(id => id == req.user?._id);

    res.render('appliances/details', { appliance })
});


router.get('/:appliancesId/buy', isAuth, async (req, res) => {
    try {
        await applianceService.buy(req.user._id, req.params.appliancesId);
        res.redirect(`/appliances/${req.params.appliancesId}/details`)
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }

});

router.get('/:appliancesId/edit', isAdmin, async (req, res) => {
    const appliance = await applianceService.getOne(req.params.appliancesId);

    const paymentMethods = getPaymentMethodViewData(appliance.paymentMethod);

    res.render('appliances/edit', { appliance, paymentMethods })
});

router.post('/:appliancesId/edit', isAdmin, async (req, res) => {
    const applianceData = req.body;

    const appliance = await applianceService.edit(req.params.appliancesId, applianceData);


    res.redirect(`/appliances/${req.params.appliancesId}/details`)
});

router.get('/:appliancesId/delete', isAdmin, async (req, res) => {
    await applianceService.delete(req.params.appliancesId);

    res.redirect('/appliances/catalog');
})


router.get('/create', isAdmin, (req, res) => {
    res.render('appliances/create')
});

router.post('/create', isAdmin, async (req, res) => {
    const applianceData = req.body;

    try {
        await applianceService.create(req.user._id, applianceData);
    } catch (error) {
        return res.status(400).render('appliances/create', { error: getErrorMessage(error) });
    }

    res.redirect('/appliances/catalog')
});

router.post('/buy', isAuth, async (req, res) => {
    const applianceData = req.body;

    try {
        await applianceService.buy(req.user._id, applianceData);
    } catch (error) {
        return res.status(400).render('appliances/buy', { error: getErrorMessage(error) });
    }

    res.redirect('/appliances/catalog')
});

router.post("/my-server/create-paypal-order", async (req, res) => {
    try {
        const order = await createOrder();
        console.log("ORDER: " + order);
        res.json(order);   
    } catch (error) {
        console.log('error', error)
    }
});
async function createOrder() {
    try {
        const accessToken = await generateAccessToken();
        const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders`;
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: "100.00",
                        },
                    },
                ],
            }),
        });
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log('error', error)
    }
}
async function generateAccessToken() {
    const auth = Buffer.from("AWKLqownphob_f3hn6DQia7oFXKiIN-jG1PNqC9MPEZ2vQHrHe4TlDUJU1xz5KGPdDyhbTefacyc9P8H:EDp-cHfOReiZKHwC1Pg5BjnVRRHOENLFuiXi2VQf5TiAfFG9w71AQC0smZSdqkL8Z6ei94C0u9X7K3lz").toString("base64")
    const response = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
        method: "post",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}
router.post("/api/orders/:orderID/capture", async (req, res) => {
    const { orderID } = req.params;
    const captureData = await capturePayment(orderID);
    // TODO: store payment information such as the transaction ID
    res.json(captureData);
});
async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
    
}



module.exports = router;