import User from "./User";
import Token from "./Token";

User.hasOne(Token);
Token.belongsTo(User, { as: "userId" });
