const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const applianceService = require('../services/applianceService');
const { getErrorMessage } = require('../utils/errorUtils');
const { getPaymentMethodViewData } = require('../utils/viewData')


router.get('/catalog', async (req, res) => {
    const appliance = await applianceService.getAll().lean();

    res.render('appliances/catalog', { appliance })
});

router.get('/search', async (req,res)=>{
    const {name, paymentMethod} = req.query;
    const appliance = await applianceService.search(name, paymentMethod);
    const paymentMethods = getPaymentMethodViewData(paymentMethod);

    res.render('appliances/search', {appliance, paymentMethods, name})
})


router.get('/:appliancesId/details', async (req, res) => {
    const appliance = await applianceService.getOne(req.params.appliancesId).lean();

    // // const isOwner = appliance.owner == req.user?._id;
    // const isBuyer = appliance.buyers && appliance.buyers.some(id => id == req.user?._id);

    res.render('appliances/details', { appliance })
});


router.get('/:appliancesId/buy', isAuth, async (req, res) => {
    try {
        await applianceService.buy(req.user._id, req.params.applianceId);
        res.redirect(`/appliances/${req.params.applianceId}/details`)     
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }

});

router.get('/:appliancesId/edit', isAuth, async (req, res) => {
    const appliance = await applianceService.getOne(req.params.applianceId);

    const paymentMethods = getPaymentMethodViewData(appliance.paymentMethod);

    res.render('appliances/edit', { appliance, paymentMethods })
});

router.post('/:appliancesId/edit', isAuth, async (req, res) => {
    const applianceData = req.body;

    const appliance = await applianceService.edit(req.params.applianceId, applianceData);


    res.redirect(`/appliances/${req.params.applianceId}/details`)
});

router.get('/:appliancesId/delete', isAuth, async (req, res) => {
    await applianceService.delete(req.params.applianceId);

    res.redirect('/appliances/catalog');
})


router.get('/create', isAuth, (req, res) => {
    res.render('appliances/create')
});

router.post('/create', isAuth, async (req, res) => {
    const applianceData = req.body;

    try {
        await applianceService.create(req.user._id, applianceData);
    } catch (error) {
        return res.status(400).render('appliances/create', { error: getErrorMessage(error) });
    }

    res.redirect('/appliances/catalog')
});


module.exports = router;

