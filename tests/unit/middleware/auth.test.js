const {Users, } = require("../../../schemas/userSchema")
const auth = require("../../../middleware/authWare");
const mongoose = require("mongoose");
describe("", () => {
    it("should populate the payload with a valid jwt", () => {
        const user = {_id : mongoose.Types.ObjectId(), isAdmin: true};
        const token = new Users(user).generateToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {}
        const next = jest.fn();

        auth(req, res, next)
        expect(req.user).toMatchObject(user)
    })
})