import {Sequelize} from "sequelize";

console.log(process.env.DATABASE_CONNECTION_STRING)
export const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING as string,{dialect:"postgres"});


import OptionValue from "./models/OptionValue.model";
import Person from "./models/Person.model"
import Account from "./models/Account.model"
import MetricPreset from "./models/MetricPreset.model";
import MetricPresetEntry from "./models/MetricPresetEntry.model";
import Farm from "./models/Farm.model";

import Shed from "./models/Shed.model";
import Batch from "./models/Batch.model";
import BatchShed from "./models/BatchShed.model";
import Feed from "./models/Feed.model";
import Water from "./models/Water.model";
import BodyWeight from "./models/BodyWeight.model";
import Temperature from "./models/Temperature.model";
import Mortality from "./models/Mortality.model";
import Vaccine from "./models/Vaccine.model";

import Sales from "./models/Sales.model";
import Expense from "./models/Expense.model";



Account.hasMany(Person);
Person.belongsTo(Account);

Account.hasMany(Farm);
Farm.belongsTo(Account);

Farm.hasMany(Shed);
Shed.belongsTo(Farm);

Batch.belongsToMany(Shed, {through : BatchShed})
Shed.belongsToMany(Batch, {through : BatchShed})

Batch.hasMany(Feed);
Feed.belongsTo(Batch);

Batch.hasMany(Water);
Water.belongsTo(Batch);

Batch.hasMany(BodyWeight);
BodyWeight.belongsTo(Batch);

Batch.hasMany(Temperature);
Temperature.belongsTo(Batch);

Batch.hasMany(Mortality);
Mortality.belongsTo(Batch);

Batch.hasMany(Vaccine);
Vaccine.belongsTo(Batch);

Batch.hasMany(Sales);
Sales.belongsTo(Batch);

Batch.hasMany(Expense);
Expense.belongsTo(Batch);

Account.hasMany(MetricPreset);
MetricPreset.belongsTo(Account);

MetricPreset.hasMany(MetricPresetEntry);
MetricPresetEntry.belongsTo(MetricPreset);



export const init = async ()=>{ 
    console.log("Hello")
    // let result = await sequelize.sync({alter : true})
    return true;
} 



