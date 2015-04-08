
export class Side {
    static WEST = 'WEST';
    static EAST = 'EAST';
    static GUER = 'GUER';
    static CIV = 'CIV';
    static AMBIENT_LIFE = 'AMBIENT LIFE';
    static ENEMY = 'ENEMY';
    static LOGIC = 'LOGIC';
    static UNKNOWN = 'UNKNOWN';

    static values = [Side.WEST, Side.EAST, Side.GUER, Side.CIV, Side.AMBIENT_LIFE, Side.ENEMY, Side.LOGIC, Side.UNKNOWN];
}

export class Health {
    static ALIVE = 'alive';
    static UNCONSCIOUS = 'unconscious';
    static DEAD = 'dead';

    static values = [Health.ALIVE, Health.UNCONSCIOUS, Health.DEAD];
}

class Model {
    static fromJSON(json): Unit {
        var
            obj = JSON.parse(json),
            result = new Unit();

        Object.keys(result).forEach(function (key) {
            if (obj[key] !== undefined) {
                result[key] = obj[key];
            }
        });

        return result;
    }

    toJSON(): string {
        var result: any = {};

        Object.keys(this).forEach(function (key) {
            if (this[key] !== undefined) {
                result[key] = this[key];
            }
        });

        return JSON.stringify(result);
    }

    augment<T>(model: T): T {
        Object.keys(this).forEach(function (key) {
            if (model[key] === undefined || this[key] === null) {
                model[key] = this[key];
            }
        });

        return model;
    }
}

export class Unit extends Model {
    id: number;
    position: Array<number>;
    direction: number;
    side: Side;
    health: Health;
    icon: string;
    name: string;
    content: Array<number>;
    container: number;
}
