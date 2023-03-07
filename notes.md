# Notes to Self

## Database Relations
### User
- OneToMany: IP_History
- OneToMany: List

### Pin
- ManyToMany: List
- ManyToOne: Category
- ManyToOne: Company
- ManyToOne: Type

### List
- ManyToMany: Pin
- ManyToOne: User

### lists_pins_pins
- Auto-created by ManyToMany relationship


## Routes

### Pins
- GET /pins - Look up all pins
- GET /pin/:id - Look up a single pin
- POST /pin - Add a new pin (admin only)
- ~~DELETE /pin~~ - Should never be needed
- PUT /pin - Update a pin's info (admin only)

### Users
- GET /users - List all users (admin only)
- GET /user/:id - List a single user
- GET /user/:username - Same, but more user-friendly
- POST /user - Create a new user
- DELETE /user/:id - (Soft) delete user
- PUT /user - Update user info

### Categories/Companies/Types (x)
- GET /[xs] - List all
- GET /name - List all PINS with that x
- POST /[x] - Create a new x (admin only)
- ~~DELETE /[x]~~ - Should never be needed
- PUT /[x] - Update info for x

### Lists
- GET / - List all pins (not a true capital-L List)
- GET /lists - List all lists (admin-only)
- GET /list/:user/:listname - Display a user's list if public


## Features to implement
- A front end would be useful at some point

- Track Collection qtys (IMPORTANT)
- - Separate table, fPinID, fUserID, qty
- - How to track variant pins? (see below)

- Every user should have 2 lists auto-generated for them:
- - "Available for Trade" (public)
- - "Want to trade for" (public)

- Variant pins (different dates printed on pin)
- - Don't want to give them ids in the main list
- - Will need their own table. 1-M rel with pin



# Domain name ideas
* ~~pinsanity.com~~
* ~~pinception.com~~
* ~~pinfamous.com~~
* ~~pingenious.com~~
* ~~pingenius.com~~ (they want $2.9k for it)
* ~~infinity.com~~
* ~~pinfinite.com~~ (they want $9.9k for it)
* ~~pinferno.com~~
* ~~**pintensity.com** - GOT IT!~~
* pinfluenza.com (available)
* **pinsanity.app** - Got it...I like the name too much that I am willing to forego the .com
