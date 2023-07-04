const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const cryptoServices = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');
const { getPaymentMethodViewData } = require('../utils/viewData')


router.get('/catalog', async (req, res) => {
    const crypto = await cryptoServices.getAll().lean();

    res.render('appliances/catalog', { crypto })
});

router.get('/search', async (req,res)=>{
    const {name, paymentMethod} = req.query;
    const crypto = await cryptoServices.search(name, paymentMethod);
    const paymentMethods = getPaymentMethodViewData(paymentMethod);

    res.render('appliances/search', {crypto, paymentMethods, name})
})


router.get('/:appliancesId/details', async (req, res) => {
    const crypto = await cryptoServices.getOne(req.params.appliancesId).lean();

    // // const isOwner = crypto.owner == req.user?._id;
    // const isBuyer = crypto.buyers && crypto.buyers.some(id => id == req.user?._id);

    res.render('appliances/details', { crypto })
});


router.get('/:appliancesId/buy', isAuth, async (req, res) => {
    try {
        await cryptoServices.buy(req.user._id, req.params.cryptoId);
        res.redirect(`/appliances/${req.params.cryptoId}/details`)     
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }

});

router.get('/:appliancesId/edit', isAuth, async (req, res) => {
    const crypto = await cryptoServices.getOne(req.params.cryptoId);

    const paymentMethods = getPaymentMethodViewData(crypto.paymentMethod);

    res.render('appliances/edit', { crypto, paymentMethods })
});

router.post('/:appliancesId/edit', isAuth, async (req, res) => {
    const cryptoData = req.body;

    const crypto = await cryptoServices.edit(req.params.cryptoId, cryptoData);


    res.redirect(`/appliances/${req.params.cryptoId}/details`)
});

router.get('/:appliancesId/delete', isAuth, async (req, res) => {
    await cryptoServices.delete(req.params.cryptoId);

    res.redirect('/appliances/catalog');
})


router.get('/create', isAuth, (req, res) => {
    res.render('appliances/create')
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoServices.create(req.user._id, cryptoData);
    } catch (error) {
        return res.status(400).render('appliances/create', { error: getErrorMessage(error) });
    }

    res.redirect('/appliances/catalog')
});



module.exports = router;
