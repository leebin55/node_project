import { Table, Column, Model,DataType ,Default, AllowNull, Unique } from 'sequelize-typescript'

@Table({timestamps:true, tableName:'users'})
export default class User extends Model {
	@AllowNull(false)
	@Column(DataType.STRING)
	username!: string

	@AllowNull(false)
	@Column(DataType.STRING)
	password!: string

	@Unique(true)
	@AllowNull(false)
	@Column (DataType.STRING)
	email! :string

	@AllowNull(false)
	@Default(false)
	@Column (DataType.BOOLEAN)
	active! :boolean

	@Unique(true)
	@Column (DataType.STRING)
	token !:string
	
}
