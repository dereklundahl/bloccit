const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {
    _isAdmin() {
        return this.user && this.user.role == "admin";
    }

    _isOwner() {
        return this.user && this.user.role == "owner";
    }

    _isMember() {
        return this.user && this.user.role == "member";
    }

    _isGuest() {
        return this.user && this.user.role == "guest";
    }

    new() {
        console.log(`THE MEMBER FUNCTION: ${this._isMember()}`);
        console.log(`THIS IS THE ADMIN FUNCTION ${this._isAdmin()}`);
        return this._isMember() || this._isAdmin();
    }

    create() {
        return this._isMember() || this._isAdmin();
    }

    edit() {
        return this._isAdmin() || this._isOwner();
    }

    update() {
        return this.edit();
    }

    destroy() {
        return this._isAdmin() || this._isOwner();
    }

}