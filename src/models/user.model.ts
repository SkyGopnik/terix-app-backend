import {
    Table,
    Column,
    Model,
    AllowNull, DataType
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export default class UserModel extends Model {

    @Column
    email: string;

    @Column
    password: string;

    @Column
    token: string;

    @AllowNull
    @Column(DataType.JSONB)
    data: object;

}
