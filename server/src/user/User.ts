import { Table, Column, Model,DataType ,HasMany, Default, AllowNull } from 'sequelize-typescript'

@Table({timestamps:true, tableName:'users'})
export default class User extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	  })
	username!: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	  })
	password!: string

	@Column ({
		type: DataType.STRING,
		unique:true,
		allowNull: false,
	})
	email! :string

	@AllowNull(false)
	@Default(false)
	@Column (DataType.BOOLEAN)
	inactive! :boolean
}