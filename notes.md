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
- GET /:username - Same, but more user-friendly
- POST /user - Create a new user
- DELETE /user/:id - (Soft) delete user
- PUT /user - Update user info

### Categories/Companies/Types (x)
- GET /[xs] - List all
- GET /[x] - List all PINS with that x
- POST /[x] - Create a new x (admin only)
- ~~DELETE /[x]~~ - Should never be needed
- PUT /[x] - Update info for x

### Lists
- GET / - List all pins (not a true capital-L List)
- GET /lists - List all lists (admin-only)
- GET /:user/lists/:listname - Display a user's list if public


## Features to implement/To-Do List

- A front end would be useful at some point

- Every user should have 3 lists auto-generated for them:
- - "Collection" (public)
- - "Available for Trade" (public)
- - "Want to trade for" (public)
- - These should be deletable if a user wants, but they are standard
- - Can also be made private

- Continue making interfaces/types/opts for routes as time allows
- - Not a high priority for class deadline, nice to have

- Import/Export from/to .csv
- - Exporting probably easier than importing

- Variant pins (different dates printed on pin)
- - Don't want to give them ids in the main list
- - Will need their own table. 1-M rel with pin

- Add tags to help figure out what a pin is based on visual inspection
- - DEFINITELY not making it in by deadline
- - New table, ManyToMany with pins
- - Standard array of routes needed


# Domain name ideas
* ~~pinsanity.com~~
* ~~pinception.com~~
* ~~pinfamous.com~~
* ~~pingenious.com~~
* ~~pingenius.com~~ (they want $2.9k for it)
* ~~pinfinity.com~~
* ~~pinfinite.com~~ (they want $9.9k for it)
* ~~pinferno.com~~
* ~~**pintensity.com** - GOT IT!~~
* pinfluenza.com (available)
* **pinsanity.app** - Got it...I like the name too much that I am willing to forego the .com
