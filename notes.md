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

## Features
- Variant pins (different dates)
- - Don't want to give them ids in the main list
- - Will need their own table

- 

## Misc notes

### Master list
There is no "master list" after all, just a ```GET /pins```


## List
This has 3 columns: id, listName, fUserID


## ListContents
This has 3 columns: id, fPinID, fListID

A user can create a list and give it a name, then select pins from the master list to add to their custom list


# Routes needed
## /get
* pinsanity.com - Display master list
* pinsanity.com/pinID - Display information about a pin
* pinsanity.com/username - Display a user's profiles and any public lists they have
* pinsanity.com/username/listname - Display a list in detail



# Domain name ideas
* ~~pinsanity.com~~
* ~~pinception.com~~
* ~~pinfamous.com~~
* ~~pingenious.com~~
* ~~pingenius.com~~ (they want $2.9k for it)
* ~~infinity.com~~
* ~~pinfinite.com~~ (they want $9.9k for it)
* ~~pinferno.com~~
* **pintensity.com** - GOT IT!
* pinfluenza.com (available)
