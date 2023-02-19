# CS 465P Final Project Journal
  Courtney A Ficker


## 19 Feb 2023
> New repo, starting from doggr. Currently working as per our class last thursday (16 Feb). Got repo set up, started gathering my thoughts and thinking about the design. Also bought domain name **"pintensity.com"**. Wanted "pinsanity" but it wasn't available, nor were a bunch of other *in-* words I tried. IDK might change later.
> 
> ### Database
> * Table: pins (not editable by most users)
> * Table: users (will need to learn about authentication/0auth for this)
> * Table: lists (just id, name, fUserID)
> * Table: listContents (id, fListID, fPinID)
> * Table: userPins (id, fUserID, fPinID, qty:int, want:bool)
> 
> The only part I'm not sure/confident of is the last table. Each user needs to say whether they have or particularly want a pin. I'm not sure whether it's worth it to have them set a qty, because personally I don't bother counting *how many* duplicates I have of a pin, just that I have at least 1 for trade. And it is very possible to both have a pin and want more of it, so I can't just have a negative qty indicate wanting a pin. Maybe just 2 bools: have and want. Like pinnypals does it.
> 
> So that should cover the bare minimum functionality.
> ### Stretch goals:
> * Export a list (csv)
> * Import a list
> * Include main pin list update script
> 
> That's probably in order of increasing difficulty.
