import { DataTypes, Model, Deferrable } from "sequelize";
import { sequelize } from "../index";

import Batch from "./Batch.model";
import Person from "./Person.model";

export default class Temperature extends Model {}

Temperature.init(
  {
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    target: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    actual: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    batch_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Batch,
        key: "id",
        deferrable: new Deferrable.INITIALLY_IMMEDIATE(),
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: Person,
        key: "id",
        deferrable: new Deferrable.INITIALLY_IMMEDIATE(),
      },
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      references: {
        model: Person,
        key: "id",
        deferrable: new Deferrable.INITIALLY_IMMEDIATE(),
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
