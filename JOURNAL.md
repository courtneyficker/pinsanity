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

## 20 March 2023

> I just can't get auth to work. I have to make the painful choice to leave it as is and get on to file storage and so forth and hope for some partial credit. So frustrating.

> I have tried to follow the class videos as much as possible, but I can't get backend or frontend to work in docker. When I `docker compose up backend` it tells me I need to provide domain or secret in relation to the auth0-verify plugin. But I am doing that, and with pnpm dev, auth works.

## 21 March 2023

> It turns out that issue was intertwined with auth. Thanks to some god-tier debugging assistance, it got sorted out. Now, not only does `docker compose up` work, I also tried it on a VM and it worked there.

> Little bugs are now bubbling up, but I've been able to fix them.

> First, I noticed that I got an "empty response" from the server when trying to access the page now. Brief backstory, a couple of classmates and I had an issue with the "88:80" frontend port thing in `docker-compose.yaml`. The solution ended up being to choose a port >= 1024, which is what the error basically said. The only unknown is why it was doing that at all and seemingly fine for doggr. Oh well.

> First I noted that the port I chose (1138) *was* getting noticed--it was an "empty response", not a "connection refused". So it was at least partially acknowledging my port. I knew it was related to our web server, so I looked and found the culprit in `nginx.conf`. The port was changed to 5173 based on something that had been said in class...I forget what now. I changed it back to 80, since, after all, we are using 1138 as a stand-in for 80, and that fixed it.

> Another really unfortunate bug was that some of the work I was doing while waiting for docker container builds to finish seeped into the stuff that got pushed. I think I made a change to a route so I included routes.ts in the push, but I also made OTHER changes to routes.ts that should not have been pushed.

> The main issue was that I started adding a new field to the Pins table, which will hold the filename of its image. This was going to be a "nice-to-have" thing, but the fact that now nothing appeared on the homepage (which I could now see) upgraded it a "must-have".

> I needed a whole new seeder, since I needed to not only account for this new field, but also I had always wanted to go off *actual* information I have stored in a json file and not use fake info anymore. So I was able to do that after adding a `resolveJsonModule` into `tsconfig.migration.json`, but also since I had that info I was now able to seed company, category, and type from within the pin seeder. So those other seeders are now commented out.

> It was honestly a nice refresher to go back to the whole migration cycle we did earlier in the term. It was encouraging that this process went very smoothly. I made the change to the model, whipped up a new Pin seeder, which actually made the Category, Company, and Type seeders obsolete. I was pretty pleased with the fact that it worked right away (aside from one minor off-by-one bug). Still more I'd like to add to the seeder (like only seeding what is not already there instead of deleting every time), but it works for now.

> There's still the following to do:
> * REQUIRED: Seed files into minio.
> * OPTIONAL: Would love to redo the CSS from scratch. I should have done this from the get-go, and now it's a mess. I love CSS too; that's supposed to be the fun part. This is not a requirement though...an ugly website is still a website.
> * REQUIRED: Make the video and submit
