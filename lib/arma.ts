/// <reference path="./../typings/tsd.d.ts" />

import bunyan = require('bunyan')
import models = require('./models')
import util = require('./util');

var logger = bunyan.createLogger({name: 'arma'});


function setId(model: models.Unit, id: any) {
    id = parseInt(id, 10);
    if (!id) {
        throw new TypeError('invalid id ' + typeof id);
    }
    model.id = id;
}

function setName(model: models.Unit, name: any) {
    if (!name) {
        return;
    }
    name = ('' + name).substr(0, 32);

    model.name = name;
}

function setPosition(model: models.Unit, position: any) {
    if (!position) {
        return;
    }
    if (!Array.isArray(position) || position.length > 3) {
        throw new TypeError('invalid position ' + typeof position);
    }
    position = position.map(util.toInt);

    model.position = position;
}

function setDirection(model: models.Unit, direction: any) {
    if (!direction && typeof direction !== 'number') {
        return;
    }
    model.direction = parseInt(direction, 10);
}

function setSide(model: models.Unit, side: any) {
    if (!side) {
        return;
    }
    if (models.Side.values.indexOf(side) !== -1) {
        model.side = side;
        return;
    }
    logger.warn('ignoring unknown side ' + side);
}

function setHealth(model: models.Unit, health: any) {
    if (!health) {
        return;
    }
    if (models.Health.values.indexOf(health) !== -1) {
        model.health = health;
    } else {
        logger.warn('ignoring unknown health' + health);
    }
}

function setIcon(model: models.Unit, icon: any) {
    if (!icon) {
        return;
    }

    if (typeof icon !== 'string') {
        throw new TypeError('icon must be string: ' + typeof icon);
    }

    model.icon = icon;
}


function setContainer(unit: models.Unit, container: any) {
    if (!container && typeof container !== 'number') {
        return;
    }
    unit.container = container;
}

export function setContent(unit: models.Unit, content: any) {
    if (!content) {
        return;
    }
    if (!Array.isArray(content)) {
        throw new TypeError('content must be array');
    }
    unit.content = content.map(util.toInt);
}

export function toUnit(datum: Array<any>): models.Unit {

    var unit = new models.Unit();
    setId(unit, datum[0]);
    setPosition(unit, datum[1]);
    setDirection(unit, datum[2]);
    setSide(unit, datum[3]);
    setHealth(unit, datum[4]);
    setIcon(unit, datum[5]);
    setName(unit, datum[6]);
    setContainer(unit, datum[7]);
    setContent(unit, datum[8]);

    return unit;
}
