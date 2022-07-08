import { Table, Column, Model,DataType ,HasMany, Default, } from 'sequelize-typescript'
import { blogStatus } from './BlogUtils'

@Table({timestamps:false, tableName:'blogs'})
export default class blogs extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
	  })
	title!: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	  })
	content!: string

	@Default(blogStatus.PUBLIC)
	@Column ({
		type: DataType.STRING,
		allowNull: false,
	})
	status! : blogStatus

	@Default(Date.now)
	@Column({type:DataType.DATE})
	createdAt!: Date
}