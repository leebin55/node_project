import { Table, Column, Model,DataType ,HasMany, Default, AllowNull } from 'sequelize-typescript'

@Table({timestamps:true, tableName:'users'})
export class User extends Model {
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
	@Default(true)
	@Column (DataType.BOOLEAN)
	inactive! :boolean

	mailToken!:string
	
}

export interface IUser{
	username?:string,
	password?:string,
	email?:string,
	inactive?:boolean,
	mailToken?:string
}