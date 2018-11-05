const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

exports.adminNewClass =  [
    check('name').exists().withMessage('Name must be supplied').isLength({min: 2}).withMessage('The name must be at least 2 characters').trim(),
    check('type').exists().withMessage('The type must be specified').trim(),
    check('backgrounds.*').optional(),
    check('backgrounds.*.weight').isNumeric().withMessage('The weight must be numeric.').isInt({min: 1}).withMessage('The weight must be greater than 1.'),
    check('backgrounds.*.title').isLength({min: 2}).withMessage('The title must be 2 or more characters.')
];

exports.adminNewRace = [
    check('name')
    .exists().withMessage('You must supply a name for the race')
    .isLength({min: 2}).withMessage('The Race\'s name must be at least 2 characters long.')
    .trim(),

    check('type')
    .exists().withMessage('You must specify a type for the race.')
    .trim(),

    check('description')
    .exists().withMessage('Please enter a description for the race')
    .trim(),

    check('chargen.*')
    .optional(),

    check('chargen.homelands.*.weight')
    .isNumeric().withMessage('The option weight must be numeric')
    .isInt({min: 1}).withMessage('The option weight must be 1 or more')
    .trim(),

    check('chargen.homelands.*.title')
    .isLength({min: 2}).withMessage('The option title must be at least 2 characters long')
    .trim(),

    check('chargen.homelands.*.description')
    .isLength({min: 2}).withMessage('The option description must be at least 2 characters long')
    .trim(),

    check('chargen.siblings.*.weight')
    .isNumeric().withMessage('The option weight must be numeric')
    .isInt({min: 1}).withMessage('Them option weight must be 1 or more')
    .trim(),

    check('chargen.siblings.*.description')
    .isLength({min: 2}).withMessage('The option description must be at least 2 characters long')
    .trim(),

    check('chargen.parents.*.weight')
    .isNumeric().withMessage('The option weight must be numeric')
    .isInt({min: 1}).withMessage('The option weight bust be 1 or more')
    .trim(),

    check('chargen.parents.*.description')
    .isLength({min: 2}).withMessage('The option description must be at least 2 characters long')
    .trim()
];


    /* need to refine validation and set newRaces.hbs to show nice formatted errors */