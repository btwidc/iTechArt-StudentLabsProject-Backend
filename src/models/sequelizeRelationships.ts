import User from './User';
import Token from './Token';
import Profile from './Profile';

User.hasOne(Token);
Token.belongsTo(User, { as: 'userId' });

User.hasOne(Profile);
Profile.belongsTo(User, { as: 'userId' });
