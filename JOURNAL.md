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

## 3 March 2023

> I have spent way too much time obsessing over the name. Nothing sits better with me than **Pinsanity**, so even though I can't have the .com, I went ahead and registered the ".app" domain. I'm not going to bother changing the name in the project until later, in case I change my mind again.

> I have the backend working, and by that I mean docker and `pnpm dev` will build and run without errors. There are a lot of tables to add, and considering the confusion I had with building queries in typeorm on assignment 2, I am a little worried that the queries are going to be even more complicated.

## 19 March 2023

> Oops, I have been neglecting this. In the time since the last entry, I have got my backend very much done, not done with an asterisk*. Except, there is one asterisk: I think the seeding process should change so that the "reference" tables (pins, company, category, etc.) are not seeded with fake info but with the actual stuff.

> I did refine the script somewhat and got a better json file to store the info, but it is too much of a timesink right now. It will be one of the first things I work on after the term is over.

> Secondly, I got my frontend up and running. React is not as scary as I thought; still complicated though. Again spent way too much time on CSS. I will have to just let the site be ugly for grading purposes.

> Auth has been killing me. For some reason it's not getting through my thick skill no matter how many times I watch the class meetings. I did manage to get the backend set up, I think, so that a route with the "auth" decorator will return an unauthorized error. Now I just need to work out the frontend side, and where to get the token.

